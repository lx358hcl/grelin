<template>
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex d-lg-flex justify-content-start align-items-center" style="margin-right: 5px;margin-bottom: 0;border-radius: 2px;border-style: solid;border-color: rgb(255,255,255);border-top-color: rgb(133,;border-right-color: 135,;border-bottom-color: 150);border-left-color: 135,;padding-right: 5px;padding-left: 12px;padding-bottom: 7px;">
        <div class="btn-group d-flex align-items-center" role="group" style="height: 100%;min-height: 100%;max-height: 100%;">
            <button @click = "changeSort('top')" :class = "{'activeSortButton': chosenSort == 'top'}" class="btn btn-light d-flex align-items-center" type="button" style="color: #4d4d4d; margin-left: 0px;margin-right: 10px;border-radius: 5px;border-style: solid;border-color: rgb(224,224,224);padding-top: 3px;padding-bottom: 3px;height: 30px; transform:scale(1.1); ">
                <i class="fas fa-trophy" style="font-size: 12px;  margin-right:2px;" ></i>
                <span class="sortingButtonsHideSmallScreen" style="color: rgb(77,77,77);font-family: Lato;font-weight: bold;font-size: 12px;">
                    Top
                </span>
            </button>
            <button @click = "changeSort('new')" :class = "{'activeSortButton': chosenSort == 'new'}" class="btn btn-light d-flex justify-content-center align-items-center" type="button" style="color: #4d4d4d; margin-right: 11px;border-radius: 5px;border-style: solid;border-color: rgb(222,222,222);margin-left: 0px;padding-top: 3px;padding-bottom: 3px;height: 30px; transform:scale(1.1); ">
                <span class = "d-flex align-items-center" style="font-family: Nunito, sans-serif;font-weight: bold;">
                    <i class="fas fa-exclamation-circle"></i>
                    <span class="sortingButtonsHideSmallScreen" style="font-family: Lato;font-weight: bold;font-size: 12px;margin-left: 2px;">
                        New
                    </span>
                </span>
            </button>
            <div class="btn-group d-flex align-items-center d-block d-md-none" role="group" style="height: 100%;min-height: 100%;max-height: 100%;">
                <div class="dropdown btn-group" role="group">
                    <button class="btn btn-light dropdown-toggle d-flex align-items-center" aria-expanded="false" data-bs-toggle="dropdown" type="button" style="transform:scale(1.1); border-radius: 5px;border-color: rgb(224,224,224);border-bottom-style: solid;padding-top: 3px;padding-bottom: 3px;height: 30px; margin-left:0px !important;">
                        <span style="text-transform: capitalize; font-family: Lato;font-weight: bold;color: rgb(79,79,79);font-size: 12px;">
                            {{ this.$route.name }}
                        </span>
                    </button>
                    <div class="dropdown-menu sortingButtonDropdowns" style='font-size: <p style="color: rgb(86,86,86);font-family: Inter, sans-serif;font-size: <p style="color: rgb(86,86,86);font-family: Inter, sans-serif;font-size: 16px;width: 50%;'>
                        <router-link :class = "{ 'activeLabel' : this.$route.path == '/all' }" to = "all" class="dropdown-item">
                            All
                        </router-link>
                        <router-link :class = "{ 'activeLabel' : this.$route.path == '/feed' }" to = "feed" class="dropdown-item">
                            Feed
                        </router-link>
                        <router-link :class = "{ 'activeLabel' : this.$route.path == '/human' }" to = "human" class="dropdown-item">
                            Human Studies
                        </router-link>
                        <router-link ref = "animal" value = "Animal Studies" :class = "{ 'activeLabel' : this.$route.path == '/animal' }" to = "animal" class="dropdown-item">
                            Animal Studies
                        </router-link>
                        <router-link :class = "{ 'activeLabel' : this.$route.path == '/misc' }" to = "misc" class="dropdown-item">
                            Misc
                        </router-link>
                        <router-link :class = "{ 'activeLabel' : this.$route.path == '/qa' }" to = "qa" class="dropdown-item">
                            Q&A
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    import { useRouter } from 'vue-router'

    var chosenSort = ref("new");

    export default{
        watch:{
            //This is just to style the sorting buttons
            $route (to){
                if(to.query.sort == "new") chosenSort.value = "new";
                else if(to.query.sort == "top") chosenSort.value = "top";
            }
        },
        mounted() {
            this.$nextTick(async function () {
                if(this.$route.query.sort == "new") chosenSort.value = "new";
                else if(this.$route.query.sort == "top") chosenSort.value = "top";
            })
        },
        setup(){
            //This is to push a query to the route when buttons are clicked
            var router = useRouter();
            function changeSort(sortType){
                router.push({query: {sort: sortType}})
            }

            return{
                changeSort,
                chosenSort,
            }
        }
    }

</script>