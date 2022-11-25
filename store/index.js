import { createStore } from 'vuex'

export default createStore({
  state: {
    //массив инпутов для формы логин
    loginInputs: loginInputs(),
    // залогинен ли пользователь
    isLoggedIn: false,
    //сообщение для ошибки входа
    loginError: '',
    //массив инпутов для формы регистрации
    registerInputs: registerInputs(),
    // кнопка "Вход" активна
    isBtnLoginActive: true,
    //результат записи в БД
    registerResult: '',
    //чекбокс запомнить меня
    isRememberMe: false,

  },
  getters: {
    getLoginInputs(state) {
      return state.loginInputs
    },
    isLogged(state){
      return state.isLoggedIn
    },
    isLoginError(state){
      return state.loginError
    },
    getRegisterInputs(state){
      return state.registerInputs
    },
    getIsBtnLoginActive(state){
      return state.isBtnLoginActive
    },
    getRegisterResult(state){
      return state.registerResult
    },
    getIsRememberMe(state){
      return state.isRememberMe
    }
  },
  mutations: {
    validation(state, [activated, valid, ind, array]){
      state[array][ind].activated = activated
      state[array][ind].valid = valid
    },
    login(state){
      state.isLoggedIn = true
    },
    loginError(state, value){
      state.loginError = value
    },
    logout(state){
      state.isLoggedIn = false
      state.isRememberMe = false
      localStorage.removeItem('login')
    },
    toggleLoginBtn(state, value){
      state.isBtnLoginActive = value
    },
    toggleRegisterBtn(state, value){
      state.isBtnLoginActive = value
    },
    registerResult(state, value){
      state.registerResult = value
    },
    clearRegisterInputs(state){
      state.registerInputs.forEach(item => {
          item.value = ''
          item.activated = false
          item.valid = false
        })
    },
    isRem(state, value){
      state.isRememberMe = value
    },
    createLS(state){
      let value = state.loginInputs[0].value     
      localStorage.setItem('login', JSON.stringify(value));
    },
    delLS(){
      localStorage.removeItem('login')
    },
    autologin(state, login){
      state.isLoggedIn = true
      login = login.replaceAll('"', '')
      console.log(login)
      state.loginInputs[0].value = login
    }
  },
  actions: {
    async login({ commit }, [login, pwd, rem] , getters) {
      try {
        // let response = await fetch("http://test3.jnik.s53.hhos.ru/php/del_data.php", { // production
        let response = await fetch('http://api/forum/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
          body: JSON.stringify([login, pwd, rem]),
        }) // serve
        let res_from_login_php = await response.text()
        // res_from_login_php = JSON.parse(res_from_login_php)
        console.log(JSON.parse(res_from_login_php));
        if(JSON.parse(res_from_login_php)[0] === '1'){
          //если галочка запомнить - создаем запись в ЛС
          if(JSON.parse(res_from_login_php)[1] != false){            
            commit('createLS')
          } 
          else{
            commit('delLS')
          }          
          commit('login')
          commit('loginError', '')
        }
        else{
          console.log(JSON.parse(res_from_login_php));
          commit('loginError', 'Неверный логин или пароль')
        }
        
      } catch (e) {
        console.log('err')
      }
    },
    
    validation({commit}, [activated, valid, ind, array]){
      commit('validation', [activated, valid, ind, array])
    },
    logout({commit}){
      commit('logout')
    },
   async register({commit},  [login, nick, pwd]){
      try {
        // let response = await fetch("http://test3.jnik.s53.hhos.ru/php/del_data.php", { // production
        let response = await fetch('http://api/forum/register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify([login, nick, pwd]),
        }) // serve
        let res_from_php = await response.text()
        
        if(res_from_php === '1'){
          commit('registerResult', 'Успешно')
          commit('toggleLoginBtn', true)
          commit('clearRegisterInputs')
        }
        else{
          commit('registerResult', 'Такой логин есть')
          commit('toggleLoginBtn', false)
        }
        
      } catch (e) {
        console.log('err')
      }
    },
    toggleLoginBtn({commit}, value){
      commit('toggleLoginBtn', value)
    },
    toggleRegisterBtn({commit}, value){
      commit('toggleRegisterBtn', value)
    },
    isRem({commit}, value){
      commit('isRem', value)
    },
    autologin({commit}, login){
      commit('autologin', login)
    }
  },
  modules: {},
})

function loginInputs() {
  return [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: '',
      pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      valid: false,
      activated: false,
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '',
      pattern: /^[\w\d]{3,30}$/iu,
      valid: false,
      activated: false,
    },        
  ]
}

function registerInputs() {
  return [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: '',
      pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      valid: false,
      activated: false,
    },
    {
      label: 'Никнейм',
      name: 'nickname',
      type: 'text',
      value: '',
      pattern: /^[\w\d]{3,30}$/iu,
      valid: false,
      activated: false,
    },      
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '',
      pattern: /^[\w\d]{3,30}$/iu,
      valid: false,
      activated: false,
    },        
  ]
}

function delLS(){
  console.log('delLS')
}
