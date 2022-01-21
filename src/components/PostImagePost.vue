<template>
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-0 m-0">
        <div class="row" style="margin-right: 0px;margin-left: 0px;padding-right: 10px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px;">
            <div class="col d-flex align-content-center" style="height: 40px;padding-right: 0px;padding-left: 0px; margin-top:5px;">
                <input autocomplete="off" ref = "newLinkPostTitle" required id = "newLinkPostTitle" type="text" class="form-control-sm" style="width: 100%;border: 1px solid rgb(232,232,232);" placeholder="Title" name="title" />
            </div>
        </div>
        <div class="row" style="margin-right: 0px;margin-left: 0px;padding-right: 10px;padding-left: 10px;padding-top: 5px;padding-bottom: 5px;">
            <div class="col px-0" style="border: 1px solid rgb(232,232,232);border-radius: 5px;">
                <div class="card">
                    <div class="card-body d-flex justify-content-center align-items-center" style="height: 200px;">
                        <label for="filename">Max file size: 2Mb </label>&nbsp;&nbsp;
                        <input ref = "newPostImageFile" required type="file" accept="image/*" id="newPostImageFile" class="btn btn-light w-100" style="max-width:300px; border-style: solid;border-color: rgb(210,210,210);font-weight: bold;color: rgb(84,84,84);border-radius: 15px;" name="filename">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        mounted() {
            this.$nextTick(async function () {
                //Just reset input fields in case user previously posted something
                try{
                    this.$refs.newLinkPostTitle.value = "";
                    this.$refs.newPostImageFile.value = null;
                }
                catch(e){
                    throw Error;
                }
             
            })
        },
        watch:{
            async $route (){
                
                this.$refs.newLinkPostTitle.value = "";
                this.$refs.newPostImageFile.value = null;
            }
        },
    }
</script>