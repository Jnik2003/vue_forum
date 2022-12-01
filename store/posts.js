export default {
  namespaced: true,
  state: {
    singleTheme: '',
    posts: [],
  },
  getters: {},
  mutations: {
    loadPosts(state, result){
        state.singleTheme = result[0]
        state.posts = result[1]
    }
  },
  actions: {
    async loadPosts({ commit }, id) {
      try {
        let response = await fetch(`${process.env.VUE_APP_URL_TO_DB}load_posts.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id='+ id,
            // body: JSON.stringify([name, text]),
          })
        let res_get_posts = await response.text()
        console.log(JSON.parse(res_get_posts))
        commit('loadPosts', JSON.parse(res_get_posts))
      } catch (error) {}
    },
  },
}
