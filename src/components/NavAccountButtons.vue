<template>
    <div class = "d-flex justify-content-center flex-row">
        <li class="nav-item d-flex justify-content-center align-items-center dropdown-menu-end" style="padding-right: 3px;padding-left: 3px;">
            <router-link :to = "{'name': 'user', 'params':{'username': settings.userData.username, 'page': 'notifications'}}" class="btn btn-light d-flex justify-content-center align-items-center navButtons" type="button" style="width: 45px;border-radius: 10px;height: 45px;padding-top: 6px;padding-right: 6px;padding-bottom: 6px;padding-left: 6px;border-style: solid;border-color: rgb(224,224,224);">
                <i class="fas fa-bell" style="font-size: 20px;color: #4d4d4d;"></i>
                <span class="badge rounded-pill bg-danger" style="position: absolute;margin-left: 35px;margin-top: 10px;padding-top: 4px;padding-right: 4px;padding-bottom: 4px;padding-left: 4px;font-size: 9px;">
                    {{ settings.userData.notifications }}
                </span>
            </router-link>
        </li>
        <li class="nav-item d-flex justify-content-center align-items-center dropdown-menu-end" style="padding-right: 3px;padding-left: 3px;">
            <router-link to = "/leaderboard" class="btn btn-light d-flex justify-content-center align-items-center navButtons" type="button" style="width: 45px;border-radius: 10px;height: 45px;padding-top: 6px;padding-right: 6px;padding-bottom: 6px;padding-left: 6px;border-style: solid;border-color: rgb(224,224,224);">
                <i class="fas fa-trophy" style="font-size: 17px;color: #4d4d4d;"></i>
            </router-link>
        </li>
    </div>
</template>

<script>
    import settings from "@/settings.js";
    export default{
        setup() {
            return{
                settings,
            }
        }
    }

</script>