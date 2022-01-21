<template>
    <div class="nav-item dropdown no-arrow">
        <a class="dropdown-toggle nav-link" aria-expanded="false" style = "padding-right:5px; padding-left:6px;" data-bs-toggle="dropdown" href="/">
            <div class="navButtons d-flex align-items-center justify-content-center bg-ligh pr-0 mr-0" style='width: 40px;height: 40px;background-position: center; background-repeat:no-repeat; background-size: cover; border:2px solid #efefef; border-radius: 48px;'>
                <i class="fas fa-bars"></i>
            </div>
        </a>
        <div class="dropdown-menu shadow dropdown-menu-start animated--grow-in" style="font-size: 12px; margin-left:10px; font-family: Inter;width: 70px;">
            <router-link to = "/" class="dropdown-item">
                <i class="fas fa-home fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                Home
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link class="dropdown-item" to="/about">
                <i class="fas fa-info-circle fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                &nbsp;About
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link class="dropdown-item" to="/contact">
                <i class="fas fa-address-card fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                &nbsp;Contact
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link class="dropdown-item" to="/privacy">
                <i class="fas fa-user-secret fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                &nbsp;Privacy stuff
            </router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="https://www.buymeacoffee.com/grelin">
                <i class="fas fa-donate fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                &nbsp;Donate
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="https://www.patreon.com/humannootropicsindex">
                <i class="fab fa-patreon fa-sm fa-fw me-2" style="color: rgb(130,130,130);font-size: 11px;"></i>
                &nbsp;Patreon
            </a>
        </div>
    </div>
</template>