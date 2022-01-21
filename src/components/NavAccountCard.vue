<template>
    <div v-if = "settings.user" class = "d-flex justify-content-center flex-row">
        <li class="nav-item dropdown no-arrow">
            <div class="nav-item dropdown no-arrow">
                <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#" style="padding-left: 4px;">
                    <div class="d-grid d-none d-sm-block">
                        <span class="d-block d-lg-inline me-2" style="font-size: 14px;font-family: Inter;color: rgb(74,74,74);width: 100%;">{{ settings.userData.username }}</span>
                        <span class="d-block me-2 text-gray-600 d-flex justify-content-end align-items-center" style="font-size: 11px;font-family: Inter;color: rgb(77,77,77);">
                            <i class="fas fa-crown" style="color: #ffd700;margin-right: 3px;"></i>
                            <span>{{ settings.userData.postpoints + settings.userData.commentpoints }} points</span>
                        </span>
                    </div>
                    <div class="navButtons" :style="{ 'background-image': 'url(' + settings.userData.profilepicture + ')' }" style='width: 40px;height: 40px;background-position: center; background-repeat:no-repeat; background-size: cover; border:2px solid #efefef; border-radius: 48px;'></div>
                </a>
                <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in" style="font-size: 12px;font-family: Inter;width: auto;">
                    <router-link :to = "{name: 'user', params: {'username': settings.userData.username }}" class="dropdown-item">
                        <i class="fas fa-user fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                        Profile
                    </router-link>
                        <!--<a class="dropdown-item" href="#">
                            <i class="fas fa-cogs fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                            &nbsp;Settings
                        </a>-->
                        <!--<a class="dropdown-item" href="#">
                            <i class="fas fa-moon fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                            Dark Mode
                        </a>-->
                    <div class="dropdown-divider"></div>
                    <a @click = "logout()" class="dropdown-item" href="#">
                        <i class="fas fa-sign-out-alt fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                        &nbsp;Logout
                    </a>
                </div>
            </div>
        </li>
    </div>
</template>

<script>
    import settings from "@/settings.js";
    import firebaseApp from "@/firebase/firebaseconfig.js";

    function logout() {
        firebaseApp.auth().signOut();
        window.location = window.location.origin + "/";
    }

    export default{
        setup(){
            return{
                settings,
                logout,
            }
        }
    }

</script>