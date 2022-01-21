<template>
    <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8" style="margin-bottom:0px;">
        <div class="col-12 d-flex flex-row mt-0 pt-1 mb-1">
            <router-link to="/" class="btn btn-light" type="button" style="transform:scale(1.1); margin-bottom: 3px;margin-left:3px; margin-right: 22px;padding: 3px 12px;font-size: 14px;color: rgb(86,86,86);font-weight: bold;text-align: left;border-color: rgb(210,210,210);">
                <i class="fas fa-long-arrow-alt-left" />
                <span> Back</span>
            </router-link>
        </div>
        <div class="card">
            <div class="card-body postBody" style="border: 1px solid rgb(235,235,235);border-radius: 10px;padding-top: 8px;padding-bottom: 8px;">
                <div class="row" style="margin-right: 0px;margin-left: 0px;">
                    <div class="stackedit__html mt-2">
                        <h5><b>Leaders (top 50 most influential users)</b></h5>
                        <hr>
                        <ol>
                            <spinner v-if = "loading"></spinner>
                            <li v-for = "user in top50" :key = "user">
                                <router-link :to = "{'name':'user', params: {'username': user.username }}">
                                    <div class="d-inline-block" :style="{ 'background-image': 'url(' + user.profilepicture + ')' }" style='height: 20px;min-height: 20px;max-height: 20px;width: 20px;min-width: 20px;max-width: 20px; background-position:center; background-size:cover; background-repeat:no-repeat; border-radius: 22px;'>
                                    </div>
                                    {{ user.username }}
                                </router-link>
                                <span> ({{ user.points }} points)</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebaseApp from "@/firebase/firebaseconfig.js";
    import settings from "@/settings.js";
    import { ref } from "vue";
    import Spinner from "../components/Spinner.vue";
    
    export default{
        components:{
            Spinner,
        },
        setup() {
            var loading = ref(false);
            var top50 = ref([]);
            async function getLeaderboard(){
                loading.value = true;
                var db = await firebaseApp.firestore();
                var data = await db.collection("users").orderBy("points", "desc").limit(50).get();
                data.docs.forEach(e => {
                    top50.value.push(e.data())
                })
                loading.value = false;
            }
            getLeaderboard()
            return{
                settings,
                top50,
                loading,
            }
        }
    }

</script>