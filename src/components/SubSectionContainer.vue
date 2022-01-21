<template>
    <div class="row d-flex align-items-start" style="padding-bottom: 20px;">
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8" style="margin-right: 5px;">
            <div class="row">
                    <SubNavBar></SubNavBar>
                    <PostButton></PostButton>
                    <SortingButtons></SortingButtons>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
            </div>
        </div>
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
</template>

<script>
    import Footer from "../components/Footer.vue";
    import SubNavBar from "../components/SubNavBar.vue";
    import SortingButtons from "../components/SortingButtons.vue";
    import PostButton from "../components/PostButton.vue";
    import Post from "../components/Post.vue";
    import settings from "../settings.js";
    // import CommentPost from "../components/CommentPost.vue";

    export default {
        setup(){
            return{
                settings,
            }
        },
        components: {
            Footer,
            SubNavBar,
            SortingButtons,
            Post,
            PostButton,
        }
    }

</script>