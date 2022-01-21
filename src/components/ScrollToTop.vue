<template>
    <button @click = "scrollToTop" class="btn btn-dark d-flex align-items-center justify-content-center border rounded d-inline scroll-to-top">
        <i class="fas fa-angle-up"></i>
    </button>
</template>

<script>
    export default{
        setup(){
            function scrollToTop(){
                window.scrollTo(0, 0);
            }
            return{
                scrollToTop,
            }
        }
    }
</script>