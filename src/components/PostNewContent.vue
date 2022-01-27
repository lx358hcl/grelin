<template>
    <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8" style="margin-right: 5px;">
        <div class="row" style="padding-top: 0px;">
            <div class="col-12 d-flex flex-row">
            <!--SubSectionContainer START-->
                <div class="row w-100 d-block d-md-none mx-0 mb-2">
                    <div class="col-12 px-0">
                        <div class="card">
                            <a class="btn btn-light text-start card-header d-block d-md-none" data-bs-toggle="collapse" aria-expanded="false" aria-controls="postinginfo" href="#postinginfo" role="button" style="color: rgb(105,105,105);font-family: Alike Angular, serif;border-radius: 5px;border-style: solid;border-color: rgb(204,204,204);">
                                <strong>Posting Info</strong>
                            </a>
                            <div class="collapse" id="postinginfo">
                                <div class="card-body" style="padding-bottom: 10px;padding-top: 16px;">
                                    <div class="alert alert-warning w-100" role="alert">
                                        <b>If you're posting a study, please check if it's already indexed by using the searchbox, thanks</b>
                                        <br>
                                        <li>However, the website also does a check in our database whether the study already exists when you click "Post". We do this to reduce the constant duplication and reiteration of old-studies.</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--SubSectionContainer END-->
                <div class="alert alert-warning w-100 d-none d-md-block beforeYouPostMessage" role="alert">
                    <b>If you're posting a study, please check if it's already indexed by using the searchbox, thanks   </b>
                    <br>
                    <li>However, the website also does a check in our database whether the study already exists when you click "Post". We do this to reduce the constant duplication and reiteration of old-studies.</li>
                </div>
            </div>
            <div class="col-12 d-flex flex-row mt-0 pt-1 mb-0">
                <router-link to = "/" class="btn btn-light" type="button" style="transform:scale(1.1); margin-bottom: 3px;margin-left:3px; margin-right: 22px;padding: 3px 12px;font-size: 14px;color: rgb(86,86,86);font-weight: bold;text-align: left;border-color: rgb(210,210,210);">
                    <i class = "fas fa-long-arrow-alt-left" />
                    <span> Back</span>
                </router-link>
            </div>
            <form v-on:submit.prevent="preparePost">

                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex d-lg-flex justify-content-start align-items-center" style="margin-top: 10px;">
                    <div class="row" style="width: 100%;margin-right: 0px;margin-left: 0px;border-radius: 5px;border: 1px solid rgb(222,222,222);padding-bottom: 0px;">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 m-0">
                            <div class="row" style="margin-right: 0px;margin-left: 0px;">
                                <div class="col" style="padding: 0px;">
                                    <div @click = "changePostType($event.target.value)" role="group" class="btn-group postTypes" style="width: 100%; border-bottom:1px solid gainsboro;">
                                        <button value = "image" :class = "{ 'postTypeActive': chosenPostType == 'image'}" class="btn btn-light rounded-0" type="button" style="font-size: 20px;color: rgb(108,108,108);font-weight: bold;">
                                            <i class="fa fa-file-image-o" style="font-size: 20px;" />
                                            <span> Image</span>
                                        </button>
                                        <button value = "post" :class = "{ 'postTypeActive':chosenPostType == 'post'}" class="btn btn-light rounded-0" type="button" style="font-size: 20px;color: rgb(108,108,108);font-weight: bold;">
                                            <i class="fas fa-file-alt" style="font-size: 20px;" />
                                            <span> Post</span>
                                        </button>
                                        <button value = "link" :class = "{ 'postTypeActive':chosenPostType == 'link'}" class="btn btn-light rounded-0" type="button" style="font-size: 20px;color: rgb(108,108,108);font-weight: bold;">
                                            <i class="fas fa-link" />
                                            <span> Link</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 m-0">
                            <div class="row" style="margin-right: 0px;margin-left: 0px;padding-right: 10px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px;">
                                <div class="col-12 d-flex align-content-center" style="padding-right: 0px;padding-left: 0px;">
                                    <component @posttextChanged="postTextChanged" :is = "chosenType"></component>
                                </div>
                                <div v-if = "loading && chosenPostType == 'image'" class="col-12 mt-2">
                                    <div class="progress rounded p-0">
                                        <div class="progress-bar progress-bar-striped progress-bar-animated rounded-0" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="'width:' + progress + '%'"></div>
                                    </div>
                                </div>
                                <div class="col-12 d-flex justify-content-end align-content-center pt-2 pb-1" style="padding-right: 0px;padding-left: 0px; height:auto;">
                                    <p class = "d-flex align-items-center px-2 m-0 text-nowrap my-auto d-none d-sm-block"> Post to </p>
                                    <select @click = "changeSubSection($event.target.value)" class="form-select" aria-label="Default select example">
                                        <option selected value = "human">Human Section</option>
                                        <option value="animal">Animal Section</option>
                                        <option value="misc">Misc Section</option>
                                        <option value="qa">Q&A Section</option>
                                    </select>
                                    <p class = "d-flex align-items-center px-2 m-0 text-nowrap d-none d-sm-block my-auto "> with label </p>
                                    <div :key = "chosenLabel" class="dropdown">
                                        <button :class = "{[chosenLabel] : true}" class="btn dropdown-toggle d-flex align-items-center" id = "postPublishSection" aria-expanded="false" data-bs-toggle="dropdown" type="button" style="margin-bottom: 0px;margin-left: 5px;font-size: 16px;color: #fff;font-weight: bold;text-align: left;border-color: rgb(210,210,210);">
                                            {{ chosenLabelType }}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="postPublishSection">
                                            <button @click = "changePostLabel($event.target.value)" :class = "{ 'activeLabel' : chosenLabel == 'scientific' }" value = "Scientific Study" class="dropdown-item" href="#">
                                                Scientific Study
                                            </button>
                                            <button @click = "changePostLabel($event.target.value)" :class = "{ 'activeLabel' : chosenLabel == 'image' }" value = "Image" class="dropdown-item" href="#">
                                                Image
                                            </button>
                                            <button @click = "changePostLabel($event.target.value)" :class = "{ 'activeLabel' : chosenLabel == 'question' }" value = "Question" class="dropdown-item" href="#">
                                                Question
                                            </button>
                                            <button @click = "changePostLabel($event.target.value)" :class = "{ 'activeLabel' : chosenLabel == 'other' }" value = "Other" class="dropdown-item" href="#">
                                                Other
                                            </button>
                                            <button @click = "changePostLabel($event.target.value)" :class = "{ 'activeLabel' : chosenLabel == 'news' }" value = "News" class="dropdown-item" href="#">
                                                News
                                            </button>
                                        </div>
                                    </div>
                                    <button class="btn btn-light mx-1" type="submit" style="color: rgb(95,95,95);font-weight: bold;border-style: solid;border-color: rgb(213,213,213);">
                                        <Spinner v-if = "loading"></Spinner>
                                        <span v-else>Post</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import settings from "@/settings.js";
    import firebaseApp from "@/firebase/firebaseconfig.js";
    import firebase from "firebase";
    import PostLinkPost from "./PostLinkPost.vue";
    import PostImagePost from "./PostImagePost.vue";
    import PostPostPost from "./PostPostPost.vue";
    import Spinner from "./Spinner.vue";
    import { shallowRef } from "vue";
    // import sanitizeHtml from 'sanitize-html';

    var postpostpost = shallowRef(PostPostPost);
    var postimagepost = shallowRef(PostImagePost);
    var postlinkpost = shallowRef(PostLinkPost);

    var chosenPostType = ref("link");
    var chosenLabelType = ref("Scientific Study");
    var chosenSubSection = ref("human");
    var valgtPostType = ref("post");
    var loading = ref(false);
    var progress = ref(0);
    var db = firebaseApp.firestore();
    var postImage = "";
    var postSource = "";
    var postText =  "";
    var postTitle = "";
    var postFile = "";
    var id = "";
    var batch = null;

    export default{
        computed:{
            chosenLabel(){
                if(chosenLabelType.value == "Scientific Study") return "scientific";
                else if(chosenLabelType.value == "Image") return "image";
                else if(chosenLabelType.value == "Question") return "question";
                else if(chosenLabelType.value == "News") return "news";
                else if(chosenLabelType.value == "Other") return "other";
                return null;
            },
            chosenType(){
                if(chosenPostType.value == "image") return postimagepost.value;
                else if(chosenPostType.value == "post") return postpostpost.value;
                else if(chosenPostType.value == "link") return postlinkpost.value;
                else return null;
            }
        },
        mounted(){
            if(this.$route.query.type == "post") {
                chosenPostType.value = "post";
                valgtPostType.value = PostPostPost;
            }
            else if(this.$route.query.type == "image") {
                chosenPostType.value = "image";
                valgtPostType.value = PostImagePost;
            }
            else if(this.$route.query.type == "link"){
                chosenPostType.value = "link";
                valgtPostType.value = PostLinkPost;
            }

        },
        components:{
            Spinner,
        },
        setup(){
            var router = useRouter();

            function postTextChanged(e){
                
                postText = e;
            }

            function changePostType(e){
                chosenPostType.value = e;
                router.push({ path: `submit`, query: { "type": e }});
            }

            async function preparePost(e){
                loading.value = true;
                
                //Push post to the correct sub
                id = await db.collection("posts").doc().id;
                console.log(id);
                

                if(chosenPostType.value == "link"){
                    postImage = e.target[5].value;
                    postSource = e.target[4].value;
                    postTitle = e.target[3].value;
                    postPost();
                }
                else if(chosenPostType.value == "post"){
                    postImage = e.target[5].value;
                    postTitle = e.target[3].value;
                    postPost();
                }
                else if(chosenPostType.value == "image"){
                    postFile = e.target[4].files[0];
                    postTitle = e.target[3].value;
                    postText = "";
                    
                    if(postFile.size > 2097152){
                        alert("Picture is too big, compress it or resize it");
                        postFile = null;
                        loading.value = false;
                    }
                    else{
                        var storageRef = firebase.storage().ref();
                        var uploadTask = storageRef.child(`${settings.value.user}/${id}`).put(postFile);

                        uploadTask.on('state_changed', (snapshot) => {
                            progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            
                            switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED: // or 'paused'
                                    
                                break;
                                case firebase.storage.TaskState.RUNNING: // or 'running'
                                    
                                    
                                break;
                            }
                        },
                        () => {
                            
                        },
                        () => {
                            // Handle successful uploads on complete
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                postImage = downloadURL;
                                postPost();
                            });
                        })
                        
                    }
                }
            }

            async function postPost(){
                var PostSchema = {
                    downvotes: 0,
                    image: postImage,
                    label: chosenLabelType.value,
                    labelshort: toShortLabel(),
                    num_of_comments: 0,
                    authoruid: settings.value.userData.uid,
                    postedbyusername: settings.value.userData.username,
                    created_date: new Date().getTime(),
                    updated_date: new Date().getTime(),
                    postedbypic: settings.value.userData.profilepicture,
                    postsrc: postSource,
                    posttext: postText,
                    title: postTitle,
                    totalscore: 0,
                    type: chosenPostType.value,
                    upvotes: 1,
                    sub: chosenSubSection.value,
                    id: id,
                    contenttype: "post",
                    deleted: false,
                    saved: {},
                    votes: {
                        [settings.value.user]:"like",
                    },
                }
                
                var q = false;
                if(PostSchema.type == "link"){
                    q = await db.collection("posts").where("deleted", "==", false).where("postsrc", "==", PostSchema.postsrc).get();

                    if(q.docs.length == 0){
                        batch = db.batch();
                        batch.set(db.collection("posts").doc(id), PostSchema);
                        batch.update(db.collection("users").doc(settings.value.user),{
                            postpoints: firebase.firestore.FieldValue.increment(1),
                            points: firebase.firestore.FieldValue.increment(1),
                        })
                        batch.update(db.collection("posts").doc(id),{
                            totalscore: firebase.firestore.FieldValue.increment(1),
                        })
                        await batch.commit();
                        window.location = window.origin + "/post/" + id;
                        router.push({ name: "post", params: {"id": id}})
                    }
                    else{
                        var doc = await q.docs[0].data();
                        alert("That article already exists here: " + "grelin.net/post/" + doc.id);
                    }
                }
                else{
                    batch = db.batch();
                    batch.set(db.collection("posts").doc(id), PostSchema);
                    batch.update(db.collection("users").doc(settings.value.user),{
                        postpoints: firebase.firestore.FieldValue.increment(1),
                        points: firebase.firestore.FieldValue.increment(1),
                    })
                    batch.update(db.collection("posts").doc(id),{
                        totalscore: firebase.firestore.FieldValue.increment(1),
                    })
                    await batch.commit();
                    window.location = window.origin + "/post/" + id;
                    router.push({ name: "post", params: {"id": id}})
                }

                loading.value = false;
            }

            function changePostLabel(e){
                chosenLabelType.value = e;
            }

            function toShortLabel(){
                if(chosenLabelType.value == "Scientific Study") return "scientific";
                else if(chosenLabelType.value == "Image") return "image";
                else if(chosenLabelType.value == "Question") return "question";
                else if(chosenLabelType.value == "News") return "news";
                else if(chosenLabelType.value == "Other") return "other";
            }

            function changeSubSection(e){
                chosenSubSection.value = e;
            }

            return{
                changePostType,
                changePostLabel,
                chosenPostType,
                chosenLabelType,
                changeSubSection,
                valgtPostType,
                PostImagePost,
                PostLinkPost,
                PostPostPost,
                preparePost,
                loading,
                progress,
                postTextChanged,
            }
        }
    }

</script>