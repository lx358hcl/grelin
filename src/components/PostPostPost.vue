<template>
      <div class = "col-2" style = "padding-right:0px;padding-left:0px;margin-top:0px;">
        <div name = "title" class = "rounded border d-flex align-items-center justify-content-center" :style="{ 'background-image': 'url(' + postpicture + ')' }" style="background-size:contain; background-repeat: no-repeat; width: 100%;;min-height: 130px; background-size: cover; background-position:center;">
            <i v-if="!postpicture" class="fas fa-link text-dark display-6"></i>
        </div>
    </div>
    <div class="col-10 p-0 m-0">
        <div class="row m-0 p-0 pb-1" style = "padding-left:10px !important;">
            <div class="col d-flex align-content-center" style="height: 40px;padding-right: 0px;padding-left: 0px; margin-top:0px;">
                <input ref = "newPostPostTitle" autocomplete="off" required id = "newPostPostTitle" v-model="title" type="text" class="form-control-sm" style="width: 100%;border: 1px solid rgb(232,232,232);" placeholder="Title" name="title" />
            </div>
        </div>
        <div class="row m-0 p-0 pb-1" style = "padding-left:10px !important;">
            <QuillEditor style = "height:200px;" @update:content = "sendInput" ref = "editor" autocomplete="off" required theme = "snow" :toolbar = "[[{ header: [1, 2, 3, 4, 5, false] }],['bold', 'italic', 'underline', 'blockquote'],['code-block','video'],[{ 'align': [] }],[{ 'list': 'ordered'}, { 'list': 'bullet' },'list'],]" placeholder="Post text" name="text" type="text" class="form-control-sm"></QuillEditor>
        </div>
        <div class="row m-0 p-0" style = "padding-left:10px !important;">
            <div class="col d-flex align-content-center" style="height: 40px;padding-right: 0px;padding-left: 0px;">
                <input ref = "newPostPostImage" id = "newPostPostImage" v-model="postpicture" type="url" class="form-control-sm" style="width: 100%; border: 1px solid rgb(232,232,232);" placeholder="Post image link" name="imagelink" />
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';

    var url = ref("");
    var title = ref("");
    var postpicture = ref("");
    var editor = ref();

    export default {
        mounted() {
            this.$nextTick(async function () {
                //Just reset input fields in case user previously posted something
                try{
                    this.$refs.newPostPostTitle.value = "";
                    this.$refs.editor.value = "";
                    this.$refs.newPostPostImage.value = null;
                }
                catch(e){
                    throw Error;
                }
             
            })
        },
        watch:{
            async $route (){
                this.$refs.newPostPostTitle.value = "";
                this.$refs.editor.value = "";
                this.$refs.newPostPostImage.value = null;
            }
        },
        components:{
            QuillEditor,
        },
        setup(props,context) {
            function sendInput(){
                context.emit("posttextChanged", editor.value.getHTML())
            }
            return {
                url,
                title,
                postpicture,
                editor,
                sendInput
            }
        }
    }
</script>