<template>
    <div class="container">
        <h2>Тема: {{id}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'singleTheme',
        props:{
            id:{
                type: String,
                default: ''
            },
        },

        mounted(){
            this.$store.dispatch('posts/loadPosts', this.id)
        }
    }
</script>

<style lang="scss" scoped>

</style>