<template>
    <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8" style="margin-right: 5px;">
        <div class="row">
            <SubNavBar></SubNavBar>
            <PostButton></PostButton>
            <SortingButtons></SortingButtons>
            <section v-if = "!loading && settings.posts">
                <Post v-for = "(val, key) in settings.posts" :key = "key" v-bind:postdata = "val"></Post>
                <div class = "w-100 d-flex justify-content-center p-2 align-items-center d-flex align-items-center justify-content-center">
                    <button v-if = "moreavailable" @click = "getMorePosts" class = "btn btn-dark px-3 d-flex align-items-center justify-content-center">
                        <span v-if = "!loadingmore" class = "p-1">Load more</span>
                        <i v-if = "!loadingmore" class="fas fa-brain p-1"></i>
                        <Spinner style = "font-size:16px;" class = "text-white" v-if = "loadingmore"></Spinner>
                    </button>
                    <button v-if = "!moreavailable" class = "btn btn-dark px-3 d-flex align-items-center justify-content-center">
                        <span>No more posts</span>
                    </button>             
                </div>
            </section>
            <section v-else class = "h-100 w-100 d-flex align-items-center justify-content-center" style = "min-height:calc(100vh - 300px); min-width:vw;">
                <Spinner style = "font-size:30px;"></Spinner>
            </section>
        </div>
    </div>
</template>

