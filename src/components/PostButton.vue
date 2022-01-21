<template>
    <div @click="clickLogin()" class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex d-lg-flex justify-content-start align-items-center" style="margin-right: 5px;margin-bottom: 0;border-radius: 2px;border-style: solid;border-color: rgb(255,255,255);border-top-color: rgb(133,;border-right-color: 135,;border-bottom-color: 150);border-left-color: 135,;padding-right: 5px;padding-left: 10px;padding-bottom: 7px;">
        <router-link to = "submit?type=post" class="btn btn-light d-flex align-items-center" type="button" style="font-family: Lato;width: 100%;border-radius: 7px;background: #f6f7f8;border: 1px solid rgba(0,0,0,0.12);padding-left: 9px;font-size: 16px ;height: 100%; border-radius: 5px;border-style: solid;border-color: rgb(222,222,222);">
            <p class ="text-start text-secondary m-0" >Create a post</p>
        </router-link>
        <div class="btn-group d-flex align-items-center" role="group" style="height: 100%;min-height: 100%;max-height: 100%;">
            <router-link to = "submit?type=image" class="btn btn-light d-flex align-items-center" type="button" style="height: 45px;margin-left: 5px;margin-right: 5px;border-radius: 5px;border-style: solid;border-color: rgb(224,224,224);width: 45px;">
                <i class="fa fa-image" style="color: #4d4d4d;font-size: 18px;"></i>
            </router-link>
            <router-link to = "submit?type=link" class="btn btn-light d-flex align-items-center" type="button" style="height: 45px;margin-right: 5px;border-radius: 5px;border-style: solid;border-color: rgb(222,222,222);width: 45px;margin-left: 0px;">
                <i class="fas fa-link" style="color: #4d4d4d;font-size: 18px;"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default{
        setup(){
            function clickLogin(){
                //If the user is logged in then this will cause an error, so we wrap it in a try,catch
                if(document.querySelector("#login")){
                    document.querySelector("#login").click();
                }
            }
            return{
                clickLogin,
            }
        }
    }

</script>