<template>

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
                                <h6 class="postHeader mb-0 py-0 " style="color: rgb(79,79,79);">
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
                                <router-link to = "/user" class = "btn-link btn d-flex align-items-center text-secondary text-decoration-none p-0 m-0" style = "font-size:12px;">
                                    <div class="d-inline-block" :style="{ 'background-image': 'url(' + postdata.postedbypic + ')' }" style='height: 20px;min-height: 20px;max-height: 20px;width: 20px;min-width: 20px;max-width: 20px; background-position:center; background-size:cover; background-repeat:no-repeat; border-radius: 22px;'>
                                    </div>
                                </router-link>
                                <div class = "d-inline-flex align-items-center postminiinfo" style = "font-size:12px">
                                
                                <span class = "d-inline d-flex align-items-center" style="padding-right: 5px;padding-left: 5px;">
                                    Posted by
                                    <router-link :to = "{'name':'user', params: {'username': postdata.postedbyusername }}" class = "btn-link btn d-inline text-secondary text-decoration-none p-0">
                                        {{ postdata.postedbyusername }}
                                    </router-link> <span style = "font-size:16px !important;">∙</span>
                                    {{ timeAgo.format(new Date(postdata.created_date)) }}
                                </span>
                                
                                </div>
                                
                            </div>
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
                                            <span class="d-none d-sm-block" style="font-size: 10px;margin-left: 3px;font-weight: bold;">
                                                {{ postdata.num_of_comments }}
                                            </span>
                                        </router-link>
                                        <button @click = "like" :class = "{'liked': postdata.votestatus == 'like'}" class=" text-dark btn btn-primary bg-light btn-sm d-flex justify-content-center align-items-center" type="button" style="margin-right: 6px;border-radius: 5px;border: 1px solid rgb(208, 208, 208); ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-inline-block">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.29289 9.70711C2.90237 9.31658 2.90237 8.68342 3.29289 8.29289L9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L16.7071 8.29289C17.0976 8.68342 17.0976 9.31658 16.7071 9.70711C16.3166 10.0976 15.6834 10.0976 15.2929 9.70711L11 5.41421L11 17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17L9 5.41421L4.70711 9.70711C4.31658 10.0976 3.68342 10.0976 3.29289 9.70711Z" fill="currentColor"></path>
                                            </svg>
                                        </button>
                                            <button class="btn disabled btn-sm d-flex justify-content-center align-items-center clickableWhiteButtons" type="button" style="color: #79909b;margin-right: 6px;border-radius: 5px;width: auto;margin-left: 0px;border: 1px solid #dddddd ;" disabled="">
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
                                            <button @click = "editPost" class="dropdown-item" href="#" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                                <i class="fas fa-edit" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                                <span style="margin-left: 4px;color: #3a3b45;">Edit post</span>
                                            </button>
                                            <router-link :to = "{name:'report', params:{'uid': postdata.id}}" class="dropdown-item" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                                <i class="fas fa-flag" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                                <span style="margin-left: 4px;color: #3a3b45;">Report</span>
                                            </router-link>
                                            <button @click = "save(postdata.id)" class="dropdown-item" href="#" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                                <i class="far fa-bookmark" :class = "{'fw-bolder': postdata.saved }" style="width: 12px;height: 12px;font-size: 13px;"></i>
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
                    <div class="col-12 d-flex align-items-center text-dark border rounded p-1" style="padding-bottom: 0px; padding-left:5px; font-family: Inter; ">
                        <p class = "mb-0 p-2" v-html = "postdata.posttext"></p>
                    </div>
                </div>
            </div>

</template>

<script>
import en from 'javascript-time-ago/locale/en'
import firebaseApp from "@/firebase/firebaseconfig.js";
import firebase from "firebase";
import settings from "@/settings.js";
import TimeAgo from 'javascript-time-ago'

TimeAgo.addDefaultLocale(en)
var timeAgo = new TimeAgo('en-US')
var db = firebaseApp.firestore();
var batch = null;

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