<script>
    import SubNavBar from "../components/SubNavBar.vue";
    import SortingButtons from "../components/SortingButtons.vue";
    import PostButton from "../components/PostButton.vue";
    import Post from "../components/Post.vue";
    import settings from "../settings.js";
    import firebaseApp from "@/firebase/firebaseconfig.js";
    import { ref, onMounted } from "vue";
    import { useRouter } from 'vue-router'
    import Spinner from "./Spinner.vue";

    var loading = ref(false);
    var loadingmore = ref(false);
    var moreavailable = ref(true);
    var newest25 = null;
    var db = firebaseApp.firestore();
    var chosenRef = ref();
    var last = ref();

    async function getUserInfoForPosts(){
        var authoruids = [];
        var userprofilepictures = {};
        Object.keys(settings.value.posts).forEach(e => authoruids.push(settings.value.posts[e].authoruid));
        authoruids = [... new Set(authoruids)];

        //Get the current profile pics from the users
        while(authoruids.length > 0){
            var authoruidstemp = authoruids.splice(0, 10);
            var data1 = await db.collection("users").where("uid", "in", authoruidstemp).get();
            data1.forEach(e => {
                var user = e.data();
                userprofilepictures[user.uid] = user.profilepicture;
            });
        }
        //Add profilepics to posts
        Object.keys(settings.value.posts).forEach(e => {
            var element = settings.value.posts[e];
            if(element.authoruid in userprofilepictures) element.postedbypic = userprofilepictures[element.authoruid]
        })
        //Ownership, Saved, Liked
        if(settings.value.user){
            //Vote-status
            Object.keys(settings.value.posts).forEach(key => {
                if(settings.value.posts[key].votes[settings.value.user]) settings.value.posts[key].votestatus = settings.value.posts[key].votes[settings.value.user];
            });
            //Ownership propert
            Object.keys(settings.value.posts).forEach(key => {
                if(settings.value.posts[key].authoruid == settings.value.user){
                    settings.value.posts[key].isOwner = true;
                }
            });
            //Saved property
            Object.keys(settings.value.posts).forEach(key => {
                if(settings.value.posts[key].saved[settings.value.user]){
                    settings.value.posts[key].isSaved = true;
                }
            });
        }
    }

    export default {
        watch:{
            async $route (to){
                //Grab last 25 posts from the chosen sub-section
                loading.value = true;
                loadingmore.value = false;
                moreavailable.value = true;
                settings.value.posts = {};
                //For all
                if(["user", "search", "post"].includes(to.name)){
                    return
                }
                else if(["/all", ""].includes(to.path)){
                    settings.value.posts = {};
                    if(!to.query.sort) chosenRef.value = db.collection("posts").where("deleted", "==", false).orderBy("created_date", "desc");
                    else if(to.query.sort == "new") chosenRef.value = db.collection("posts").where("deleted", "==", false).orderBy("created_date", "desc");
                    else if(to.query.sort == "top") chosenRef.value = db.collection("posts").where("deleted", "==", false).orderBy("totalscore", "desc");
                    newest25 = await chosenRef.value.limit(25).get();
                    newest25.docs.forEach(e => {
                        settings.value.posts[e.id] = e.data();
                    });
                    last.value = newest25.docs[newest25.docs.length - 1];
                    await getUserInfoForPosts();
                }
                //For subs
                else{
                    if(["/human", "/animal", "/qa", "/misc"].includes(to.fullPath)) chosenRef.value = db.collection("posts").where("deleted", "==", false).where("sub", "==", to.name).orderBy("created_date", "desc");
                    else if(to.query.sort == "new") chosenRef.value = db.collection("posts").where("deleted", "==", false).where("sub", "==", to.name).orderBy("created_date", "desc");
                    else if(to.query.sort == "top") chosenRef.value = db.collection("posts").where("deleted", "==", false).where("sub", "==", to.name).orderBy("totalscore", "desc");
                    newest25 = await chosenRef.value.limit(25).get();
                    newest25.docs.forEach(e => {
                        settings.value.posts[e.id] = e.data();
                    });
                    last.value = newest25.docs[newest25.docs.length - 1];
                    await getUserInfoForPosts();
                }
                loading.value = false;
            }
        },
        setup(){
            var router = useRouter();

            async function getMorePosts(){
                loadingmore.value = true;
                
                try{
                    newest25 = await chosenRef.value.startAfter(last.value).limit(25).get();
                    newest25.docs.forEach(e => {
                        settings.value.posts[e.id] = e.data();
                    })
                    last.value = newest25.docs[newest25.docs.length - 1];
                    await getUserInfoForPosts();
                }
                catch(error){
                    moreavailable.value = false;
                }
                loadingmore.value = false;
            }

            onMounted (async ()=> {
                //Grab last 25 posts from the chosen sub-section
                loading.value = true;
                //For all
                if(Object.keys(settings.value.posts).length <= 1){
                    if(["/all", ""].includes(router.currentRoute.value.path)){
                        if(!router.currentRoute.value.query.sort) chosenRef.value = db.collection("posts").where("deleted", "==", false).orderBy("created_date", "desc");
                        else if(router.currentRoute.value.query.sort == "new") chosenRef.value = db.collection("posts").where("deleted", "==", false).orderBy("created_date", "desc");
                        else if(router.currentRoute.value.query.sort == "top") chosenRef.value = db.collection("posts").where("deleted", "==", false).orderBy("totalscore", "desc");
                        newest25 = await chosenRef.value.limit(25).get();
                        newest25.docs.forEach(e => {
                            settings.value.posts[e.id] = e.data();
                        });
                        last.value = newest25.docs[newest25.docs.length - 1];
                    }
                    //For subs
                    else{
                        if(["/human", "/animal", "/qa", "/misc"].includes(router.currentRoute.value.fullPath)) chosenRef.value = db.collection("posts").where("deleted", "==", false).where("sub", "==", router.currentRoute.value.name).orderBy("created_date", "desc");
                        else if(router.currentRoute.value.query.sort == "new") chosenRef.value = db.collection("posts").where("deleted", "==", false).where("sub", "==", router.currentRoute.value.name).orderBy("created_date", "desc");
                        else if(router.currentRoute.value.query.sort == "top") chosenRef.value = db.collection("posts").where("deleted", "==", false).where("sub", "==", router.currentRoute.value.name).orderBy("totalscore", "desc");
                        newest25 = await chosenRef.value.limit(25).get();
                        newest25.docs.forEach(e => {
                            settings.value.posts[e.id] = e.data();
                        });
                        last.value = newest25.docs[newest25.docs.length - 1]
                    }
                    await getUserInfoForPosts();
                }
                loading.value = false;
            })
            return{
                settings,
                loading,
                getMorePosts,
                loadingmore,
                moreavailable,
            }
        },
        components: {
            SubNavBar,
            SortingButtons,
            Post,
            PostButton,
            Spinner,
        }
    }

</script>