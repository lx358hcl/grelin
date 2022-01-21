<template>
    <div class = "row px-2 w-100 m-0 block">
        <QuillEditor ref = "editor" toolbar = "essential" theme="snow" />
        <button @click = "quoteComment" class="btn btn-light mt-2 d-flex justify-content-center align-items-center fw-bold mb-1" type="button" style="z-index: 0;right: 0;top: -35px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 90px;height: 30px; left:50%; margin-top:0px;">
            <span>Comment</span>
        </button>
        <button class="btn btn-light mt-2 d-flex justify-content-center align-items-center fw-bold mb-1" type="button" style="margin-left:5px; z-index: 0;right: 0;top: -35px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 60px;height: 30px; left:50%; margin-top:0px;">
            <span>Cancel</span>
        </button>
    </div>

</template>

<script>
    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import { ref, onMounted } from "vue";

    var editor = ref();

    export default{
        components:{
            QuillEditor,
        },
        props:{
            commentdata: Object,
        },
        setup(props, context){
            onMounted(() => {
                
                var val = props.commentdata.commenttext;
                editor.value.setHTML(val);
            })
            function quoteComment(){
                context.emit("quotedComment", editor.value.getHTML());
            }
            return{
                quoteComment,
                editor,
            }
        }
    }

</script>