async function deletePost(id){
    delete settings.value.posts[id];
    await db.collection("posts").doc(id).update({
        'deleted': true
    })
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
    setup(props, context){
        function editPost(){
            context.emit("editTriggered", true);
        }
        async function save(id){
            if(!settings.value.user) document.querySelector("#login").click();
            else
            if(settings.value.user){
                if(settings.value.posts[id].saved){
                settings.value.posts[id].saved = false;
                await db.collection("users").doc(settings.value.user).collection("saved").doc(id).delete();
                }
                else{
                    settings.value.posts[id].saved = true;
                    await db.collection("users").doc(settings.value.user).collection("saved").doc(id).set({
                        'contenttype': props.postdata.contenttype,
                        'id': id,
                    })
                }
                
            }
            else{
                document.querySelector("#login").click();
            }
            
        }
        async function like() {
            //Fjern like
            
            if(!settings.value.user) document.querySelector("#login").click();
            else   
            if(props.postdata.votestatus == "like"){
                context.emit("voteChanged", {
                    "id": props.postdata.id,
                    "type": "delete",
                    "increment":-1,
                })
                batch = db.batch();
                batch.delete(db.collection("users").doc(settings.value.user).collection("votes").doc(props.postdata.id));
                batch.update(db.collection("users").doc(props.postdata.authoruid), {
                    postpoints: firebase.firestore.FieldValue.increment(-1),
                    points: firebase.firestore.FieldValue.increment(-1),
                })
                batch.update(db.collection("posts").doc(props.postdata.id),{
                    totalscore: firebase.firestore.FieldValue.increment(-1),
                    upvotes: firebase.firestore.FieldValue.increment(-1),
                })
                await batch.commit();
            }
            //Gå fra dislike til like, dermed ta +2
            else if(props.postdata.votestatus == "dislike"){
                context.emit("voteChanged", {
                    "id": props.postdata.id,
                    "type": "like",
                    "increment":2
                })
                batch = db.batch();
                batch.set(db.collection("users").doc(settings.value.user).collection("votes").doc(props.postdata.id),{
                    "id": props.postdata.id,
                    "type": "like",
                })
                batch.update(db.collection("users").doc(props.postdata.authoruid), {
                    postpoints: firebase.firestore.FieldValue.increment(2),
                    points: firebase.firestore.FieldValue.increment(2),
                })
                batch.update(db.collection("posts").doc(props.postdata.id),{
                    totalscore: firebase.firestore.FieldValue.increment(2),
                    upvotes: firebase.firestore.FieldValue.increment(2),
                })
                await batch.commit();
            }
            //Du har ikke lika den før, altså du er nøytral, da kan du bare ta +1
            else{
                context.emit("voteChanged", {
                    "id": props.postdata.id,
                    "type": "like",
                    "increment":1,
                })
                batch = db.batch();
                batch.set(db.collection("users").doc(settings.value.user).collection("votes").doc(props.postdata.id),{
                    "id": props.postdata.id,
                    "type": "like",
                })
                batch.update(db.collection("users").doc(props.postdata.authoruid),{
                    postpoints: firebase.firestore.FieldValue.increment(1),
                    points: firebase.firestore.FieldValue.increment(1),
                })
                batch.update(db.collection("posts").doc(props.postdata.id), {
                    totalscore: firebase.firestore.FieldValue.increment(1),
                    upvotes: firebase.firestore.FieldValue.increment(1),
                })
                await batch.commit();
            }
        }

        async function dislike(){
            
            if(!settings.value.user) document.querySelector("#login").click();
            else
            if(props.postdata.votestatus == "dislike"){
                context.emit("voteChanged", {
                    "id": props.postdata.id,
                    "type": "delete",
                    "increment":1,
                })
                batch = db.batch();
                batch.delete(db.collection("users").doc(settings.value.user).collection("votes").doc(props.postdata.id));
                batch.update(db.collection("users").doc(props.postdata.authoruid), {
                    postpoints: firebase.firestore.FieldValue.increment(1),
                    points: firebase.firestore.FieldValue.increment(1),
                })
                batch.update(db.collection("posts").doc(props.postdata.id), {
                    totalscore: firebase.firestore.FieldValue.increment(1),
                    downvotes: firebase.firestore.FieldValue.increment(1),
                })
                await batch.commit();
            }
            //Gå fra like til dislike, dermed ta -2
            else if(props.postdata.votestatus == "like"){
                context.emit("voteChanged", {
                    "id": props.postdata.id,
                    "type": "dislike",
                    "increment":-2
                })
                batch = db.batch()
                batch.set(db.collection("users").doc(settings.value.user).collection("votes").doc(props.postdata.id),{
                    "id": props.postdata.id,
                    "type": "dislike",
                });
                batch.update(db.collection("users").doc(props.postdata.authoruid),{
                    postpoints: firebase.firestore.FieldValue.increment(-2),
                    points: firebase.firestore.FieldValue.increment(-2),
                })
                batch.update(db.collection("posts").doc(props.postdata.id),{
                    totalscore: firebase.firestore.FieldValue.increment(-2),
                    downvotes: firebase.firestore.FieldValue.increment(-2),
                });
                await batch.commit();
            }
            //Du har ikke dislika den før, altså du er nøytral, da kan du bare ta -1
            else{
                context.emit("voteChanged", {
                    "id": props.postdata.id,
                    "type": "dislike",
                    "increment":-1,
                })
                batch = db.batch();
                batch.set(db.collection("users").doc(settings.value.user).collection("votes").doc(props.postdata.id), {
                    "id": props.postdata.id,
                    "type": "dislike",
                })
                batch.update(db.collection("users").doc(props.postdata.authoruid),{
                    postpoints: firebase.firestore.FieldValue.increment(-1),
                    points: firebase.firestore.FieldValue.increment(-1),
                })
                batch.update(db.collection("posts").doc(props.postdata.id),{
                    totalscore: firebase.firestore.FieldValue.increment(-1),
                    downvotes: firebase.firestore.FieldValue.increment(-1),
                })
                await batch.commit();
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
            editPost,
        }
    }
}

</script>