<template>
    <div class="col-12" style="margin-bottom: 5px;">
        <div class="card">
            <div class="card-body postBody editBody" style="border: 1px solid rgb(235,235,235);border-radius: 10px;padding-top: 8px;padding-bottom: 8px;">
                <div class="row" style="margin-right: 0px;margin-left: 0px;">
                    <router-link :to = "{name: 'post', params: {'id': postdata.id}}"  class="text-decoration-none rounded postImageSmallerOnPhones d-flex justify-content-center align-items-start" style="padding-right: 0px;padding-left: 0px; object-fit: cover;min-height:50px; min-width:50px; max-width:100px; max-height:100px; width:100px; height:100px;">
                            <div class="w-100 h-100 rounded d-flex align-items-center justify-content-center" :style="{ 'background-image': 'url(' + postdata.image + ')' }" style="background-position: center; background-size:cover; background-repeat: no-repeat;">
                            <i v-if="!testImage(postdata.image)" class="m-auto fas fa-link text-dark display-6"></i>
                        </div>
                    </router-link>
                    <div class="col-9 col-sm-9 col-md-9 col-lg-10 col-xl-10 col-xxl-10 postHeader d-flex flex-column justify-content-between">
                        <div class="row m-0 p-0">
                            <div class="col-12" style = "padding:0px; padding-left: 7px;">
                                <span :class = "{ [postdata.labelshort ]: true }" class = "small d-inline-block text-white px-1 d-block rounded-pill d-inline-flex align-items-center" style = "font-size:11px; margin-left:-2px; padding-top:0px; padding-bottom:0px; font-weight:800; ">
                                    {{ postdata.label }}
                                </span>
                                <span :class = "{ [postdata.sub ]: true }" class = "small d-inline-block text-white px-1 d-block rounded-pill d-inline-flex align-items-center" style = "text-transform:capitalize; font-size:11px; margin-left:5px; padding-top:0px; padding-bottom:0px; font-weight:800; ">
                                    {{ postdata.sub }}
                                </span>
                                <h6 id = "postTitle" class="postHeader mb-0 py-0 " style="color: rgb(79,79,79);">
                                    <router-link v-if = "this.$route.params.id != postdata.id" :to = "{name: 'post', params: {'id': postdata.id}}" class = "btn-link btn text-start posttitle p-0 text-decoration-none fw-bold d-inline">
                                        {{ postdata.title }}
                                    </router-link>
                                    <span v-else class = "p-0 text-decoration-none fw-bold d-inline">{{ postdata.title }}</span>
                                    <a v-if = "isURL(postdata.postsrc)" :href="postdata.postsrc" target="_blank" class="d-inline-block btn-link btn text-start p-0 text-secondary " style="font-size: 10px;color: var(--bs-blue);font-weight: 100;margin-left: 3px;">
                                    ({{ toURLOrigin(postdata.postsrc) }})
                                </a>
                                </h6>
                            </div>
                            <div class="col-12 d-flex justify-content-start align-items-center" style="padding-top: 0px;padding-bottom: px; padding-left:8px;">
                                <router-link v-if = "this.$route.name != 'search'" :to = "{'name':'user', params: {'username': postdata.postedbyusername }}" class = "btn-link btn d-flex align-items-center text-secondary text-decoration-none p-0 m-0" style = "font-size:12px;">
                                    <div class="d-inline-block" :style="{ 'background-image': 'url(' + postdata.postedbypic + ')' }" style='height: 20px;min-height: 20px;max-height: 20px;width: 20px;min-width: 20px;max-width: 20px; background-position:center; background-size:cover; background-repeat:no-repeat; border-radius: 22px;'>
                                    </div>
                                </router-link>
                                <div class = "d-inline-flex align-items-center postminiinfo" style = "font-size:12px">
                                
                                <span class = "d-inline d-flex align-items-center" style="padding-right: 5px;padding-left: 5px;">
                                    Posted by
                                    <router-link :to = "{'name':'user', params: {'username': postdata.postedbyusername }}" class = "btn-link btn d-inline text-secondary text-decoration-none p-0">
                                        {{ postdata.postedbyusername }}
                                    </router-link> <span style = "font-size:16px !important;">∙</span>
                                    <span>{{ timeAgo.format(new Date(postdata.created_date)) }} </span>
                                </span>
                                
                                </div>
                                
                            </div>
                            <PostEditing @editDone = "edited" v-if = "editMode == true && postdata" v-bind:postdata="postdata"></PostEditing>
                        </div>
                        <router-link :to = "{name: 'post', params: {'id': postdata.id}}"  v-if = "postdata.image && this.$route.name == 'post' && testImage(postdata.image) && postdata.type == 'image'"  class="row p-0 m-0">
                            <div class="col-12 d-flex align-items-center text-dark border rounded pb-1" style="padding-bottom: 0px; padding-left:5px; font-family: Inter;padding-top: 5px; ">
                                <i v-if="!testImage(postdata.image)" class="m-auto fas fa-link text-dark display-6"></i>
                                <img :src = "postdata.image" style = "max-width:100%;">
                            </div>
                        </router-link>
                        
                        <div class="row p-0 m-0">
                            <div class="col-12 d-flex align-items-center " style="padding-bottom: 0px; padding-left:5px; font-size: 13px;font-family: Inter;padding-top: 5px;">
                                <div class="btn-group" role="group" style="height: 24px;">
                                        <router-link :to = "{name: 'post', params: {'id': postdata.id}}" class="btn btn-light btn-sm d-flex align-items-center clickableWhiteButtons" type="button" style="margin-right: 5px;border-radius: 5px;color: #767676;border-width: 1px;border-color: #d0d0d0;">
                                            <i class="fas fa-comment"></i>
                                            <span style="font-size: 10px;margin-left: 3px;font-weight: bold;">
                                                {{ postdata.num_of_comments }}
                                            </span>
                                        </router-link>
                                        <button @click = "like" :class = "{'liked': postdata.votestatus == 'like'}" class=" text-dark btn btn-primary bg-light btn-sm d-flex justify-content-center align-items-center" type="button" style="margin-right: 6px;border-radius: 5px;border: 1px solid rgb(208, 208, 208); ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-inline-block">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.29289 9.70711C2.90237 9.31658 2.90237 8.68342 3.29289 8.29289L9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L16.7071 8.29289C17.0976 8.68342 17.0976 9.31658 16.7071 9.70711C16.3166 10.0976 15.6834 10.0976 15.2929 9.70711L11 5.41421L11 17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17L9 5.41421L4.70711 9.70711C4.31658 10.0976 3.68342 10.0976 3.29289 9.70711Z" fill="currentColor"></path>
                                            </svg>
                                        </button>
                                            <button class="btn disabled text-dark btn-sm d-flex justify-content-center align-items-center clickableWhiteButtons" type="button" style="color: #79909b;margin-right: 6px;border-radius: 5px;width: auto;margin-left: 0px;border: 1px solid #dddddd;">
                                                <span style="font-size: 12px;font-weight: bold;">
                                                    {{ postdata.totalscore }}
                                                </span>
                                            </button>
                                            <button @click = "dislike" :class = "{'disliked': postdata.votestatus == 'dislike'}" class=" btn btn-sm btn-danger bg-light text-dark d-flex justify-content-center align-items-center" type="button" style="margin-right: 6px;border-radius: 5px;border-width: 1px;border-color: #d0d0d0;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-inline-block" style="font-size: 14px;">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071L10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071L3.29289 11.7071C2.90237 11.3166 2.90237 10.6834 3.29289 10.2929C3.68342 9.90237 4.31658 9.90237 4.70711 10.2929L9 14.5858L9 3C9 2.44772 9.44772 2 10 2C10.5523 2 11 2.44772 11 3L11 14.5858L15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                            </button>
                                    <div class="dropdown btn-group" role="group">
                                        <button class="btn btn-light btn btn-light btn-sm d-flex align-items-center clickableWhiteButtons" aria-expanded="false" data-bs-toggle="dropdown" type="button" style="border-style: solid;border-color: #d0d0d0;border-radius: 5px;color: #767676;width: 31px;">
                                            <i class="fa fa-ellipsis-h">
                                            
                                            </i>
                                        </button>
                                        <div class="dropdown-menu" style="font-family: Inter;font-size: 12px;">
                                            <button v-if = "postdata.isOwner" @click = "deletePost(postdata.id)" class="dropdown-item" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                                <i class="fas fa-trash" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                                <span style="margin-left: 4px;color: #3a3b45;">Delete post</span>
                                            </button>
                                            <button @click = "switchMode" v-if = "postdata.isOwner" class="dropdown-item" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                                <i class="fas fa-edit" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                                <span style="margin-left: 4px;color: #3a3b45;">Edit post</span>
                                            </button>
                                            <router-link :to = "{name:'report', params:{'uid': postdata.id, 'type': postdata.type}}" class="dropdown-item" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                                <i class="fas fa-flag" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                                <span style="margin-left: 4px;color: #3a3b45;">Report</span>
                                            </router-link>
                                            <button @click = "save(postdata.id)" class="dropdown-item" href="#" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                                <i class="far fa-bookmark" :class = "{'fw-bolder': postdata.isSaved }" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                                <span style="margin-left: 4px;color: #3a3b45;">Save</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div v-if = "postdata.posttext && this.$route.name == 'post'"  class="row p-0 m-0 mt-1 p-2">
                    <div class="col-12 d-flex align-items-center text-dark border rounded p-1" style="padding-bottom: 0px; padding-left:5px; font-family: Inter; font-size:13px; ">
                        <p class = "mb-0 p-2" v-html = "postdata.posttext"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import firebaseApp from "@/firebase/firebaseconfig.js";
