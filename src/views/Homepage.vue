<template>
    <div id="wrapper">
        <div class="d-flex flex-column" id="content-wrapper" style="background: #3f4245;">
            <div id="content" style="background: #ffffff;">
                <div class="container-fluid mainContainer" style="font-family: Lato;min-height: 100vh;max-width: 1400px;margin-top: 10px;">
                    <!--SubSectionContainer START-->
                    <div class="row d-block d-md-none" style="margin-top: 12px;margin-bottom: 12px;">
                        <div class="col">
                            <div class="card">
                                <a class="btn btn-light text-start card-header d-block d-lsm-none" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse-4" href="#collapse-4" role="button" style="color: rgb(105,105,105);font-family:  Alike Angular, serif;border-radius: 5px;border-style: solid;border-color: rgb(204,204,204);">
                                    <strong>About Grelin</strong>
                                </a>
                                <div class="collapse" id="collapse-4">
                                    <div class="card-body" style="padding-bottom: 10px;padding-top: 16px;">
                                        <SubSectionAboutContainer></SubSectionAboutContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--SubSectionContainer END-->
                    <div class="row d-flex align-items-start" style="padding-bottom: 20px;">
                        <component :is = "chosenComponent" />
                        <div class="col d-none d-md-block" style="margin-left: 0px;">
                            <div class="row">
                                <div class="col" style="border: 1px solid rgb(222,222,222);border-radius: 6px;padding-right: 0px;padding-left: 0px; margin-top: 40px;">
                                    <div class="card mb-4" style="width: 100%;">
                                        <div class="card-header py-3" style="width: 100%;background: #f8fafb;text-align: center;">
                                            <h6 class="m-0" style="font-weight: bold;color: rgb(84,84,84);text-align: left;font-family: 'Alike Angular', serif;">
                                                Grelin | Biohacking & Nootropic Discussion and Research
                                            </h6>
                                        </div>
                                        <div class="card-body" style="padding-bottom: 10px;padding-top: 10px;">
                                            <SubSectionAboutContainer></SubSectionAboutContainer>
                                        </div>
                                    </div>
                                </div>
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
    import PostNewContent from "../components/PostNewContent.vue";
    import MainArea from "../components/MainArea.vue";
    import PostPage from "../components/PostPage.vue";
    import PostInfo from "@/components/PostInfo.vue";
    import About from "@/views/About.vue";
    import ForgotPasswordPage from "@/views/ForgotPasswordPage.vue";
    import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
    import Contact from "@/views/Contact.vue";
    import Report from "@/views/Report.vue";
    import Search from "@/views/Search.vue";
    import Leaderboard from "@/views/Leaderboard.vue";
    import SubSectionAboutContainer from "../components/SubSectionAboutContainer.vue";
    import { shallowRef } from "vue";

    var mainarea = shallowRef(MainArea);
    var postnewcontent = shallowRef(PostNewContent);
    var postpage = shallowRef(PostPage);
    var aboutpage = shallowRef(About);
    var privacypage = shallowRef(PrivacyPolicy);
    var contactpage = shallowRef(Contact);
    var reportpage = shallowRef(Report);
    var leaderboardpage = shallowRef(Leaderboard);
    var searchpage = shallowRef(Search);
    var forgotpasswordpage = shallowRef(ForgotPasswordPage);

    export default {
        computed: {
            chosenComponent() {
                if(this.$route.name == "submit") return postnewcontent.value;
                else if(this.$route.name == "search") return searchpage.value;
                else if(this.$route.name == "about") return aboutpage.value;
                else if(this.$route.name == "privacy") return privacypage.value;
                else if(this.$route.name == "report") return reportpage.value;
                else if(this.$route.name == "contact") return contactpage.value;
                else if(this.$route.name == "leaderboard") return leaderboardpage.value;
                else if(this.$route.name == "post") return postpage.value;
                else if(this.$route.name == "forgotpassword") return forgotpasswordpage.value;
                else return mainarea.value;
            }
        },
        setup(){
            return{
                mainarea,
                postnewcontent,
                postpage,
            }
        },
        components: {
            Footer,
            SubSectionAboutContainer,
            PostInfo,
        }
    }
</script>