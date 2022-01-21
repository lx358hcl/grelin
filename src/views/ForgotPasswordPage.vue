<template>
    <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8" style="margin-bottom:0px;">
        <div class="col-12 d-flex flex-row mt-0 pt-1 mb-1">
            <router-link to="/" class="btn btn-light" type="button" style="transform:scale(1.1); margin-bottom: 3px;margin-left:3px; margin-right: 22px;padding: 3px 12px;font-size: 14px;color: rgb(86,86,86);font-weight: bold;text-align: left;border-color: rgb(210,210,210);">
                <i class="fas fa-long-arrow-alt-left" />
                <span> Back</span>
            </router-link>
        </div>
        <div class="card">
            <div class="card-body postBody" style="border: 1px solid rgb(235,235,235);border-radius: 10px;padding-top: 8px;padding-bottom: 8px;">
                <div class="row" style="margin-right: 0px;margin-left: 0px;">
                    <div class="stackedit__html mt-2 text-center">
                        <h4>Forgot your password?</h4>
                        <hr>
                        <form v-on:submit.prevent="resetPassword()" class = "d-inline-flex justify-content-center flex-column w-100">
                            <div class="form-group">
                                <input type="email" v-model = "email" class="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email to receive password-reset link">
                            </div>
                            <p ref = "errorMessage" class = "mt-3 mb-3 text-danger fw-bold"></p>
                            <button type="submit" class="btn btn-dark m-auto mb-2">
                                <span v-if = "!loading">Reset password</span>
                                <Spinner class = "text-white" style = "font-size: 18px" v-if = "loading"></Spinner>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import firebaseApp from "../firebase/firebaseconfig.js";
    import Spinner from "../components/Spinner.vue";
    var email = ref("");
    var loading = ref(false);
    var errorMessage = ref(null);

    export default {
        components:{
            Spinner,
        },
        setup() {
            function resetPassword() {
                loading.value = true;
                firebaseApp.auth().sendPasswordResetEmail(email.value).then(function() {
                    errorMessage.value.textContent = "We've sent you a password-reset email. Remember to check your spam-folder";
                    loading.value = false;
                }).catch(function() {
                    errorMessage.value.textContent = "That user doesn't exist.";
                    loading.value = false;
                });
            }
            return { 
                email,
                resetPassword,
                loading,
                errorMessage,
            }
        }
    }
</script>