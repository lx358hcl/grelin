<template>

    <div class = "row px-2 w-100 m-0" style = "height:auto;">
        <input v-if = "postdata.type == 'link'" v-model = "postsrc" class = "w-100 form-control mb-2">
        <QuillEditor ref="myQuillEditor" style = "height:200px !important;" v-if = "postdata.type == 'post'" :toolbar = "[[{ header: [1, 2, 3, 4, 5, false] }],['bold', 'italic', 'underline', 'blockquote'],['code-block','video'],[{ 'align': [] }],[{ 'list': 'ordered'}, { 'list': 'bullet' },'list'],]" theme="snow" />
        <input placeholder = "Post image if you want to have one" v-model = "postimage" class = "w-100 form-control mb-2">
        <button @click = "editDone({type: 'edit'})" class="btn btn-light d-flex justify-content-center align-items-center fw-bold mb-1" type="button" style="z-index: 0;right: 0;top: -35px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 60px;height: 30px; left:50%; margin-top:0px;">
            <span>Save</span>
        </button>
        <button @click = "editDone({type: 'cancel'})" class="btn btn-light d-flex justify-content-center align-items-center fw-bold mb-1" type="button" style="margin-left:5px; z-index: 0;right: 0;top: -35px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 60px;height: 30px; left:50%; margin-top:0px;">
            <span>Cancel</span>
        </button>
    </div>

</template>

<script>
    import { ref, onMounted } from "vue";
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';

    export default{
        props:{
            postdata: Object,
        },
        components:{
            QuillEditor
        },
        setup(props, context){
            var posttitle = ref("");
            var posttext = ref("");
            var postimage = ref("");
            var postsrc = ref("");
            var myQuillEditor = ref(null);

            onMounted(() => {
                posttitle.value = props.postdata.title;
                postimage.value = props.postdata.image;
                postsrc.value = props.postdata.postsrc;
                if(props.postdata.type == "post") myQuillEditor.value.setHTML(props.postdata.posttext);
            })

            function editDone(e){
                if(e.type == "cancel") context.emit("editDone", e);
                else{
                    var postTEXTtemp = ""
                    if(props.postdata.type == "post") postTEXTtemp = myQuillEditor.value.getHTML();
                    var obj = {
                        "posttext": postTEXTtemp,
                        "postimage": postimage.value,
                        "postsrc": postsrc.value,
                    }
                    context.emit("editDone", obj);
                }
            }

            return{
                posttitle,
                posttext,
                postimage,
                postsrc,
                editDone,
                myQuillEditor,
            }
        }
    }

</script>