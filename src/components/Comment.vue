<template>
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 rounded bg-light py-2" style="padding-left: 0px; border: 1px solid rgb(214, 214, 214);">
        <section v-if = "!editMode">
        <div class="row" style="margin-right: 0px;margin-left: 0px;">
            <div class="col d-flex justify-content-start align-items-center" style="padding-top: 2px;padding-bottom: 2px;">
                <div class="d-inline-block" :style="{ 'background-image': 'url(' + commentdata.commentauthorpic + ')' }" style="height: 20px;min-height: 20px;max-height: 20px;width: 20px;min-width: 20px;max-width: 20px; background-position: center; background-size:cover; border-radius: 22px;">
                </div>
                <router-link :to = "{name: 'user', params:{username: commentdata.commentauthorusername }}" style="padding-right: 5px;padding-left: 5px;font-size: 12px;">
                    {{ commentdata.commentauthorusername }}
                </router-link>
                <span style="font-size: 12px;">
                    {{ timeAgo.format(new Date(commentdata.created_date)) }}
                </span>
            </div>
        </div>
        <div class="row" style="margin-left: 0px;margin-right: 0px;">
            <div class="col">
                <div style="margin-bottom: 0px;font-size: 12px;color: rgb(86,86,86);" v-html = "commentdata.commenttext">
                </div>
            </div>
        </div>
        </section>
        <EditCommentComponent @editChanged="edited" v-bind:commentdata = "commentdata" v-if = "editMode && commentdata"></EditCommentComponent>
        <div class="row align-items-center" style="margin-right: 0px;margin-left: 0px;">
            <div class="col-12" style="padding-bottom: 0px;font-size: 13px;font-family: Inter;margin-top: 5px;">
                <div class="btn-group" role="group" style="height: 24px;">
                    <button :class = "{'liked': commentdata.votestatus == 'like'}" @click = "like" class=" text-dark btn btn-primary bg-light btn-sm d-flex justify-content-center align-items-center" type="button" style="margin-right: 6px;border-radius: 5px;border: 1px solid rgb(208, 208, 208); ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-inline-block">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.29289 9.70711C2.90237 9.31658 2.90237 8.68342 3.29289 8.29289L9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L16.7071 8.29289C17.0976 8.68342 17.0976 9.31658 16.7071 9.70711C16.3166 10.0976 15.6834 10.0976 15.2929 9.70711L11 5.41421L11 17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17L9 5.41421L4.70711 9.70711C4.31658 10.0976 3.68342 10.0976 3.29289 9.70711Z" fill="currentColor"></path>
                        </svg>
                    </button>
                        <button class="btn disabled btn-sm d-flex text-dark justify-content-center align-items-center clickableWhiteButtons" type="button" style="color: #79909b;margin-right: 6px;border-radius: 5px;width: auto;margin-left: 0px;border: 1px solid #dddddd ;" disabled="">
                            <span style="font-size: 12px;font-weight: bold;">
                                {{ commentdata.totalscore }}
                            </span>
                        </button>
                        <button :class = "{'disliked': commentdata.votestatus == 'dislike'}" @click = "dislike" class=" btn btn-sm btn-danger bg-light text-dark d-flex justify-content-center align-items-center" type="button" style="margin-right: 6px;border-radius: 5px;border-width: 1px;border-color: #d0d0d0;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="d-inline-block" style="font-size: 14px;">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071L10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071L3.29289 11.7071C2.90237 11.3166 2.90237 10.6834 3.29289 10.2929C3.68342 9.90237 4.31658 9.90237 4.70711 10.2929L9 14.5858L9 3C9 2.44772 9.44772 2 10 2C10.5523 2 11 2.44772 11 3L11 14.5858L15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929Z" fill="currentColor">
                                </path>
                            </svg>
                        </button>
                        <router-link v-if = "this.$route.name == 'user'" :to = "{name: 'post', params: {id: commentdata.commentbelongsto }}" class=" btn btn-sm btn-light text-dark d-flex justify-content-center align-items-center" type="button" style="margin-right: 6px;border-radius: 5px;border-width: 1px;border-color: #d0d0d0;">
                            <i class="fas fa-external-link-square-alt"></i>
                        </router-link>
                    <div class="dropdown btn-group" role="group">
                        <button class="btn btn-light btn btn-light btn-sm d-flex align-items-center clickableWhiteButtons" aria-expanded="false" data-bs-toggle="dropdown" type="button" style="border-style: solid;border-color: #d0d0d0;border-radius: 5px;color: #767676;width: 31px;">
                            <i class="fa fa-ellipsis-h">
                            
                            </i>
                        </button>
                        <div class="dropdown-menu" style="font-family: Inter;font-size: 12px;">
                            <button v-if = "commentdata.isOwner" @click = "deleteComment" class="dropdown-item" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                <i class="fas fa-trash" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                <span style="margin-left: 4px;color: #3a3b45;">Delete comment</span>
                            </button>
                            <button @click="showEditField" v-if = "editMode == false && commentdata.isOwner" class="dropdown-item" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                <i class="fas fa-edit" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                <span style="margin-left: 4px;color: #3a3b45;">Edit comment</span>
                            </button>
                            <router-link :to = "{name:'report', params:{'uid': commentdata.commentid, 'type': 'comment'}}" class="dropdown-item" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                <i class="fas fa-flag" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                <span style="margin-left: 4px;color: #3a3b45;">Report</span>
                            </router-link>
                            <button @click = "save(commentdata.id)" class="dropdown-item" style="font-family: Inter;font-size: 12px;color: rgb(112,112,112);">
                                <i class="far fa-bookmark" :class = "{'fw-bolder': commentdata.isSaved }" style="width: 12px;height: 12px;font-size: 13px;"></i>
                                <span style="margin-left: 4px;color: #3a3b45;">Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                
    </div>
