<template>
    <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8" style="margin-bottom:0px;">
        <div class="col-12 d-flex flex-row mt-0 pt-1 mb-1">
            <router-link to="/" class="btn btn-light" type="button" style="transform:scale(1.1); margin-bottom: 3px;margin-left:3px; margin-right: 22px;padding: 3px 12px;font-size: 14px;color: rgb(86,86,86);font-weight: bold;text-align: left;border-color: rgb(210,210,210);">
                <i class="fas fa-long-arrow-alt-left" />
                <span> Back</span>
            </router-link>
        </div>
        <div id = "reportform" class="card">
            <div class="card-body postBody" style="border: 1px solid rgb(235,235,235);border-radius: 10px;padding-top: 8px;padding-bottom: 8px;">
                <div class="row" style="margin-right: 0px;margin-left: 0px;">
                    <div class="stackedit__html mt-2">
                        <h4>Report a post, comment, user etc.</h4>
                        <hr>
                        <form action="https://send.pageclip.co/l9JIOtibSTTUpdDB6ED4PcJKB3mC2FAx" class="pageclip-form" method="post">
                            <div class="form-group mb-2">
                                <label for="uid">UID (dont change this)</label>
                                <input v-model="uid" type="text" class="form-control" name="uid" />
                            </div>
                            <div class="form-group mb-2">
                                <label for="link">Link to the post/user/comment</label>
                                <input type="text" class="form-control" name="link" />
                            </div>
                            <div class="form-group mb-2">
                                <label for="type">Type of content (dont change this if you can withstand the urge)</label>
                                <input v-model = "type" type="text" class="form-control" name="type" />
                            </div>
                            <div class="form-group mb-2">
                                <label for="reason">Reason</label>
                                <input type="text" class="form-control" name="reason" />
                            </div>
                            <div class="form-group mb-2">
                                <label for="why">Explain why</label>
                                <input type="text" class="form-control" name="why" />
                            </div>
                            <div class="form-group mb-2">
                                <label for="image">Picture that shows the bug/whatever thing you want to report (upload a screenshot on imgur or something)</label>
                                <input type="text" class="form-control" name="image" />
                            </div>
                             <button style = "height: 45px; margin-left: 5px; margin-right: 5px; border-radius: 5px; border-style: solid; border-color: rgb(224, 224, 224);" type="submit" class="btn btn-light pageclip-form__submit">
                                <span>Report</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    var uid = ref("");
    var type = ref("");

    export default{
        mounted(){
            uid.value = this.$route.params['uid'];
            type.value = this.$route.params['type'];
        },
        setup(){
            return{
                uid,
                type,
            }
        }
    }

</script>