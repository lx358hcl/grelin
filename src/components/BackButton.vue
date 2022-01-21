<template>
    <div class="d-flex d-sm-flex justify-content-between align-items-center mb-2" style="margin-top: 3px;height: 30px;border-bottom: 1px none rgb(220,220,220) ;">
        <button @click="this.$router.go(-1)" class="btn btn-light d-flex align-items-center py-1" type="button" style="font-weight: bold;color: rgb(95,95,95);border-radius: 5px;border-style: solid;border-color: rgb(225,225,225);">
                <i class="fas fa-long-arrow-alt-left"></i>
                <span style="margin-left: 4px;">
                    Go back
                </span>
        </button>
    </div>
</template>