</template>

<script>
    import TimeAgo from 'javascript-time-ago'
    import en from 'javascript-time-ago/locale/en'
    import { ref, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import firebaseApp from "@/firebase/firebaseconfig.js";
    import firebase from "firebase";
    import settings from "@/settings.js";
    import EditCommentComponent from "@/components/EditCommentComponent.vue";

    TimeAgo.addDefaultLocale(en)
    var timeAgo = new TimeAgo('en-US');

    export default{
        components:{
            EditCommentComponent,
        },
        props:{
            commentdata: Object,
        },
        setup(props){
            var db = firebaseApp.firestore();
            var batch = db.batch();
            var postid = ref("");
            var editMode = ref(false);
            var router = useRouter();
            var NotificationSchema = null;
            var notificationid = null;

            onMounted(() => {
                postid.value = router.currentRoute.value.params.id;
            })

            async function deleteComment(){
                delete settings.value.comments[props.commentdata.commentid];
                delete settings.value.usercontent[props.commentdata.commentid];
                await db.collection("comments").doc(props.commentdata.commentid).update({
                    'deleted': true
                })
            }

            function showEditField(){
                editMode.value = !editMode.value;
            }

            async function edited(e){
                editMode.value = false;
                if(e.type == "edited"){
                    settings.value.comments[props.commentdata.commentid].commenttext = e["value"];
                    await db.collection("comments").doc(props.commentdata.commentid).update({
                        "commenttext": e["value"]
                    })
                }
            }

            async function like() {
                //Fjern like
                if(!settings.value.user) document.querySelector("#login").click();
                else{
                    //Removing a like, -1
                    if(props.commentdata.votestatus == "like"){
                        delete settings.value.comments[props.commentdata.commentid].votes[settings.value.user];
                        delete settings.value.comments[props.commentdata.commentid].votestatus;
                        settings.value.comments[props.commentdata.commentid].upvotes -= 1;
                        settings.value.comments[props.commentdata.commentid].totalscore -= 1;
                        settings.value.userData.commentpoints -= 1;

                        batch = db.batch();
                        batch.update(db.collection("users").doc(props.commentdata.authoruid), {
                            commentpoints: firebase.firestore.FieldValue.increment(-1),
                            points: firebase.firestore.FieldValue.increment(-1),
                        });
                        batch.update(db.collection("comments").doc(props.commentdata.commentid),{
                            totalscore: firebase.firestore.FieldValue.increment(-1),
                            upvotes: firebase.firestore.FieldValue.increment(-1),
                            ["votes." + settings.value.user]:firebase.firestore.FieldValue.delete(),
                        })
                        await batch.commit();
                    }
                    //From dislike to like, +2
                    else if(props.commentdata.votestatus == "dislike"){
                        settings.value.comments[props.commentdata.commentid].votestatus = "like"
                        settings.value.comments[props.commentdata.commentid].votes[settings.value.user] = "like";
                        settings.value.comments[props.commentdata.commentid].upvotes += 1;
                        settings.value.comments[props.commentdata.commentid].downvotes -= 1;
                        settings.value.comments[props.commentdata.commentid].totalscore += 2;
                        settings.value.userData.commentpoints += 2;

                        NotificationSchema = {
                            contenttype: "notification",
                            type: "like",
                            belongsto: props.commentdata.commentbelongsto,
                            belongstouid: props.commentdata.authoruid,
                            byusername: settings.value.userData.username,
                            byuid: settings.value.user,
                            title: props.commentdata.commenttext,
                            created_date: new Date().getTime(),
                        }
                        notificationid = await db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc().id;

                        batch = db.batch();
                        batch.update(db.collection("users").doc(props.commentdata.authoruid), {
                            commentpoints: firebase.firestore.FieldValue.increment(2),
                            points: firebase.firestore.FieldValue.increment(2),
                        });
                        batch.update(db.collection("users").doc(props.commentdata.authoruid), {
                            notifications: firebase.firestore.FieldValue.increment(1),
                        })
                        batch.set(db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                        batch.update(db.collection("comments").doc(props.commentdata.commentid),{
                            totalscore: firebase.firestore.FieldValue.increment(2),
                            upvotes: firebase.firestore.FieldValue.increment(1),
                            downvotes: firebase.firestore.FieldValue.increment(-1),
                            ["votes." + settings.value.user]: "like"
                        })
                        await batch.commit();
                        
                    }
                    //Neutral like, +1
                    else{
                        settings.value.comments[props.commentdata.commentid].votestatus = "like"
                        settings.value.comments[props.commentdata.commentid].votes[settings.value.user] = "like";
                        settings.value.comments[props.commentdata.commentid].totalscore += 1;
                        settings.value.comments[props.commentdata.commentid].upvotes += 1;
                        settings.value.userData.commentpoints += 1;

                        NotificationSchema = {
                            contenttype: "notification",
                            type: "like",
                            belongsto: props.commentdata.commentbelongsto,
                            belongstouid: props.commentdata.authoruid,
                            byusername: settings.value.userData.username,
                            byuid: settings.value.user,
                            title: props.commentdata.commenttext,
                            created_date: new Date().getTime(),
                        }
                        notificationid = await db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc().id;

                        batch = db.batch();
                        batch.update(db.collection("comments").doc(props.commentdata.commentid), {
                            totalscore: firebase.firestore.FieldValue.increment(1),
                            upvotes: firebase.firestore.FieldValue.increment(1),
                            ["votes." + settings.value.user]: "like"
                        })
                        batch.update(db.collection("users").doc(props.commentdata.authoruid), {
                            notifications: firebase.firestore.FieldValue.increment(1),
                        })
                        batch.set(db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                        batch.update(db.collection("users").doc(props.commentdata.authoruid),{
                            commentpoints: firebase.firestore.FieldValue.increment(1),
                            points: firebase.firestore.FieldValue.increment(1),
                        })
                        await batch.commit();
                    }
                }
            }

            async function dislike() {
                if(!settings.value.user) document.querySelector("#login").click();
                else{
                    //Dislike remove +1
                    if(props.commentdata.votestatus == "dislike"){
                        delete settings.value.comments[props.commentdata.commentid].votestatus;
                        delete settings.value.comments[props.commentdata.commentid].votes[settings.value.user];
                        settings.value.comments[props.commentdata.commentid].downvotes -= 1;
                        settings.value.comments[props.commentdata.commentid].totalscore += 1;
                        settings.value.userData.commentpoints += 1;

                        batch = db.batch();
                        batch.update(db.collection("users").doc(props.commentdata.authoruid), {
                            commentpoints: firebase.firestore.FieldValue.increment(1),
                            points: firebase.firestore.FieldValue.increment(1),
                        });
                        batch.update(db.collection("comments").doc(props.commentdata.commentid),{
                            totalscore: firebase.firestore.FieldValue.increment(1),
                            downvotes: firebase.firestore.FieldValue.increment(-1),
                            ["votes." + settings.value.user]: firebase.firestore.FieldValue.delete(),
                        });
                        await batch.commit();
                    }
                    //From like to dislike -2
                    else if(props.commentdata.votestatus == "like"){
                        settings.value.comments[props.commentdata.commentid].downvotes += 1;
                        settings.value.comments[props.commentdata.commentid].upvotes -= 1;
                        settings.value.comments[props.commentdata.commentid].totalscore -= 2;
                        settings.value.userData.commentpoints += 2;
                        settings.value.comments[props.commentdata.commentid].votestatus = "dislike";
                        settings.value.comments[props.commentdata.commentid].votes[settings.value.user] = "dislike";

                        NotificationSchema = {
                            contenttype: "notification",
                            type: "dislike",
                            belongsto: props.commentdata.commentbelongsto,
                            belongstouid: props.commentdata.authoruid,
                            byusername: settings.value.userData.username,
                            byuid: settings.value.user,
                            title: props.commentdata.commenttext,
                            created_date: new Date().getTime(),
                        }
                        notificationid = await db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc().id;

                        batch = db.batch();
                        batch.update(db.collection("users").doc(props.commentdata.authoruid), {
                            commentpoints: firebase.firestore.FieldValue.increment(2),
                            points: firebase.firestore.FieldValue.increment(2),
                        });
                        batch.update(db.collection("users").doc(props.commentdata.authoruid), {
                            notifications: firebase.firestore.FieldValue.increment(1),
                        })
                        batch.set(db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                        batch.update(db.collection("comments").doc(props.commentdata.commentid),{
                            totalscore: firebase.firestore.FieldValue.increment(2),
                            upvotes: firebase.firestore.FieldValue.increment(-1),
                            downvotes: firebase.firestore.FieldValue.increment(1),
                            ["votes." + settings.value.user]: "dislike"
                        })
                        await batch.commit();
                        
                    }
                    //Neutral dislike -1
                    else{
                        settings.value.comments[props.commentdata.commentid].downvotes += 1;
                        settings.value.comments[props.commentdata.commentid].totalscore -= 1;
                        settings.value.userData.commentpoints -= 1;
                        settings.value.comments[props.commentdata.commentid].votes[settings.value.user] = "dislike";
                        settings.value.comments[props.commentdata.commentid].votestatus = "dislike";

                        NotificationSchema = {
                            contenttype: "notification",
                            type: "dislike",
                            belongsto: props.commentdata.commentbelongsto,
                            belongstouid: props.commentdata.authoruid,
                            byusername: settings.value.userData.username,
                            byuid: settings.value.user,
                            title: props.commentdata.commenttext,
                            created_date: new Date().getTime(),
                        }
                        notificationid = await db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc().id;

                        batch = db.batch();
                        batch.update(db.collection("users").doc(props.commentdata.authoruid),{
                            commentpoints: firebase.firestore.FieldValue.increment(-1),
                            points: firebase.firestore.FieldValue.increment(-1),
                        })
                        batch.update(db.collection("users").doc(props.commentdata.authoruid), {
                            notifications: firebase.firestore.FieldValue.increment(1),
                        })
                        batch.set(db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                        batch.update(db.collection("comments").doc(props.commentdata.commentid), {
                            totalscore: firebase.firestore.FieldValue.increment(-1),
                            downvotes: firebase.firestore.FieldValue.increment(1),
                            ["votes." + settings.value.user]: "dislike"
                        })
                        await batch.commit();
                    }
                }
            }

            async function save(){
                if(!settings.value.user) document.querySelector("#login").click();
                else{
                    if(settings.value.comments[props.commentdata.commentid].isSaved){
                        settings.value.comments[props.commentdata.commentid].isSaved = false;
                        delete settings.value.comments[props.commentdata.commentid].saved[settings.value.user];
                        await db.collection("comments").doc(props.commentdata.commentid).update({
                            ["saved." + settings.value.user]:firebase.firestore.FieldValue.delete()
                        },{ merge: true });
                    }
                    else{
                        settings.value.comments[props.commentdata.commentid].isSaved = true;
                        settings.value.comments[props.commentdata.commentid].saved[settings.value.user] = true;

                        NotificationSchema = {
                            contenttype: "notification",
                            type: "save",
                            belongsto: props.commentdata.commentbelongsto,
                            belongstouid: props.commentdata.authoruid,
                            byusername: settings.value.userData.username,
                            byuid: settings.value.user,
                            title: props.commentdata.commenttext,
                            created_date: new Date().getTime(),
                        }
                        notificationid = await db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc().id;

                        batch = db.batch();
                        batch.update(db.collection("comments").doc(props.commentdata.commentid), {
                            ["saved." + settings.value.user]:true,
                        })
                        batch.update(db.collection("users").doc(props.commentdata.authoruid), {
                            notifications: firebase.firestore.FieldValue.increment(1),
                        })
                        batch.set(db.collection("users").doc(props.commentdata.authoruid).collection("notifications").doc(notificationid), NotificationSchema);
                        await batch.commit();
                    }
                }
            }
            
            return{
                timeAgo,
                like,
                dislike,
                save,
                deleteComment,
                EditCommentComponent,
                editMode,
                showEditField,
                edited,
            }
        }
    }

</script>