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
          let response = await fetch(`${process.env.VUE_APP_URL_TO_DB}load_themes.php`) // serve
          let res_get_themes = await response.text()
          // console.log(JSON.parse(res_get_themes))
          commit('loadThemes', JSON.parse(res_get_themes))
        } catch (e) {
          console.log('err themes')
        }
      },

      async addTheme({commit, rootGetters}, text){
        // получим имя залогинившегося пользователя из модуля auth с помощью rootGetters
        let name = rootGetters['auth/getLoginName']
        console.log(rootGetters['auth/getLoginName'])
        console.log(process.env.VUE_APP_URL_TO_DB)
        //в зависимости от режима разработки url берется из нужной переменной описанные в файлах .env.development.local и .env.production.local
        try {
          let response = await fetch(`${process.env.VUE_APP_URL_TO_DB}rec_theme.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: 'theme='+text,
            body: JSON.stringify([name, text]),
          })
          let res = await response.text()          
          console.log(res)
    
        } catch (error) {
          console.log('err rec theme')
        }
      },
      async editTheme({commit}, [id, newText]){
        try {
          let response = await fetch(`${process.env.VUE_APP_URL_TO_DB}edit_theme.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },            
            body: JSON.stringify([id, newText]),
          })
          let res_edit = await response.text()          
          // console.log(res_edit)    
        } catch (error) {
          console.log('err edit theme')
        }
      }
  },
  
}
