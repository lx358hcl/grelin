<template>
    <nav class="navbar navbar-light navbar-expand bg-white shadow d-flex flex-row align-items-center mb-0 topbar static-top" style="/*background: #3f4245 !important;box-shadow: 0px 0px;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24) !important;*/box-shadow: 0 1px 5px rgba(0,0,0,0.16), 0 1px 6px rgba(0,0,0,0.23) !important;width: 100%;">
        <div class="container-fluid fluidNavContainer">
            <div class="container-fluid d-flex align-items-center" style="padding-right: 0px;padding-left: 0px;width: 100%;max-width: 1800px;">
                <LeftNavDropDown class = "d-block d-sm-none"></LeftNavDropDown>
                <Logo></Logo>
                <SearchNavBox></SearchNavBox>
                <ul class="navbar-nav flex-nowrap ms-auto" style="margin-left: 0px;">
                    <NavAccountButtons v-if = "settings.user"></NavAccountButtons>
                    <div class="d-none d-sm-block topbar-divider"></div>
                    <LoginSignUp v-if="!settings.user"></LoginSignUp>
                    <NavAccountCard v-if = "settings.user"></NavAccountCard>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import settings from "@/settings.js";
    import SearchNavBox from "./SearchNavBox.vue";
    import Logo from "./Logo.vue";
    import NavAccountCard from "./NavAccountCard.vue";
    import NavAccountButtons from "./NavAccountButtons.vue";
    import LeftNavDropDown from "./LeftNavDropDown.vue";
    import LoginSignUp from "./LoginSignUp.vue";

    export default {
    components:{
        SearchNavBox,
        Logo,
        NavAccountButtons,
        NavAccountCard,
        LoginSignUp,
        LeftNavDropDown,
    },
    setup(){
        return{
            settings,
        }
    }
  }
</script>