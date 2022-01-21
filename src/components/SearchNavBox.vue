<template>
    <form v-on:submit.prevent="search" class="d-inline-block d-sm-inline-block w-100" style="padding-right: 15px;padding-left: 15px;margin-left: -14px;max-width: 500px;">
        <div class="input-group">
            <div class="input-group-text" style="background: #f8fafb;border-radius: 22px;padding: 1px 12px;height: 42px;width: 100%;">
                <router-link :to = "{name: 'search', query: {'query': searchquery}}" class="fas fa-search border-0 bg-transparent text-secondary btn"></router-link>
                <input v-model = "searchqueryglobal.searchquery" @input = "search" class = "bg-light form-control border-0 small mr-5" type="text" placeholder="Search for anything ...." style="font-family: Lato !important;font-size: 16px;border-radius: 0px;background: #f8fafb;margin-left: 8px;max-width: 100%;" />
            </div>
        </div>
    </form>
</template>

<script>
    import searchqueryglobal from "@/searchqueryglobal.js";
    import { useRouter } from 'vue-router'

    export default{
        setup(){
            var router = useRouter();
            function search(){
                if(router.currentRoute.value.name != "search"){
                    router.push({name: 'search', query: {'query': searchqueryglobal.value.searchquery }});
                }
            }

            return{
                search,
                searchqueryglobal
            }
        }
    }


</script>