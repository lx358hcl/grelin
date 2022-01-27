<template>
    <div id="wrapper">
        <div class="d-flex flex-column" id="content-wrapper" style="background: #3f4245;">
            <div id="content" style="background: #ffffff;">
                <div class="container-fluid mainContainer" style="font-family: Lato;min-height: 100vh;max-width: 1400px;margin-top: 10px;">
                    <div class="row d-block d-lg-none" style="margin-top: 12px;margin-bottom: 12px;">
                        <div class="col">
                            <div class="shadow-sm card">
                                <a class="btn btn-light text-start card-header d-block d-lsm-none" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse-4" href="#collapse-4" role="button" style="color: rgb(105,105,105);font-family: Lato;border-radius: 5px;border-style: solid;border-color: rgb(204,204,204);">
                                    <strong>User Info</strong>
                                </a>
                                <div class="collapse" id="collapse-4">
                                    <ProfileCard v-if = "userdata" v-bind:userdata="userdata"></ProfileCard>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row d-flex align-items-start" style="padding-bottom: 20px;">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8" style="margin-right: 5px;">
                            <div class="row">
                                <div class="col">
                                    <UserSubNavBar></UserSubNavBar>
                                </div>
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex d-lg-flex justify-content-start align-items-center" style="margin-right: 5px;margin-bottom: 0;border-radius: 2px;border-style: solid;border-color: rgb(255,255,255);border-top-color: rgb(133,;border-right-color: 135,;border-bottom-color: 150);border-left-color: 135,;padding-right: 8px;padding-left: 8px;padding-bottom: 7px;">
                                    <div class="btn-group d-flex align-items-center w-100" role="group" style="height: 100%;min-height: 100%;max-height: 100%;">
                                        <section class = "w-100" v-if = "Object.values(settings.usercontent).length > 0 && !loading">
                                            <template v-for = "content in settings.usercontent">
                                                <Post v-if = "content.contenttype == 'post'" :key = "content.id" v-bind:postdata = "content"></Post>
                                                <Comment v-if = "content.contenttype == 'comment'" class = "mb-2" :key = "content.commentid" v-bind:commentdata = "content"></Comment>
                                                <Notification v-if = "content.contenttype == 'notification'" :key = "content.notificationid" v-bind:notificationdata = "content"></Notification>
                                            </template>
                                            <div v-if = "this.$route.params.page != 'notifications'" class = "w-100 d-flex justify-content-center p-2 align-items-center d-flex align-items-center justify-content-center">
                                                <button @click = "getMoreContent" v-if = "moreavailable" class = "btn btn-dark px-3 d-flex align-items-center justify-content-center">
                                                    <span v-if = "!loadingmore" class = "p-1">Load more</span>
                                                    <i v-if = "!loadingmore" class="fas fa-brain p-1"></i>
                                                    <Spinner style = "font-size:16px;" class = "text-white" v-if = "loadingmore"></Spinner>
                                                </button>
                                                <button v-if = "!moreavailable" class = "btn btn-dark px-3 d-flex align-items-center justify-content-center">
                                                    <span>No more content</span>
                                                </button>        
                                            </div>
                                        </section>
                                        <p v-if = "!loading && Object.values(settings.usercontent).length == 0" class = "text-center m-auto mt-3">User has no content</p>
                                        <section v-if = "loading" class = "h-100 w-100 d-flex align-items-center justify-content-center flex-column" style = "min-height:calc(100vh - 300px); min-width:vw;">
                                            <Spinner style = "font-size:30px;"></Spinner>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col d-none d-lg-block" style="margin-left: 0px;">
                            <div class="row">
                                <ProfileCard v-if = "userdata" v-bind:userdata="userdata"></ProfileCard>
                            </div>
                            <div class="row" style="border-radius: 7px;border: 1px solid rgb(228,228,228);padding-top: 7px;padding-left: 5px;margin-top: 11px;">
                                <Footer></Footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Footer from "../components/Footer.vue";
    import Post from "../components/Post.vue";
    import Comment from "../components/Comment.vue";
    import ProfileCard from "../components/ProfileCard.vue";
    import UserSubNavBar from "../components/UserSubNavBar.vue";
    import Spinner from "../components/Spinner.vue";
    import Notification from "../components/Notification.vue";
    import TimeAgo from 'javascript-time-ago'
    import en from 'javascript-time-ago/locale/en'
    import firebaseApp from "@/firebase/firebaseconfig.js";
    import settings from "@/settings.js";
    import { ref, onMounted, watch } from "vue";
    import { useRouter } from 'vue-router'

    export default {
        components: {
            Footer,
            ProfileCard,
            UserSubNavBar,
            Post,
            Spinner,
            Comment,
            Notification,
        },
        setup(){
            TimeAgo.addDefaultLocale(en)
            var timeAgo = new TimeAgo('en-US')
            var db = firebaseApp.firestore();
            var userdata = ref("");
            var exists = ref(false);
            var loading = ref(false);
            var moreavailable = ref(true);
            var loadingmore = ref(false);
            var lastpost = ref();
            var lastcomment = ref();
            var wholemess = [];
            var lastPosition = 0;
            var contents = null;
            var morecontent = null;

            var router = useRouter();
            watch(router.currentRoute, routeChanged);

            async function routeChanged(){
                settings.value.posts = {};
                settings.value.comments = {};
                settings.value.usercontent = {};
                settings.value.notifications = {};
                if(router.currentRoute.value.name == "user"){
                    if(!router.currentRoute.value.params.page) router.push({name: "user", params: {"username": router.currentRoute.value.params.username, "page": "posts"}})
                    loading.value = true;
                    moreavailable.value = true;
                    await getContent();
                    loading.value = false;
                }
                if(settings.value.user){
                    var userdataAgain = await db.collection("users").doc(settings.value.user).get();
                    var data = userdataAgain.data();
                    settings.value.userData.notifications = data.notifications;
                }
            }

            //Get user info for posts
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
            
            async function getContent(){
                var data = "";
                settings.value.posts = {};
                settings.value.comments = {};
                settings.value.usercontent = {};
                settings.value.notifications = {};
                if(settings.value.userData && settings.value.userData.username == router.currentRoute.value.params.username && router.currentRoute.value.params.page == "notifications"){
                    var lastTimeOnNotificationsPage = await db.collection("users").doc(settings.value.user).get();
                    var last = lastTimeOnNotificationsPage.data().lastTimeInNotificationsPage;
                    data = await db.collection("users").doc(settings.value.user).collection("notifications").where("created_date", ">=", last).orderBy("created_date", "desc").limit(500).get();
                    data.docs.forEach(e => {
                        settings.value.notifications[e.id] = e.data();
                    });
                    await db.collection("users").doc(settings.value.user).update({
                        "lastTimeInNotificationsPage": new Date().getTime(),
                        "notifications": 0,
                    })
                    settings.value.userData.notifications = 0;
                    
                    settings.value.usercontent = settings.value.notifications;
                }
                else if(router.currentRoute.value.params.page == "posts"){
                    data = await db.collection("posts").where("deleted", "==", false).where("authoruid", "==", userdata.value.uid).orderBy("created_date", "desc").limit(25).get();
                    data.docs.forEach(e => {
                        settings.value.posts[e.id] = e.data();
                    });
                    lastpost.value = data.docs[data.docs.length - 1];
                    await getUserInfoForPosts();
                    settings.value.usercontent = settings.value.posts
                }
                else if(router.currentRoute.value.params.page == "comments"){
                    data = await db.collection("comments").where("deleted", "==", false).where("authoruid", "==", userdata.value.uid).orderBy("created_date", "desc").limit(25).get();
                    data.docs.forEach(e => {
                        settings.value.comments[e.id] = e.data();
                    });
                    lastcomment.value = data.docs[data.docs.length - 1];
                    await getUserInfoForComments();
                    settings.value.usercontent = settings.value.comments;
                    settings.value.usercontent = settings.value.comments
                }
                else if(router.currentRoute.value.params.page == "upvoted"){
                    contents = await db.collection("allContent").where(`votes.${userdata.value.uid}`, "==", "like").where("deleted", "==", false).limit(3000).get();
                    contents = contents.docs.map(e => e.data());
                    contents.forEach(e => {
                        if(e.contenttype == "post"){
                            settings.value.posts[e.id] = e;
                        }
                        else if(e.contenttype == "comment"){
                            settings.value.comments[e.commentid] = e;
                        }
                    })
                    

                    await getUserInfoForComments();
                    await getUserInfoForPosts();

                    settings.value.usercontent = {...settings.value.comments, ...settings.value.posts};
                    wholemess = Object.values(settings.value.usercontent).sort((a, b) => b.created_date - a.created_date);
                    
                    settings.value.usercontent = wholemess.slice(0, 25);
                    wholemess = wholemess.slice(25);
                    lastPosition = lastPosition + 25;
                    
                }
                else if(router.currentRoute.value.params.page == "downvoted"){
                    contents = await db.collection("allContent").where(`votes.${userdata.value.uid}`, "==", "dislike").where("deleted", "==", false).limit(1000).get();
                    contents = contents.docs.map(e => e.data());
                    contents.forEach(e => {
                        if(e.contenttype == "post"){
                            settings.value.posts[e.id] = e;
                        }
                        else if(e.contenttype == "comment"){
                            settings.value.comments[e.commentid] = e;
                        }
                    })
                    

                    await getUserInfoForComments();
                    await getUserInfoForPosts();

                    settings.value.usercontent = {...settings.value.comments, ...settings.value.posts};
                    wholemess = Object.values(settings.value.usercontent).sort((a, b) => b.created_date - a.created_date);
                    settings.value.usercontent = wholemess.slice(0, 25);
                    wholemess = wholemess.slice(25);
                    lastPosition = lastPosition + 25;
                    
                }
                else if(router.currentRoute.value.params.page == "saved"){
                    contents = await db.collection("allContent").where(`saved.${userdata.value.uid}`, "==", true).where("deleted", "==", false).limit(1000).get();
                    contents = contents.docs.map(e => e.data());
                    contents.forEach(e => {
                        if(e.contenttype == "post"){
                            settings.value.posts[e.id] = e;
                        }
                        else if(e.contenttype == "comment"){
                            settings.value.comments[e.commentid] = e;
                        }
                    })
                    

                    await getUserInfoForComments();
                    await getUserInfoForPosts();

                    settings.value.usercontent = {...settings.value.comments, ...settings.value.posts};
                    wholemess = Object.values(settings.value.usercontent).sort((a, b) => b.created_date - a.created_date);
                    settings.value.usercontent = wholemess.slice(0, 25);
                    wholemess = wholemess.slice(25);
                    lastPosition = lastPosition + 25;
                    
                }
            }

            async function getUserInfoForComments(){
                var data = null;
                //Get current profilepictures from users-collection
                var commentedbyuids = [...new Set(Object.values(settings.value.comments).map(e => e.authoruid))];
                var userprofilepictures = {};
                while(commentedbyuids.length > 0){
                    var commentedbyuidstemp = commentedbyuids.splice(0, 10);
                    data = await db.collection("users").where("uid", "in", commentedbyuidstemp).get();
                    data.forEach(e => {
                        var user = e.data();
                        userprofilepictures[user.uid] = user.profilepicture;
                    });
                }
                Object.keys(settings.value.comments).forEach(e => {
                    if(userprofilepictures[settings.value.comments[e].authoruid]) settings.value.comments[e].commentauthorpic = userprofilepictures[settings.value.comments[e].authoruid];
                })
                //Votestatus/Savedstatus/Ownershipstatus
                Object.keys(settings.value.comments).forEach(e => {
                    if(settings.value.comments[e].authoruid == settings.value.user) settings.value.comments[e].isOwner = true;
                    if(settings.value.comments[e].saved[settings.value.user]) settings.value.comments[e].isSaved = true;
                    if(settings.value.comments[e].votes[settings.value.user]) settings.value.comments[e].votestatus = settings.value.comments[e].votes[settings.value.user];
                })
            }

            async function getMoreContent(){
                var newest25 = [];
                loadingmore.value = true;

                console.log("getting more content")
                console.log(lastpost.value.ref);
                console.log(settings.value.posts);
                
                try{
                    if(router.currentRoute.value.params.page == "posts"){
                        
                        try{
                            newest25 = await db.collection("posts").where("authoruid", "==", userdata.value.uid).orderBy("created_date", "desc").startAfter(lastpost.value).limit(25).get();
                        }
                        catch(e){
                            console.log(e);
                        }
                        console.log(newest25);
                        newest25.docs.forEach(e => {
                            settings.value.posts[e.id] = e.data();
                            console.log("O")
                        })

                        lastpost.value = newest25.docs[newest25.docs.length - 1];
                        await getUserInfoForPosts();
                        settings.value.usercontent = settings.value.posts;
                    }
                    else if(router.currentRoute.value.params.page == "comments"){
                        newest25 = await db.collection("comments").where("deleted", "==", false).where("authoruid", "==", userdata.value.uid).orderBy("created_date", "desc").startAfter(lastcomment.value).limit(25).get();
                        newest25.docs.forEach(e => {
                            settings.value.comments[e.id] = e.data();
                        })
                        lastcomment.value = newest25.docs[newest25.docs.length - 1];
                        await getUserInfoForComments();
                        settings.value.usercontent = settings.value.comments;
                    }
                    else if(router.currentRoute.value.params.page == "upvoted"){
                        morecontent = wholemess.slice(lastPosition, lastPosition + 25);
                        wholemess = wholemess.slice(lastPosition);
                        lastPosition = lastPosition + 25;
                        settings.value.usercontent = settings.value.usercontent.concat(morecontent);
                        
                        if(wholemess.length == 0) moreavailable.value = false;
                    }
                    else if(router.currentRoute.value.params.page == "downvoted"){
                        morecontent = wholemess.slice(lastPosition, lastPosition + 25);
                        wholemess = wholemess.slice(lastPosition);
                        lastPosition = lastPosition + 25;
                        settings.value.usercontent = settings.value.usercontent.concat(morecontent);
                        
                        if(wholemess.length == 0) moreavailable.value = false;
                    }
                    else if(router.currentRoute.value.params.page == "saved"){
                        morecontent = wholemess.slice(lastPosition, lastPosition + 25);
                        wholemess = wholemess.slice(lastPosition);
                        lastPosition = lastPosition + 25;
                        settings.value.usercontent = settings.value.usercontent.concat(morecontent);
                        
                        if(wholemess.length == 0) moreavailable.value = false;
                    }
                }
                catch(error){
                    moreavailable.value = false;
                }
                loadingmore.value = false;
            }

            async function checkUserPage(){
                
                try{
                    userdata.value = "";
                    var data = await db.collection("users").where("username", "==", router.currentRoute.value.params.username).get();
                    if(data.docs.length > 0 && data.docs[0].exists){
                        exists.value = true;
                        userdata.value = data.docs[0].data();
                    }
                    else{
                        exists.value = false;
                    }
                    

                }
                catch(e){
                    return;                    
                }
            }

            onMounted(async () => {
                settings.value.posts = {};
                settings.value.comments = {};
                settings.value.usercontent = {};
                settings.value.notifications = {};
                if(router.currentRoute.value.name == "user"){
                    if(!router.currentRoute.value.params.page) router.push({name: "user", params: {"username": router.currentRoute.value.params.username, "page": "posts"}})
                    loading.value = true;
                    moreavailable.value = true;
                    await checkUserPage();
                    
                    
                    await getContent(userdata.value.uid);
                    loading.value = false;
                }
                if(settings.value.user){
                    var userdataAgain = await db.collection("users").doc(settings.value.user).get();
                    var data = userdataAgain.data();
                    settings.value.userData.notifications = data.notifications;
                }
            })
            return{
                settings,
                timeAgo,
                userdata,
                exists,
                loading,
                moreavailable,
                loadingmore,
                getMoreContent,
            }
        }
    }
</script>