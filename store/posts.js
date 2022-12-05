export default {
  namespaced: true,
  state: {
    posts: [],
    count: [],
  },
  getters: {
    getPosts(state) {
      return state.posts
    },
    getCount(state){
      return state.count
    }
  },
  mutations: {
    loadPosts(state, result) {
      state.posts = result[1]
    },
    count(state, value){
      state.count.push(value)
    }
  },
  actions: {
    async loadPosts({ commit }, id) {
      try {
        let response = await fetch(
          `${process.env.VUE_APP_URL_TO_DB}load_posts.php`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + id,
            // body: JSON.stringify([name, text]),
          },
        )
        let res_get_posts = await response.text()
        console.log(JSON.parse(res_get_posts))
        commit('loadPosts', JSON.parse(res_get_posts))
      } catch (error) {}
    },
    async addPost({ commit }, [theme_id, user_id, text]) {
      console.log([theme_id, user_id, text])
      try {
        let response = await fetch(
          `${process.env.VUE_APP_URL_TO_DB}add_post.php`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify([theme_id, user_id, text]),
          },
        )
        let res_add_post = await response.text()
        // console.log(JSON.parse(res_add_post))
        console.log(res_add_post)
        // commit('loadPosts', JSON.parse(res_get_posts))
      } catch (error) {
        console.log('err post')
      }
    },
    async count({ commit }, id) {
      try {
        let response = await fetch(
          `${process.env.VUE_APP_URL_TO_DB}get_post_count.php`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id='+id,

          },
        )
        let res_count = await response.text()
        console.log(res_count)
        
        commit('count', res_count)
      } catch (error) {}
    },
  },
}
