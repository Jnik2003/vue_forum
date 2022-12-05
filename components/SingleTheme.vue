<template>
    <div class="container">
        <h2 v-if="posts[0]">Тема: {{ posts[0].title }}</h2>
        <h2 v-else>Постов нет</h2>
        <div class="post post--header">
            <button-comp class="btn-open-modal" @click="openModal">Новый пост</button-comp>
        </div>

        <modal-comp v-model:isModalVisible="isModalVisible">
            <textarea type="text" class="edit-input" rows="5" cols="45" maxlength="500" minlength="5"
                v-model.trim="postText" placeholder="Напишите новый текст здесь"></textarea>
            <button-comp @click.stop="savePost" :disabled="postText.length < 5">Сохранить</button-comp>
        </modal-comp>
        <div class="post post--body" v-for="post in posts" :key="post.id">
            <div class="details">
                <div class="details__login">
                    {{ post.login }}
                </div>
                <div class="details__role">
                    {{ post.role }}
                </div>
                <div class="details__date">
                    {{ post.post_date }}
                </div>
                <div class="details__time">
                    {{ post.post_time }}
                </div>

            </div>
            <div>{{ post.text }}</div>
        </div>
    </div>
</template>

<script>
import ButtonComp from '@/components/UI/ButtonComp.vue'
import ModalComp from '@/components/UI/ModalComp.vue'
export default {
    name: 'singleTheme',
    data() {
        return {
            isModalVisible: false,
            postText: ''
        }
    },
    components: {
        ButtonComp,
        ModalComp
    },
    props: {
        // id темы
        id: {
            type: String,
            default: ''
        },

    },
    computed: {
        posts() {
            return this.$store.getters['posts/getPosts']
        },

    },
    methods: {
        openModal() {
            this.isModalVisible = true
        },
        savePost() {
            console.log('save')
            console.log(this.id)
            let theme_id = this.id
            let user_id = this.$store.getters['auth/getUserId']
            this.$store.dispatch('posts/addPost', [theme_id, user_id, this.postText]).then(() => {
                this.isModalVisible = false
                this.$store.dispatch('posts/loadPosts', this.id)
            })

            // console.log(this.$store.getters['auth/getUserId'])
            // setTimeout(()=>{
            //     this.isModalVisible = false
            // },500)
        }
    },

    mounted() {
        this.$store.dispatch('posts/loadPosts', this.id)

    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.post {
    width: 80%;
    background-color: antiquewhite;
    display: flex;
    padding: 20px;
    margin-bottom: 5px;
    gap: 40px;
}

.details {
    display: flex;
    flex-direction: column;
    border-right: 1px solid grey;
    padding-right: 20px;
}

.btn {
    align-self: flex-start;
    margin-bottom: 20px;
    background-color: lightblue;
}

.post--header {
    // position: fixed;
}
</style>