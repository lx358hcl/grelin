<template>
    <div class = "row px-2 w-100 m-0">
        <QuillEditor @update:content="show" ref = "editor" :toolbar = "[[{ header: [1, 2, 3, 4, 5, false] }],['bold', 'italic', 'underline', 'blockquote'],['code-block','video'],[{ 'align': [] }],[{ 'list': 'ordered'}, { 'list': 'bullet' },'list'],]" theme="snow" />
        <button @click = "doneEditing({type: 'edited'})" class="btn btn-light mt-2 d-flex justify-content-center align-items-center fw-bold mb-1" type="button" style="z-index: 1212;right: 0;top: -35px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 60px;height: 30px; left:50%; margin-top:0px;">
            <span>Save</span>
        </button>
        <button @click = "doneEditing({type: 'canceled'})" class="btn btn-light mt-2 d-flex justify-content-center align-items-center fw-bold mb-1" type="button" style="margin-left:5px; z-index: 1212;right: 0;top: -35px;color: rgb(96,96,96);border-radius: 30px;border-color: rgb(214,214,214);padding-right: 4px;padding-top: 4px;padding-bottom: 4px;padding-left: 4px;width: 60px;height: 30px; left:50%; margin-top:0px;">
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
            commentdata: Object,
        },
        components:{
            QuillEditor,
        },
        setup(props, context){
            var editor = ref();
            onMounted(() => {
                editor.value.setHTML(props.commentdata.commenttext);
            })
            function doneEditing(obj){
                obj["value"] = editor.value.getHTML();
                context.emit("editChanged", obj);
            }
            function show(){
                
            }
            return{
                doneEditing,
                editor,
                show,
            }
        }
    }

</script>