import firebase from "firebase";
import settings from "@/settings.js";
import PostEditing from "@/views/PostEditing.vue";
import { useRouter } from 'vue-router'
import { ref } from "vue";
import Spinner from "./Spinner.vue";

TimeAgo.addDefaultLocale(en)
var timeAgo = new TimeAgo('en-US')
var db = firebaseApp.firestore();
var batch = null;
var loading = ref(false);
var NotificationSchema = null;
var notificationid = null;

function toURLOrigin(str){
    if(str){
        try{
            var url = new URL(str).origin;
            return url.replace(/^(?:https?:\/\/)?(?:www\.)?/gi, "")
        }
        catch(e){
            return false;
        }
    }
}

function isURL(str){
    try{
        new URL(str);
        return true;
    }
    catch(e){
        return false;
    }
}

function testImage(URL) {
    var tester = new Image();
    tester.src = URL;
    if(tester.attributes[0].value == "") return false;
    else return true;
}

export default{
    props:{
        postdata: Object,
    },
    components:{
        PostEditing,
    },
    setup(props){
        var editMode = ref(false);
        var router = useRouter();

        async function edited(obj){
            
            if(obj.type == "cancel") {
                switchMode();
            }
            else{
                switchMode();

                loading.value = true;
                if(props.postdata.type == "link"){
                    // settings.value.posts[props.postdata.id].title = obj.posttitle;
                    settings.value.posts[props.postdata.id].postsrc = obj.postsrc;
                    settings.value.posts[props.postdata.id].image = obj.postimage;

                    await db.collection("posts").doc(props.postdata.id).update({
                        // "title": obj.posttitle,
                        "image": obj.postimage,
                        "postsrc": obj.postsrc,
                    })
                }
                else if(props.postdata.type == "image"){
                    // settings.value.posts[props.postdata.id].title = obj.posttitle;
                    settings.value.posts[props.postdata.id].image = obj.postimage;

                    await db.collection("posts").doc(props.postdata.id).update({
                        // "title": obj.posttitle,
                        "image": obj.postimage,
                    })
                }
                else{
                    // settings.value.posts[props.postdata.id].title = obj.posttitle;
                    settings.value.posts[props.postdata.id].posttext = obj.posttext;
                    settings.value.posts[props.postdata.id].image = obj.postimage;

                    await db.collection("posts").doc(props.postdata.id).update({
                        // "title": obj.posttitle,
                        "image": obj.postimage,
                        "posttext": obj.posttext,
                    })
                }
                loading.value = false;
            }
        }

        function switchMode(){
            if(editMode.value == true) editMode.value = false;
            else if(editMode.value == false) editMode.value = true;
            
        }

        async function deletePost(id){
            delete settings.value.posts[id];
            await db.collection("posts").doc(id).update({
                'deleted': true
            })
            if(router.currentRoute.value.name == "post"){
                router.push({name: "all"});
            }
            
        }
        async function save(id){
            if(!settings.value.user) document.querySelector("#login").click();
            else{
                if(settings.value.posts[id].isSaved){
                    settings.value.posts[id].isSaved = false;
                    delete settings.value.posts[id].saved[settings.value.user];
                    await db.collection("posts").doc(id).update({
                        ["saved." + settings.value.user]:firebase.firestore.FieldValue.delete()
                    },{ merge: true });
                }
                else{
                    settings.value.posts[id].isSaved = true;
                    settings.value.posts[id].saved[settings.value.user] = true;

                    NotificationSchema = {
                        contenttype: "notification",
                        type: "save",
                        belongsto: props.postdata.id,
                        belongstouid: props.postdata.authoruid,
                        byusername: settings.value.userData.username,
                        byuid: settings.value.user,
                        title: props.postdata.title,
                        created_date: new Date().getTime(),
                    }
                    notificationid = await db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc().id;
                    batch = db.batch();
                    batch.update(db.collection("users").doc(props.postdata.authoruid), {
                        notifications: firebase.firestore.FieldValue.increment(1),
                    })
                    batch.set(db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                    batch.update(db.collection("posts").doc(id), {
                        ["saved." + settings.value.user]: true,
                    });
                await batch.commit();
                }
            }
        }
        
        async function like() {
            if(!settings.value.user) document.querySelector("#login").click();
            else{
                //Remove Like -1
                if(props.postdata.votestatus == "like"){
                    delete settings.value.posts[props.postdata.id].votes[settings.value.user];
                    delete settings.value.posts[props.postdata.id].votestatus;
                    settings.value.posts[props.postdata.id].upvotes -= 1;
                    settings.value.posts[props.postdata.id].totalscore -= 1;
                    if(settings.value.user == settings.value.posts[props.postdata.id].authoruid) settings.value.userData.postpoints -= 1;

                    batch = db.batch();
                    batch.update(db.collection("users").doc(props.postdata.authoruid), {
                        postpoints: firebase.firestore.FieldValue.increment(-1),
                        points: firebase.firestore.FieldValue.increment(-1),
                    })
                    batch.update(db.collection("posts").doc(props.postdata.id),{
                        ["votes." + settings.value.user]:firebase.firestore.FieldValue.delete(),
                    })
                    batch.update(db.collection("posts").doc(props.postdata.id),{
                        totalscore: firebase.firestore.FieldValue.increment(-1),
                        upvotes: firebase.firestore.FieldValue.increment(-1),
                    })
                    await batch.commit();
                }
                //From Dislike to Like, therefore +2
                else if(props.postdata.votestatus == "dislike"){
                    settings.value.posts[props.postdata.id].votestatus = "like";
                    settings.value.posts[props.postdata.id].votes[settings.value.user] = "like";
                    settings.value.posts[props.postdata.id].upvotes += 1;
                    settings.value.posts[props.postdata.id].downvotes -= 1;
                    settings.value.posts[props.postdata.id].totalscore += 2;
                    if(settings.value.user == settings.value.posts[props.postdata.id].authoruid) settings.value.userData.postpoints += 2;

                    NotificationSchema = {
                        contenttype: "notification",
                        type: "like",
                        belongsto: props.postdata.id,
                        belongstouid: props.postdata.authoruid,
                        byusername: settings.value.userData.username,
                        byuid: settings.value.user,
                        title: props.postdata.title,
                        created_date: new Date().getTime(),
                    }
                    notificationid = await db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc().id;
                    batch = db.batch();
                    batch.update(db.collection("users").doc(props.postdata.authoruid), {
                        postpoints: firebase.firestore.FieldValue.increment(2),
                        points: firebase.firestore.FieldValue.increment(2),
                    })
                    batch.update(db.collection("posts").doc(props.postdata.id),{
                        ["votes." + settings.value.user]: "like"
                    })
                    batch.update(db.collection("users").doc(props.postdata.authoruid), {
                        // commentpoints: firebase.firestore.FieldValue.increment(1),
                        notifications: firebase.firestore.FieldValue.increment(1),
                    })
                    batch.set(db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                    batch.update(db.collection("posts").doc(props.postdata.id),{
                        totalscore: firebase.firestore.FieldValue.increment(2),
                        upvotes: firebase.firestore.FieldValue.increment(1),
                        downvotes: firebase.firestore.FieldValue.increment(-1),
                    })
                    await batch.commit();
                }
                //Neutral, Like +1
                else{
                    settings.value.posts[props.postdata.id].votestatus = "like";
                    settings.value.posts[props.postdata.id].votes[settings.value.user] = "like";
                    settings.value.posts[props.postdata.id].upvotes += 1;
                    settings.value.posts[props.postdata.id].totalscore += 1;
                    if(settings.value.user == settings.value.posts[props.postdata.id].authoruid) settings.value.userData.postpoints += 1;
                    
                    NotificationSchema = {
                        contenttype: "notification",
                        type: "like",
                        belongsto: props.postdata.id,
                        belongstouid: props.postdata.authoruid,
                        byusername: settings.value.userData.username,
                        byuid: settings.value.user,
                        title: props.postdata.title,
                        created_date: new Date().getTime(),
                    }

                    notificationid = await db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc().id;
                    batch = db.batch();
                    batch.update(db.collection("users").doc(props.postdata.authoruid),{
                        postpoints: firebase.firestore.FieldValue.increment(1),
                        notifications: firebase.firestore.FieldValue.increment(1),
                        points: firebase.firestore.FieldValue.increment(1),
                    })
                    batch.update(db.collection("posts").doc(props.postdata.id),{
                        ["votes." + settings.value.user]: "like"
                    })
                    batch.set(db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                    batch.update(db.collection("posts").doc(props.postdata.id), {
                        totalscore: firebase.firestore.FieldValue.increment(1),
                        upvotes: firebase.firestore.FieldValue.increment(1),
                    })
                    await batch.commit();
                }
            }
        }

        async function dislike(){
            if(!settings.value.user) document.querySelector("#login").click();
            else{
                //Removing a dislike, +1
                if(props.postdata.votestatus == "dislike"){
                    delete settings.value.posts[props.postdata.id].votes[settings.value.user];
                    delete settings.value.posts[props.postdata.id].votestatus;
                    settings.value.posts[props.postdata.id].downvotes -= 1;
                    settings.value.posts[props.postdata.id].totalscore += 1;
                    if(settings.value.user == settings.value.posts[props.postdata.id].authoruid) settings.value.userData.postpoints += 1;

                    batch = db.batch();
                    batch.update(db.collection("users").doc(props.postdata.authoruid), {
                        postpoints: firebase.firestore.FieldValue.increment(1),
                        points: firebase.firestore.FieldValue.increment(1),
                    })
                    batch.update(db.collection("posts").doc(props.postdata.id), {
                        ["votes." + settings.value.user]:firebase.firestore.FieldValue.delete(),
                    })
                    batch.update(db.collection("posts").doc(props.postdata.id), {
                        totalscore: firebase.firestore.FieldValue.increment(1),
                        downvotes: firebase.firestore.FieldValue.increment(-1),
                    })
                    await batch.commit();
                }
                //From like to dislike, -2
                else if(props.postdata.votestatus == "like"){
                    settings.value.posts[props.postdata.id].votestatus = "dislike";
                    settings.value.posts[props.postdata.id].votes[settings.value.user] = "dislike";
                    settings.value.posts[props.postdata.id].upvotes -= 1;
                    settings.value.posts[props.postdata.id].downvotes += 1;
                    settings.value.posts[props.postdata.id].totalscore -= 2;
                    if(settings.value.user == settings.value.posts[props.postdata.id].authoruid) settings.value.userData.postpoints -= 2;

                    NotificationSchema = {
                        contenttype: "notification",
                        type: "dislike",
                        belongsto: props.postdata.id,
                        belongstouid: props.postdata.authoruid,
                        byusername: settings.value.userData.username,
                        byuid: settings.value.user,
                        title: props.postdata.title,
                        created_date: new Date().getTime(),
                    }
                    notificationid = await db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc().id;
                    batch = db.batch()
                    batch.update(db.collection("users").doc(props.postdata.authoruid),{
                        postpoints: firebase.firestore.FieldValue.increment(-2),
                        points: firebase.firestore.FieldValue.increment(-2),
                        notifications: firebase.firestore.FieldValue.increment(1),
                    })
                    batch.update(db.collection("posts").doc(props.postdata.id), {
                        ["votes." + settings.value.user]:"dislike",
                    })
                    batch.set(db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                    batch.update(db.collection("posts").doc(props.postdata.id),{
                        totalscore: firebase.firestore.FieldValue.increment(-2),
                        downvotes: firebase.firestore.FieldValue.increment(1),
                        upvotes: firebase.firestore.FieldValue.increment(-1),
                    });
                    await batch.commit();
                }
                //Dislike, -1
                else{
                    settings.value.posts[props.postdata.id].votestatus = "dislike";
                    settings.value.posts[props.postdata.id].votes[settings.value.user] = "dislike";
                    settings.value.posts[props.postdata.id].downvotes += 1;
                    settings.value.posts[props.postdata.id].totalscore -= 1;
                    if(settings.value.user == settings.value.posts[props.postdata.id].authoruid) settings.value.userData.postpoints -= 1;
                    
                    NotificationSchema = {
                        contenttype: "notification",
                        type: "dislike",
                        belongsto: props.postdata.id,
                        belongstouid: props.postdata.authoruid,
                        byusername: settings.value.userData.username,
                        byuid: settings.value.user,
                        title: props.postdata.title,
                        created_date: new Date().getTime(),
                    }

                    notificationid = await db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc().id;
                    batch = db.batch();
                    batch.update(db.collection("users").doc(props.postdata.authoruid),{
                        postpoints: firebase.firestore.FieldValue.increment(-1),
                        notifications: firebase.firestore.FieldValue.increment(1),
                        points: firebase.firestore.FieldValue.increment(-1),
                    })
                    batch.update(db.collection("posts").doc(props.postdata.id), {
                        ["votes." + settings.value.user]:"dislike",
                    })
                    batch.set(db.collection("users").doc(props.postdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                    batch.update(db.collection("posts").doc(props.postdata.id),{
                        totalscore: firebase.firestore.FieldValue.increment(-1),
                        downvotes: firebase.firestore.FieldValue.increment(1),
                    })
                    await batch.commit();
                }
            }
        }

        return{
            timeAgo,
            toURLOrigin,
            testImage,
            isURL,
            dislike,
            like,
            save,
            deletePost,
            editMode,
            switchMode,
            edited,
            Spinner,
        }
    }
}

</script>