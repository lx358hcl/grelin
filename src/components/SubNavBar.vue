<template>
    <div class="col">
        <div class="btn-group d-none d-md-block SubNavBar" role="group" style="width: 100%;border-bottom: 2px solid rgb(224,224,224);margin-bottom: 5px;">
            <router-link :to = "{name: 'all', query:{sort: this.$route.query.sort}}" class="btn btn-dark subSubButton" type="button">
                All
            </router-link>
            <!--<router-link :to = "{name: 'feed', query:{sort: this.$route.query.sort}}" class="btn btn-dark subSubButton" type="button">
                Feed
            </router-link>-->
            <router-link :to = "{name: 'human', query:{sort: this.$route.query.sort}}" class="btn btn-dark subSubButton" type="button">
                Human Studies
            </router-link>
            <router-link :to = "{name: 'animal', query:{sort: this.$route.query.sort}}" class="btn btn-dark subSubButton" type="button">
                Animal Studies
            </router-link>
            <router-link :to = "{name: 'misc', query:{sort: this.$route.query.sort}}" class="btn btn-dark subSubButton" type="button">
                Misc
            </router-link>
            <router-link :to = "{name: 'qa', query:{sort: this.$route.query.sort}}" class="btn btn-dark subSubButton" type="button">
                Q&A
            </router-link>
            <!--<router-link to="chat" class="btn btn-dark subSubButton" type="button">
                Chat
            </router-link>-->
        </div>
    </div>
</template>