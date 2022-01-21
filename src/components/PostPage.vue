<template>
    <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8" style="margin-right: 5px;">
        <div class="row">
            <BackButton></BackButton>
            <Post v-if = "!loading" v-bind:postdata = "settings.posts[this.$route.params.id]"></Post>
            <section v-if = "loading" class = "h-100 w-100 d-flex align-items-center justify-content-center" style = "min-height:calc(100vh - 300px); min-width:vw;">
                <Spinner style = "font-size:30px;"></Spinner>
            </section>
            <div v-if = "!loading" class="card">
                <div class="col-12 mb-1 mt-0" style="padding: 0px;padding-right: 0px;">
                    <form v-if = "settings.user" v-on:submit.prevent="commentOnPost" class="d-block d-sm-block" style="max-width: 100%;width: 100%; ">
                        <QuillEditor ref = "editor" placeholder = "Comment something" @update:content="show" :toolbar = "[[{ header: [1, 2, 3, 4, 5, false] }],['bold', 'italic', 'underline', 'blockquote'],['code-block','video'],[{ 'align': [] }],[{ 'list': 'ordered'}, { 'list': 'bullet' },'list'],]" theme="snow" style = " height:200px;"/>
                        <div class="btn-group" role="group" style="margin-top: 8px;">
                            <button class="btn btn-light d-flex align-items-center justify-content-center mb-4 mt-1" type="submit" style="border-style: solid;border-color: rgb(222,222,222);color: rgb(86,86,86);font-weight: bold;">
                                <span v-if = "!commentpostedloading">Comment</span>
                                <Spinner class = "px-3" v-else></Spinner>
                            </button>
                        </div>
                    </form>
                    <div v-else class="card-body" style="padding-bottom: 0px;padding-top: 16px;">
                        <div class="alert alert-warning w-100 mb-2" role="alert">
                            <span>If you want to comment you have to Sign Up first :)</span>
                        </div>
                    </div>
                </div>
                <div v-if = "!loading && Object.values(settings.comments).length > 0" class="card-body postBody" style="border-radius: 10px;padding-top: 8px;padding-bottom: 8px; padding-left:0px;">
                    <Comment class = "mb-2" v-for = "comment in Object.values(settings.comments).sort((a, b) => b.created_date - a.created_date)" :key = "comment.commentid" v-bind:commentdata = "comment"></Comment>
                </div>
                <Spinner v-if = "loading"></Spinner>
            </div>            
        </div>
    </div>
</template>

<script>
    import Post from "./Post.vue";
    import Comment from "./Comment.vue";
    import BackButton from "@/components/BackButton.vue";
    import settings from "../settings.js";
    import firebaseApp from "@/firebase/firebaseconfig.js";
    import firebase from "firebase";
    import { ref, onMounted } from "vue";
    import Spinner from "./Spinner.vue";
    // import sanitizeHtml from 'sanitize-html';
    import { useRouter } from 'vue-router';
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    var editor = ref();

    export default{
        props:{
            postdata: Object
        },
        components:{
            Post,
            BackButton,
            Spinner,
            Comment,
            QuillEditor
        },
        setup(){
            var loading = ref(true);
            var commentpostedloading = ref(false);
            var db = firebaseApp.firestore();
            var newcommenttext = ref("");
            var postid = "";
            var batch = null;
            var router = useRouter();
            var postDATA = null;

            function show(){
                newcommenttext.value = editor.value.getHTML();
            }

            onMounted(async () => {
                loading.value = true;
                var data = await getPost(router.currentRoute.value.params.id);
                postDATA = data;
                if(data) {
                    postid = router.currentRoute.value.params.id;
                    settings.value.posts[router.currentRoute.value.params.id] = data;
                    
                    var data1 = await db.collection("users").doc(settings.value.posts[router.currentRoute.value.params.id].authoruid).get();
                    var d = data1.data()
                    settings.value.posts[router.currentRoute.value.params.id].postedbypic = d.profilepicture;

                    await getUserInfoForPost(data.id);
                    await getCommentsForPost(data.id);
                    loading.value = false;
                }
            })

            async function getPost(id){
                var data = await db.collection("posts").where("deleted", "==", false).where("id", "==", id).get();
                
                if(data.docs.length != 0){
                    return data.docs[0].data();
                }
                else router.push({name: "PageNotFound"});
            }

            async function getCommentsForPost(id){
                settings.value.comments = {};
                var data = await db.collection("comments").where("commentbelongsto", "==", id).where("deleted", "==", false).orderBy("created_date", "desc").limit(500).get();
                data.docs.forEach(e => {
                    settings.value.comments[e.id] = e.data();
                })
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
                
                //Loading finished
                loading.value = false;
            }

            async function commentOnPost(){
                commentpostedloading.value = true;
                
                var newComment = await db.collection("comments").doc();
                var CommentSchema = {
                    commentbelongsto: postid,
                    commentauthorpic: settings.value.userData.profilepicture,
                    authoruid: settings.value.user,
                    commentauthorusername: settings.value.userData.username,
                    created_date: new Date().getTime(),
                    updated_date: new Date().getTime(),
                    commenttext: editor.value.getHTML(),
                    downvotes: 0,
                    totalscore: 1,
                    upvotes: 1,
                    contenttype: "comment",
                    commentid: newComment.id,
                    deleted: false,
                    saved: {},
                    votes:{
                        [settings.value.user]:"like",
                    },
                }
                var NotificationSchema = {
                    contenttype: "notification",
                    type: "comment",
                    belongsto: postid,
                    belongstouid: postDATA.authoruid,
                    byusername: settings.value.userData.username,
                    byuid: settings.value.user,
                    title: postDATA.title,
                    created_date: new Date().getTime(),
                }
                var notificationid = await db.collection("users").doc(postDATA.authoruid).collection("notifications").doc().id;
                batch = db.batch();
                batch.set(db.collection("comments").doc(newComment.id),CommentSchema);
                batch.update(db.collection("posts").doc(postid), {
                    num_of_comments: firebase.firestore.FieldValue.increment(1)
                })
                batch.update(db.collection("users").doc(postDATA.authoruid), {
                    // commentpoints: firebase.firestore.FieldValue.increment(1),
                    notifications: firebase.firestore.FieldValue.increment(1),
                    points: firebase.firestore.FieldValue.increment(1),
                })
                batch.set(db.collection("users").doc(postDATA.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                await batch.commit();
                settings.value.comments[newComment.id] = CommentSchema;
                settings.value.comments[newComment.id].votestatus = "like";
                settings.value.comments[newComment.id].isOwner = true;
                settings.value.comments[newComment.id] = CommentSchema;
                // settings.value.userData.commentpoints += 1;
                commentpostedloading.value = false;
                newcommenttext.value = "";
            }

            async function getUserInfoForPost(id){
                if(settings.value.user){
                    var info = await db.collection("posts").doc(id).get();
                    info = info.data();

                    

                    if(info.votes[settings.value.user]) settings.value.posts[id].votestatus = "like";
                    if(info.saved[settings.value.user]) settings.value.posts[id].isSaved = true;
                    if(info.authoruid == settings.value.user) settings.value.posts[id].isOwner = true;
                    
                }
            }
            return{
                loading,
                settings,
                newcommenttext,
                commentOnPost,
                commentpostedloading,
                show,
                editor,
            }
        }
    }

</script>