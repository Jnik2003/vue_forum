<template>
    <!-- <div> -->
        <button class="btn" @click.prevent>
            <slot></slot>
        </button>
    <!-- </div> -->
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.btn{
    min-width: 120px;
    height: 30px;
    border: none;
    transition: .3s;
    cursor: pointer;
}
.btn:hover{
background-color: #FFC783;
-webkit-box-shadow: 0px 10px 13px -7px #000000, 0px 0px 5px 3px rgba(0,0,0,0); 
box-shadow: 0px 10px 13px -7px #000000, 0px 0px 5px 3px rgba(0,0,0,0);
}
</style>