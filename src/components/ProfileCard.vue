<template>
    <div class="col" style="border: 1px solid rgb(222,222,222);border-radius: 6px;padding-right: 0px;padding-left: 0px;">
        <div class="card" style="width: 100%;">
            <div class="card-body" style="padding-top: 0px;">
                <div class="row">
                    <div  class="col px-0">
                        <input v-if="settings.userData.username == this.$route.params.username" style = "width:30px; height:30px; background-color:red; z-index:900;;" @input = "changepicture" type="file" accept="image/*" id="wallpaperbutton" hidden/>
                        
                        <label v-if="settings.userData.username == this.$route.params.username" class="btn btn-light d-flex justify-content-center align-items-center" type="button" style="position: absolute;z-index: 112;top: 0px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 30px;height: 30px; right:0%; margin-right:7px; margin-top:5px;" for="wallpaperbutton">
                            <Spinner v-if="loadingwallpaper"></Spinner>
                            <i v-else class="fas fa-camera"></i>
                        </label>
                    
                        <div class = "d-flex justify-content-end p-2 d-flex align-items-center justify-content-center" :style="{ 'background-image': 'url(' + wallpaperpicture + ')' }" style='height: 100px !important; background-size:cover;'>
                        </div>

                        <button class="btn btn-light disabled d-flex justify-content-center align-items-center" type="button" style="color: black; !important; position: absolute;z-index: 1;left: 0;top: 0;margin-top: 10px;border-radius: 10px;border-color: rgb(214,214,214);width: 50px;height: 25px;margin-left: 10px;">
                            <span style="font-weight: bold;font-size: 12px;">{{ userdata.usertype }}</span>
                        </button>
                        
                    </div>
                </div>

                <input v-if="settings.userData.username == this.$route.params.username" style = "width:30px; height:30px; background-color:red; z-index:900;;" @input = "changepicture" type="file" accept="image/*" id="profilepicbutton" hidden/>
                <label v-if="settings.userData.username == this.$route.params.username" class="btn btn-light d-flex justify-content-center align-items-center" type="button" style="position: relative;z-index: 1212;right: 0;top: -35px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 30px;height: 30px; left:50%; margin-top:0px;" for="profilepicbutton">
                    <Spinner v-if="loadingprofilepic"></Spinner>
                    <i v-else class="fas fa-camera"></i>
                </label>

                <div class = "custom-file btn btn-light d-flex justify-content-end p-2 d-flex align-items-center justify-content-center" :style="{ 'background-image': 'url(' + profilepicture + ')' }" style='cursor:default; z-index: 19999; style="position: absolute;z-index: 1;right: 0;top: 110px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 30px;height: 30px; width: 70px;min-width: 70px;max-width: 70px;height: 70px;min-height: 70px;max-height: 70px;position: absolute;left: 50%; transform: translateX(-50%);z-index: 1;margin-top: -50px;border: 2px solid #333;border-radius: 20px; background-size:cover;' for="actual-btn">
                
                </div>
                 
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-center card-title mt-3" style="font-weight: bold;color: rgb(105,105,105);">
                                    {{ userdata.username }}
                                </h4>
                                <span class="d-block me-2 text-gray-600 small d-block" style="font-family: Inter;color: #696969;text-align: center;font-size: 14px;margin-bottom: 4px;">
                                    <i class="fas fa-crown" style="color: #ffd700;margin-right: 3px;"></i>
                                        {{ userdata.postpoints + userdata.commentpoints }} points
                                </span>
                                <p v-if="settings.userData.username != this.$route.params.username" v-html = "userdata.about" class="card-text" style="font-size: 14px;color: #696969;">
                                </p>
                                <QuillEditor ref = "editor" v-if="settings.userData.username == this.$route.params.username" :toolbar = "[[{ header: [1, 2, 3, 4, 5, false] }],['bold', 'italic', 'underline', 'blockquote'],['code-block','video'],[{ 'align': [] }],[{ 'list': 'ordered'}, { 'list': 'bullet' },'list'],]" style = "height:150px;" class = "mb-2"></QuillEditor>
                                <button v-if="settings.userData.username == this.$route.params.username" @click = "saveAbout" class="btn btn-light d-flex justify-content-center align-items-center fw-bold mb-1" type="button" style="z-index: 1212;right: 0;top: -35px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 60px;height: 30px; left:50%; margin-top:0px;">
                                    <span v-if = "!loading">Save</span>
                                    <Spinner v-if = "loading"></Spinner>
                                </button>
                                
                                <hr>
                                <p class="card-text" style="font-size: 14px;color: #696969;margin-bottom: 5px; margin-top:10px;">
                                    <i class="fa fa-clock-o"></i>&nbsp;
                                    Member since {{ new Date(userdata.signupdate).toLocaleString() }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div v-if = "settings.userData.username == this.$route.params.username" class="col d-flex justify-content-start align-items-end" style="margin-top: 10px;">
                        <button @click = "sendPasswordResetEmail" class="border-rounded btn btn-light" href="#" style="border-color: rgb(214,214,214); font-size: 12px;font-weight: bold;">
                            Change password 
                        </button>
                    </div>
                    <div class="col d-flex justify-content-end align-items-end" style="margin-top: 10px;">
                        <div class="dropdown">
                            <button class="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button" style="color: rgb(55,92,200);font-weight: bold;font-family: Lato;font-size: 12px;">
                                More
                            </button>
                            <div class="dropdown-menu">
                                <router-link :to="{name: 'report', params:{ 'uid': userdata.uid }}" class="dropdown-item" href="#" style="font-size: 12px;font-weight: bold;">
                                    Report user
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import settings from "@/settings.js";
    import firebaseApp from "@/firebase/firebaseconfig.js";
    import firebase from "firebase";
    import Spinner from "./Spinner.vue";
    import { useRouter } from "vue-router";
    import { ref } from "vue";
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    var imagesrc = ref(null);
    var profilepicture = ref();
    var wallpaperpicture = ref();
    var progress = ref("");
    var loadingprofilepic = ref(false);
    var loadingwallpaper = ref(false);
    var loading = ref(false);
    var db = firebaseApp.firestore();
    var settingsMode = ref(false);
    var aboutText = ref("");
    

    export default{
        props:{
            userdata:Object,
        },
        components:{
            QuillEditor,
            Spinner,
        },
        mounted(){
            
        },
        setup(props){
            var editor = ref();
            var router = useRouter()
            
            setTimeout(function(){
                if(settings.value.userData && (settings.value.userData.username == router.currentRoute.value.params.username)){
                    editor.value.setHTML(props.userdata.about)
                }
                console.log(router);
                profilepicture.value = props.userdata.profilepicture;
                wallpaperpicture.value = props.userdata.wallpaper;
            }, 100)

            function changeMode(){
                if(settingsMode.value) settingsMode.value = false;
                else settingsMode.value = true;
            }

            function sendPasswordResetEmail(){
                firebase.auth().sendPasswordResetEmail(settings.value.userData.email)
                .then(() => {
                    alert("We've sent you a password-reset email. Remember to check your spam-folder");
                })
            }

            async function saveAbout(){
                loading.value = true;
                aboutText.value = editor.value.getHTML();
                await db.collection("users").doc(settings.value.user).update({
                    about: aboutText.value,
                })
                loading.value = false;
            }

            function changepicture(e){
                let reader = new FileReader(); // no arguments
                if(e.srcElement.id == "profilepicbutton"){
                    loadingprofilepic.value = true;
                }
                else{
                    loadingwallpaper.value = true;
                }
                if(e.srcElement.files[0].size > 2097152){
                    alert("Picture is too big, compress it or resize it");
                    loadingwallpaper.value = false;
                    loadingprofilepic.value = false;
                }
                else{
                    
                    
                    reader.readAsDataURL(e.srcElement.files[0]);
                        reader.onload = async function() {
                            
                            var storageRef = firebase.storage().ref();
                            
                            
                            var uploadTask = storageRef.child(`${settings.value.user}/${e.srcElement.files[0].name}`).put(e.srcElement.files[0]);

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
                            
                            loadingwallpaper.value = false;
                            loadingprofilepic.value = false;
                        }, 
                        () => {
                            // Handle successful uploads on complete
                            uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                                
                                if(e.srcElement.id == "profilepicbutton"){
                                    await db.collection("users").doc(settings.value.user).update({
                                        profilepicture: downloadURL
                                    })
                                    loadingprofilepic.value = false;
                                    settings.value.userData.profilepicture = downloadURL;
                                    profilepicture.value = downloadURL;
                                }
                                else{
                                    await db.collection("users").doc(settings.value.user).update({
                                        wallpaper: downloadURL
                                    })
                                    loadingwallpaper.value = false;
                                    settings.value.userData.wallpaper = downloadURL;
                                    wallpaperpicture.value = downloadURL;                     
                                }
                            });
                        })
                    };
                }
                
            }
            return{
                changepicture,
                imagesrc,
                profilepicture,
                Spinner,
                wallpaperpicture,
                loadingwallpaper,
                loadingprofilepic,
                saveAbout,
                settingsMode,
                changeMode,
                sendPasswordResetEmail,
                aboutText,
                loading,
                settings,
                editor,
            }
        }
    }
</script>