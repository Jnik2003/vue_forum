export default {
  namespaced: true,
  state: {
    themes:[],
  },
  getters:{
    getThemes(state){
        return state.themes
    }
  },
  mutations:{
    loadThemes(state, arr){
        state.themes = arr
    }
  },
  actions:{
    async loadThemes({ commit, getters }) {
        try {
          // let response = await fetch("http://test4.jnik.s53.hhos.ru/php/login.php", { // production
          let response = await fetch('http://api/forum/load_themes.php') // serve
          let res_get_themes = await response.text()
          console.log(JSON.parse(res_get_themes))
          commit('loadThemes', JSON.parse(res_get_themes))
        } catch (e) {
          console.log('err themes')
        }
      },
  },
}
