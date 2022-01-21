<template>
    <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8" style="margin-right: 5px;">
        <div class="row">
            <p class = "mb-1 text-dark"><b>Searched for </b> "{{ searchqueryglobal.searchquery }}" — <i>found {{ entireResults.nbHits }} results</i></p>
            <hr class = "mb-2">
            <div class="col-12 d-flex flex-row mt-0 pt-0 mb-1">
                <router-link to = "/" class="btn btn-light" type="button" style="transform:scale(1.1); margin-bottom: 3px;margin-left:3px; margin-right: 22px;padding: 3px 12px;font-size: 14px;color: rgb(86,86,86);font-weight: bold;text-align: left;border-color: rgb(210,210,210);">
                    <i class = "fas fa-long-arrow-alt-left" />
                    <span> Back</span>
                </router-link>
            </div>
            <section>
                <Post v-for = "post in allResults" :key = "post.id" v-bind:postdata = "post"></Post>
                <div class = "w-100 d-flex justify-content-center p-2 align-items-center d-flex align-items-center justify-content-center">
                    <button @click = "getMorePosts" v-if = "moreavailable" class = "btn btn-dark px-3 d-flex align-items-center justify-content-center">
                        <span v-if = "!loadingmore" class = "p-1">Load more</span>
                        <i v-if = "!loadingmore" class="fas fa-brain p-1"></i>
                        <Spinner style = "font-size:16px;" class = "text-white" v-if = "loadingmore"></Spinner>
                    </button>
                    <button v-if = "!moreavailable" class = "btn btn-dark px-3 d-flex align-items-center justify-content-center">
                        <span>No more posts</span>
                    </button>        
                </div>
            </section>
            <p v-if = "allResults && allResults.length == 0" class = "text-center">No results found for that search-criteria</p>
            <section v-if = "loading" class = "h-100 w-100 d-flex align-items-center justify-content-center" style = "min-height:calc(100vh - 300px); min-width:vw;">
                <Spinner style = "font-size:30px;"></Spinner>
            </section>
        </div>
    </div>
</template>

<script>
    import algoliasearch from 'algoliasearch';
    import Post from "../components/Post.vue";
    import searchqueryglobal from "../searchqueryglobal.js";
    import settings from "@/settings.js";
    import { ref, watch } from "vue";
    import { useRouter } from "vue-router";
    import Spinner from "../components/Spinner.vue";
    var _ = require('lodash');
    var loadingmore = ref(false);
    var results = ref([]);
    var allResults = ref([]);
    var loading = ref(false);
    var moreavailable = ref(true);
    var current_page = 0;
    var entireResults = ref([]);

    export default{
        components:{
            Spinner,
            Post,
        },
        mounted(){
            searchqueryglobal.value.searchquery = this.$route.query["query"];
        },
        setup(){
            var router = useRouter();
            async function getMorePosts(){
                
                loadingmore.value = true;
                current_page++;
                postsindex.search(searchqueryglobal.value.searchquery,{
                    facets: ["*"],
                    facetFilters: [
                        ['deleted:false']
                    ],
                    page: current_page,
                }).then(async (response) => {
                    if(response.nbPages <= current_page) moreavailable.value = false;
                    results.value = response.hits
                    console.log(results.value);
                    results.value = getUserInfoForPosts(results.value);
                    allResults.value = allResults.value.concat(results.value);
                });
                loadingmore.value = false;
            }

            function getUserInfoForPosts(res){
                //Ownership, Saved, Liked
                if(settings.value.user){
                    //Vote-status
                    res.forEach(element => {
                        if(element.votes[settings.value.user]) element.votestatus = element.votes[settings.value.user];
                    });
                    //Ownership propert
                    res.forEach(element => {
                        if(element.authoruid == settings.value.user) element.isOwner = true; 
                    });
                    //Saved property
                    res.forEach(element => {
                        if(element.saved[settings.value.user]) element.isSaved = true; 
                    });
                }
                return res;
            }
            
            var search = _.debounce(function() {
                router.push({query: {"query": searchqueryglobal.value.searchquery}})
                allResults.value = [];
                loading.value = true;
                postsindex.search(searchqueryglobal.value.searchquery,{
                facets: ["*"],
                facetFilters: [
                    ['deleted:false']
                ],
                page: 0,
                }).then(async (response) => {
                    if(response.nbPages <= current_page) moreavailable.value = false;
                    entireResults.value = response;
                    results.value = response.hits;
                    results.value = getUserInfoForPosts(results.value);
                    allResults.value = results.value;
                    loading.value = false;
                });
            }, 100);

            watch(searchqueryglobal, search, {deep: true});
            var searchClient = algoliasearch('FK8V6PJCVA','4920e98c1fc5aed6e14f0ffd9698ad26');
            var postsindex = searchClient.initIndex("posts");

            return{
                results,
                loading,
                searchqueryglobal,
                getMorePosts,
                moreavailable,
                allResults,
                loadingmore,
                entireResults,   
            }
        }
    }
</script>