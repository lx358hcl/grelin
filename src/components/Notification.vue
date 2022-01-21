<template>
    <div class="card-body mt-2" style="border: 1px solid rgb(235,235,235);border-radius: 10px;padding-left: 0px;padding-right: 0px;padding-top: 5px;background: #f8f8f8;">
        <div class="col-12 ml-4" style="padding-right: 0px;padding-left: 0px;padding-top: 5px;">
            <div class="row" style="margin-right: 0px;margin-left: 0px;">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12" style="padding-left: 0px;">
                    <div class="row" style="margin-right: 0px;margin-left: 0px;">
                        <div class="col d-flex justify-content-start align-items-center" style="padding-top: 2px;padding-bottom: 2px;">
                        <span style="padding-right: 5px;font-size: 12px;color: rgb(89,89,89);">
                            <span v-if = "notificationdata.type == 'comment'"><i class="fas fa-comment h6"></i>&nbsp;&nbsp;</span>
                            <span v-if = "notificationdata.type == 'dislike'"><i class="fas fa-thumbs-down text-danger h6"></i>&nbsp;&nbsp;</span>
                            <span v-if = "notificationdata.type == 'save'"><i class="fas fa-bookmark h6"></i>&nbsp;&nbsp;</span>
                            <span v-if = "notificationdata.type == 'like'"><i class="fas fa-thumbs-up h6 text-success"></i>&nbsp;&nbsp;</span>

                            <router-link class = "text-decoration-none" :to = "{name: 'user', params:{username: notificationdata.byusername}}">
                                <strong>{{ notificationdata.byusername }} </strong> 
                            </router-link>
                            
                            <span v-if = "notificationdata.type == 'comment'">&nbsp;commented on&nbsp;</span>
                            <span v-if = "notificationdata.type == 'like'">&nbsp;liked&nbsp;</span>
                            <span v-if = "notificationdata.type == 'dislike'">&nbsp;disliked&nbsp;</span>
                            <span v-if = "notificationdata.type == 'save'">&nbsp;saved&nbsp;</span>
                                <router-link class = "text-decoration-none" :to = "{name: 'post', params:{id: notificationdata.belongsto}}">
                                    <em> {{ stripHtml(notificationdata.title).result }} </em>
                                </router-link>
                                <span> <i> - {{ timeAgo.format(notificationdata.created_date)}}</i></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TimeAgo from 'javascript-time-ago'
    import en from 'javascript-time-ago/locale/en'
    import { stripHtml } from "string-strip-html";

    TimeAgo.addDefaultLocale(en)
    var timeAgo = new TimeAgo('en-US');

    export default{
        props:{
            notificationdata: Object,
        },
        setup(){
            return{
                timeAgo,
                stripHtml,
            }
        }
    }

</script>