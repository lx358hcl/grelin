<template>
    <li class="nav-item dropdown no-arrow">
        <div class="modal fade" role="dialog" tabindex="-1" id="signIn" aria-hidden="true" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog modal-lg m-0" role="document" style="position: absolute;top: 50%;left: 50%;width: 100%;transform: translate(-50%, -50%);">
                <div class="modal-content" style="border: none;">
                    <div class="card shadow-lg" style="width: 100%; top:50%; transform:">
                        <div class="card-body p-0">
                            <div class="row w-100 m-0">
                                <div class="col-12" style="margin-top: 6px;height: auto;">
                                    <header>
                                        <button class="btn btn-link float-end" type="button" data-bs-target="#signIn" data-bs-toggle="modal" style="margin-right: -5px;">
                                            <i class="fa fa-times float-end" style="font-size: 28px;color: #848796;"></i>
                                        </button>
                                    </header>
                                </div>
                                <div class="col-lg-6 d-none d-lg-flex" style="padding: 0px;">
                                    <div class="flex-grow-1 bg-login-image" style="background: url(https://firebasestorage.googleapis.com/v0/b/grelin-7442d.appspot.com/o/leaves.png?alt=media&token=343a429b-1fef-41e8-90f9-66ae39ffdf8d) 70% 44% / 80% no-repeat;">
                                    
                                    </div>
                                </div>
                                <div class="col-lg-6" style="padding-right: 0px;padding-left: 0px;">
                                    <div class="px-5 pb-4" style="padding-top: 15px;">
                                        <div class="text-center">
                                            <h4 class="text-dark mb-4" style="font-family: 'Cormorant Garamond', serif;font-weight: bold;font-size: 28px;">
                                                Login
                                            </h4>
                                        </div>
                                        <form v-on:submit.prevent="login()" class="user">
                                            <div class="mb-3">
                                                <input v-model = "email" class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" style="font-family: Inter;">
                                                
                                            </div>
                                            <div class="mb-3">
                                                <input v-model = "password" class="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Password" name="password" style="font-family: Inter;">
                                                
                                            </div>

                                            <span class = "d-block text-center text-danger mb-3">{{ errorText }}</span>
                                            
                                            <button class="btn btn-primary d-block btn-user w-100 d-flex justify-content-center align-items-center" type="submit" style="font-weight: bold;font-family: Inter;font-size: 14px;">
                                                <Spinner style = "font-size:18px; " class = "text-white" v-if = "loading" ></Spinner>
                                                <span v-else>Login</span>
                                            </button>
                                        <hr>
                                        </form>
                                        <div class="text-center" style="font-size: 14px;font-family: Inter;">
                                            <a href = "/forgotpassword" class="small" style="font-family: Inter;font-size: 12px;">
                                                Forgot Password?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" role="dialog" tabindex="-1" id="signUp" aria-hidden="true" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog modal-lg m-0" role="document" style="position: absolute;top: 50%;left: 50%;width: 100%;transform: translate(-50%, -50%);">
                <div class="modal-content" style="border: none;">
                    <div class="card shadow-lg" style="width: 100%; top:50%; transform:">
                        <div class="card-body p-0">
                            <div class="row w-100 m-0">
                                <div class="col-12" style="margin-top: 6px;">
                                    <header>
                                        <button class="btn btn-link float-end" type="button" data-bs-target="#signUp" data-bs-toggle="modal" style="margin-right: -5px;">
                                            <i class="fa fa-times float-end" style="font-size: 28px;color: #848796;">
                                            
                                            </i>
                                        </button>
                                    </header>
                                </div>
                                <div class="col-lg-5 d-none d-lg-flex" style="padding-right: 0px;padding-left: 0px;">
                                    <div class="flex-grow-1 w-100" style="background: url(https://firebasestorage.googleapis.com/v0/b/grelin-7442d.appspot.com/o/coffeeguy.png?alt=media&token=7dba7f32-b280-427c-b50c-0dba00717b2c) 0% -50% / 110% no-repeat">
                                    
                                    </div>
                                </div>
                                <div class="col-lg-7" style="padding-right: 0px;font-weight: bold;font-size: 28px;&quot;>Join Grelin</h4> </div> <form class=&quot;user&quot;> <div class=&quot;row mb-3&quot;> <div class=&quot;col-sm-12 mb-3 mb-sm-0&quot;><input type=&quot;text&quot; class=&quot;form-control form-control-user&quot; id=&quot;exampleFirstName&quot; placeholder=&quot;Username&quot; name=&quot;first_name&quot; /></div> </div> <div class=&quot;mb-3&quot;><input type=&quot;email&quot; class=&quot;form-control form-control-user&quot; id=&quot;exampleInputEmail&quot; aria-describedby=&quot;emailHelp&quot; placeholder=&quot;Email Address&quot; name=&quot;email&quot; /></div> <div class=&quot;row mb-3&quot;> <div class=&quot;col-sm-12 mb-3 mb-sm-0&quot;><input type=&quot;password&quot; class=&quot;form-control form-control-user&quot; id=&quot;examplePasswordInput&quot; placeholder=&quot;Password&quot; name=&quot;password&quot; /></div> </div><button class=&quot;btn btn-primary d-block btn-user w-100&quot; type=&quot;submit&quot; style=&quot;font-family: Inter;font-weight: bold;font-size: 14px;&quot;>Register Account</button> <hr /><a class=&quot;btn btn-primary d-block btn-google btn-user w-100 mb-2&quot; role=&quot;button&quot; style=&quot;font-family: Inter;font-weight: bold;font-size: 14px;&quot;><i class=&quot;fab fa-google&quot;></i> Register with Google</a><a class=&quot;btn btn-primary d-block btn-facebook btn-user w-100&quot; role=&quot;button&quot; style=&quot;font-family: Inter;font-weight: bold;font-size: 14px;&quot;><i class=&quot;fab fa-facebook-f&quot;></i> Register with Facebook</a> <hr /> </form> <div class=&quot;text-center&quot;><a class=&quot;small&quot; href=&quot;forgot-password.html&quot; style=&quot;font-family: Inter;&quot;>Forgot Password?</a></div> <div class=&quot;text-center&quot;><a class=&quot;small&quot; href=&quot;login.html&quot; style=&quot;font-family: Inter;padding-left: 0px;">
                                    <div class="px-5 pb-4">
                                        <div class="text-center">
                                            <h4 class="text-dark mb-4" style="font-family: 'Cormorant Garamond', serif;font-weight: bold;font-size: 28px;">Create an Account</h4>
                                        </div>
                                        <form v-on:submit.prevent="createUser()" class="user">
                                            <div class="row mb-3">
                                                <div class="col-sm-12 mb-3 mb-sm-0">
                                                    <input required v-model = "username" class="form-control form-control-user" type="text" placeholder="Username" name="username">
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <input required v-model = "email" class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" name="email">
                                                
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-sm-12 mb-3 mb-sm-0">
                                                    <input required v-model = "password" class="form-control form-control-user" type="password" id="examplePasswordInput" placeholder="Password" name="password">
                                                
                                                </div>
                                            </div>
                                            <span class = "d-block text-center text-danger mb-3">{{ errorText }}</span>
                                            <button class="btn btn-primary d-block btn-user w-100 text-center d-flex justify-content-center" type="submit" style="font-family: Inter;font-weight: bold;font-size: 14px;">
                                                <Spinner style = "font-size:18px; " class = "text-white" v-if = "loading" ></Spinner>
                                                <span v-else>Register Account</span>
                                            </button>
                                            <hr>
                                        </form>
                                        <div class="text-center" style="font-family: Inter;font-size: 14px;font-weight: normal;">
                                            <a href = "/forgotpassword" class="small" style="font-family: Inter;font-size: 12px;">
                                                Forgot Password?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-group" role="group">
            <button id = "login" class="btn btn-light clickableWhiteButtons loginSignUpKnappDesign navButtons" type="button" style="margin-right:7px;  border-radius: 6px;color: rgb(113,113,113);font-size: 16px;font-family: Inter;border-width: 1px;border-color: #d0d0d0; min-width: 45px; border-radius: 10px; height: 45px; padding: 6px; border-style: solid; border-color: rgb(224, 224, 224);" data-target="#modal-1" data-toggle="modal" data-bs-target="#signIn" data-bs-toggle="modal">
                <span class = "d-none d-lg-block signUpButtons">
                    Login
                </span>
                <i class="d-block d-lg-none fas fa-sign-in-alt" style = "font-size:16px">
                
                </i>
            </button>
            <button id = "signup"  class="btn btn-light clickableWhiteButtons loginSignUpKnappDesign navButtons" type="button" style="margin-right:7px; border-radius: 6px;color: rgb(113,113,113);font-size: 16px;font-family: Inter;border-width: 1px;border-color: #d0d0d0; min-width: 45px; border-radius: 10px; height: 45px; padding: 6px; border-style: solid; border-color: rgb(224, 224, 224);" data-bs-target="#signUp" data-bs-toggle="modal">
                <span class = "d-none d-lg-block signUpButtons">
                    Sign Up
                </span>
                <i class="d-block d-lg-none fas fa-user-plus" style = "font-size:14px">
                
                </i>
            </button>
        </div>
    </li>
