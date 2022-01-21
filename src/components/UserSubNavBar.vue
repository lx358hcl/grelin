<template>
    <div class="col">
        <div class="btn-group d-none d-md-block SubNavBar" role="group" style="width: 100%;border-bottom: 2px solid rgb(224,224,224);margin-bottom: 5px;">
            <router-link v-if = "settings.userData && (settings.userData.username == this.$route.params.username)" :to = "{name: 'user', params:{username: this.$route.params.username, page:'notifications' }}" class="btn btn-dark subSubButton" type="button">
                Notifications
                <span class="badge rounded-pill bg-danger" style="position: absolute;margin-left: 0px;margin-top: 5px;padding-top: 4px;padding-right: 4px;padding-bottom: 4px;padding-left: 4px;font-size: 9px;">
                    {{ settings.userData.notifications }}
                </span>
            </router-link>
            <router-link :to = "{name: 'user', params:{username: this.$route.params.username, page:'posts' }}" class="btn btn-dark subSubButton" type="button">
                Posts
            </router-link>
            <router-link :to = "{name: 'user', params:{username: this.$route.params.username, page:'comments' }}" class="btn btn-dark subSubButton" type="button">
                Comments
            </router-link>
            <router-link :to = "{name: 'user', params:{username: this.$route.params.username, page:'upvoted' }}" class="btn btn-dark subSubButton" type="button">
                Upvoted
            </router-link>
            <router-link :to = "{name: 'user', params:{username: this.$route.params.username, page:'downvoted' }}" class="btn btn-dark subSubButton" type="button">
                Downvoted
            </router-link>
            <router-link :to = "{name: 'user', params:{username: this.$route.params.username, page:'saved' }}" class="btn btn-dark subSubButton" type="button">
                Saved
            </router-link>
        </div>
    </div>
    <div class = "col">
        <div class="dropdown btn-group d-block d-sm-none" style = "margin-left:10px;" role="group">
            <button class="btn btn-light dropdown-toggle d-flex align-items-center mb-2" aria-expanded="false" data-bs-toggle="dropdown" type="button" style="transform:scale(1.2); border-radius: 5px;border-color: rgb(224,224,224);border-bottom-style: solid;padding-top: 3px;padding-bottom: 3px;height: 30px; margin-left:0px !important;">
                <span style="text-transform: capitalize; font-family: Lato;font-weight: bold;color: rgb(79,79,79);font-size: 12px;">
                    {{ this.$route.params.page }}
                </span>
            </button>
            <div class="dropdown-menu sortingButtonDropdowns" style='font-size: <p style="color: rgb(86,86,86);font-family: Inter, sans-serif;font-size: <p style="color: rgb(86,86,86);font-family: Inter, sans-serif;font-size: 16px;width: 50%;'>
                <router-link v-if = "settings.userData && (settings.userData.username == this.$route.params.username)" :class = "{ 'activeLabel' : this.$route.params.page == 'notifications' }" :to = "{name: 'user', params:{username: this.$route.params.username, page:'notifications' }}" class="dropdown-item">
                    Notifications
                </router-link>
                <router-link :class = "{ 'activeLabel' : this.$route.params.page == 'posts' }" :to = "{name: 'user', params:{username: this.$route.params.username, page:'posts' }}" class="dropdown-item">
                    Posts
                </router-link>
                <router-link :class = "{ 'activeLabel' : this.$route.params.page == 'comments' }" :to = "{name: 'user', params:{username: this.$route.params.username, page:'comments' }}" class="dropdown-item">
                    Comments
                </router-link>
                <router-link :class = "{ 'activeLabel' : this.$route.params.page == 'upvoted' }" :to = "{name: 'user', params:{username: this.$route.params.username, page:'upvoted' }}" class="dropdown-item">
                    Upvoted
                </router-link>
                <router-link :class = "{ 'activeLabel' : this.$route.params.page == 'downvoted' }" :to = "{name: 'user', params:{username: this.$route.params.username, page:'downvoted' }}" class="dropdown-item">
                    Downvotes
                </router-link>
                <router-link :class = "{ 'activeLabel' : this.$route.params.page == 'saved' }" :to = "{name: 'user', params:{username: this.$route.params.username, page:'saved' }}" class="dropdown-item">
                    Saved
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import settings from "@/settings.js";

    export default{
        setup(){
            return{
                settings,
            }
        }
    }

</script>