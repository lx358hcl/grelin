<template>
    <div class = "col-2" style = "padding-right:0px;padding-left:0px;margin-top:0px;">
        <div name = "title" class = "rounded border d-flex align-items-center justify-content-center" :style="{ 'background-image': 'url(' + postpicture + ')' }" style="background-size:contain; background-repeat: no-repeat; width: 100%;;min-height: 100%;background-size:cover; background-position:center;">
            <i v-if="!postpicture" class="fas fa-link text-dark display-6"></i>
        </div>
    </div>
    <div class="col-10 p-0 m-0">
        <div class="row m-0 p-0 pb-1" style = "padding-left:10px !important;">
            <div class="col d-flex align-content-center" style="height: 40px;padding-right: 0px;padding-left: 0px; margin-top:0px;">
                <input ref = "newLinkPostTitle" autocomplete="off" required id = "newLinkPostTitle" v-model="title" type="text" class="form-control-sm" style="width: 100%;border: 1px solid rgb(232,232,232);" placeholder="Title" name="title" />
            </div>
        </div>
        <div class="row m-0 p-0 pb-1" style = "padding-left:10px !important;">
            <div class="col d-flex align-content-center" style="height: 40px;padding-right: 0px;padding-left: 0px; margin-top:0px;">
                <input ref = "newLinkPostLink" autocomplete="off" required id = "newLinkPostLink" v-model="url" v-on:input = "getTitle" type="url" class="form-control-sm" style="width: 100%; border: 1px solid rgb(232,232,232);" placeholder="Link (paste it here and title and image will be auto-grabbed)" name="url" />
            </div>
        </div>
        <div class="row m-0 p-0" style = "padding-left:10px !important;">
            <div class="col d-flex align-content-center" style="height: 40px;padding-right: 0px;padding-left: 0px; margin-top:0px;">
                <input ref= "newLinkPostImage" id = "newLinkPostImage" v-model="postpicture" type="text" class="form-control-sm" style="width: 100%; border: 1px solid rgb(232,232,232);" placeholder="Post image link (optional)" name="imagelink" />
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import _ from "lodash";
    var url = ref("");
    var title = ref("");
    var postpicture = ref("");

    function isURL(str) {
        try{
            new URL(str);
            return true;
        }
        catch(e){
            return false;
        }
    }

    var getTitle = _.debounce(async function() {
        
        if(isURL(url.value) && !title.value){
            const {getMetadata} = require('page-metadata-parser');
            const domino = require('domino');
            //Sett opp egen server
            const URL = `${process.env.VUE_APP_CORSSERVER}/${url.value}`;
            const response = await fetch(URL);
            const html = await response.text();
            console.log(html);
            const doc = domino.createWindow(html).document;
            console.log(doc);
            const metadata = getMetadata(doc, URL);
            title.value = metadata.title;
            postpicture.value = metadata.image;
        }
        
    }, 500);

    export default {
        mounted() {
            this.$nextTick(function () {
                //Just reset input fields in case user previously posted something
                try{
                    url.value = "";
                    title.value = "";
                    this.$refs.newLinkPostImage.value = "";
                    this.$refs.newLinkPostLink.value = "";
                    this.$refs.newLinkPostTitle.value = "";
                    postpicture.value = "";
                }
                catch(e){
                    throw Error;
                }
            })
        },
        watch:{
            async $route (){
                
                url.value = "";
                title.value = "";
                this.$refs.newLinkPostImage.value = "";
                this.$refs.newLinkPostLink.value = "";
                this.$refs.newLinkPostTitle.value = "";
                postpicture.value = "";
            }
        },
        setup() {   
            return {
                getTitle,
                url,
                title,
                postpicture,
            }
        }
    }
</script>