</template>

<script>
    import firebaseApp from "../firebase/firebaseconfig.js";
    import firebase from "firebase";
    import { ref } from "vue";
    import Spinner from "./Spinner.vue";

    //Noen reffer vi trenger 
    var email = ref("");
    var password = ref("");
    var username = ref("");
    var errorText = ref("");
    var user = ref("");
    var db = firebaseApp.firestore();
    var loading = ref(false);

    //OpprettBruker
    async function createUser() {
        loading.value = true;
        var userExists = await findUsername(username.value);

        if (userExists == false) makeUser();
        else{
            loading.value = false;
            return undefined;
        }
    }

    //Finnes bruker funksjon
    async function findUsername(username) {
        var user = await db.collection("usernames").doc(username).get();
        
        if (user.exists) {
            errorText.value = "That username exists, pick another.";
            return true;
        } 
        else {
            return false;
        }
    }

    //Lag ny bruker funksjon
    async function makeUser() {
        try {
            var batch = db.batch();
            
            loading.value = true;
            

            await firebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value);
            user.value = await firebaseApp.auth().currentUser;

            batch.set(db.collection("usernames").doc(username.value), {});
            batch.update(db.collection("websiteinfo").doc("info"), {
                "members":firebase.firestore.FieldValue.increment(1),
            });
            batch.set(db.collection("users").doc(user.value.uid), {
                "username": username.value,
                "profilepicture": "https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/1_400x400.webp?alt=media&token=fabbcb0f-f836-4e8f-984b-34be3af85b00",
                "about": "This user hasn't told the world his/her favorite nootropic yet, what a shame.",
                "email": email.value,
                "uid": user.value.uid,
                "signupdate": new Date().getTime(),
                "commentpoints": 0,
                "points": 0,
                "postpoints": 0,
                "usertype": "User",
                "lastTimeInNotificationsPage": new Date().getTime(),
                "notifications": 0,
                "wallpaper": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6429d5dd-5732-47ad-aded-6961134a6892/d63otld-66ba785a-7000-4850-a832-24910f16d225.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0MjlkNWRkLTU3MzItNDdhZC1hZGVkLTY5NjExMzRhNjg5MlwvZDYzb3RsZC02NmJhNzg1YS03MDAwLTQ4NTAtYTgzMi0yNDkxMGYxNmQyMjUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.DJ_GYDIHK95TrbfGjPk71bUw2VyuEdTniWQL8qj53w0"
            })
            await batch.commit();
            loading.value = false;
            window.location = "/";
        }
        catch (error) {
            if (error.code == "auth/email-already-in-use") errorText.value = "That email already exists";
            else if (error.code == "auth/weak-password") errorText.value = "Your password has to be at least 6 characters long";
            else  errorText.value = "An unknown error occurred, contact Luka";
            loading.value = false;
        } 
    }

    async function login() {
        try {
          loading.value = true;
          await firebaseApp.auth().signInWithEmailAndPassword(email.value, password.value);
          window.location = window.origin + "/";
        } 
        catch (e) {
          switch(e.code){
            case "auth/user-not-found":
                errorText.value = "A user with that email doesn't exist.";
            break;
            default:
                errorText.value = "Wrong password, try again";
            break;
          }
        } 
        finally {
          loading.value = false;
        }
    }
    
    export default{
        components:{
            Spinner,
        },
        setup(){
            return{
                createUser,
                email,
                password,
                username,
                errorText,
                loading,
                login,
            }
        }
    }
</script>