export default {
  namespaced: true,
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
    userId: '',
  },
  getters: {
    getLoginInputs(state) {
      return state.loginInputs
    },
    getLoginName(state){
        return state.loginInputs[0].value
    },
    isLogged(state) {
      return state.isLoggedIn
    },
    isLoginError(state) {
      return state.loginError
    },
    getRegisterInputs(state) {
      return state.registerInputs
    },
    getIsBtnLoginActive(state) {
      return state.isBtnLoginActive
    },
    getRegisterResult(state) {
      return state.registerResult
    },
    getIsRememberMe(state) {
      return state.isRememberMe
    },
    getUserId(state){
      return state.userId
    }
  },
  mutations: {
    validation(state, [activated, valid, ind, array]) {
      state[array][ind].activated = activated
      state[array][ind].valid = valid
    },
    login(state) {
      state.isLoggedIn = true
    },
    loginError(state, value) {
      state.loginError = value
    },
    logout(state) {
      state.isLoggedIn = false
      state.isRememberMe = false
      state.registerResult = ''
      state.userId = ''
      state.loginInputs.forEach((item) => {
        item.activated = false
        item.valid = false
        item.value = ''
      })
      localStorage.removeItem('login')
      localStorage.removeItem('hash')
    },
    toggleLoginBtn(state, value) {
      state.isBtnLoginActive = value
    },
    toggleRegisterBtn(state, value) {
      state.isBtnLoginActive = value
    },
    registerResult(state, value) {
      state.registerResult = value
    },
    clearRegisterInputs(state) {
      state.registerInputs.forEach((item) => {
        item.value = ''
        item.activated = false
        item.valid = false
      })
    },
    isRem(state, value) {
      state.isRememberMe = value
    },
    createLS(state, hash) {
      let value = state.loginInputs[0].value
      localStorage.setItem('login', JSON.stringify(value))
      localStorage.setItem('hash', hash)
    },
    delLS() {
      localStorage.removeItem('login')
    },
    autologin(state, [login, hash]) {
    //   console.log(login, hash)
      login = login.replaceAll('"', '')
      state.isLoggedIn = true
      state.loginInputs[0].value = login
    },
    userId(state, id){
      state.userId = id
    }
  },
  actions: {
    async login({ commit, getters }, [login, pwd, rem]) {
      try {
        // let response = await fetch("http://test4.jnik.s53.hhos.ru/php/login.php", { // production
        let response = await fetch(`${process.env.VUE_APP_URL_TO_DB}login.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
          body: JSON.stringify([login, pwd, rem]),
        }) // serve
        let res_from_login_php = await response.text()
        // res_from_login_php = JSON.parse(res_from_login_php)
        // console.log(JSON.parse(res_from_login_php))
        console.log(JSON.parse(res_from_login_php))
        if (JSON.parse(res_from_login_php) != '0') {
          //если галочка запомнить - создаем запись в ЛС
          // if (JSON.parse(res_from_login_php)[2] != false) {
          if (getters.getIsRememberMe) {
            let hash = JSON.parse(res_from_login_php)[1]
            commit('createLS', hash)
          } else {
            commit('delLS')
          }
          commit('login')
          commit('loginError', '')
          commit('userId', JSON.parse(res_from_login_php)[0]) // !!!!!!! дать id
        } else {
          console.log(JSON.parse(res_from_login_php))
          commit('loginError', 'Неверный логин или пароль')
        }
      } catch (e) {
        console.log('err')
      }
    },

    validation({ commit }, [activated, valid, ind, array]) {
      commit('validation', [activated, valid, ind, array])
    },
    logout({ commit }) {
      commit('logout')
    },
    async register({ commit }, [login, nick, pwd]) {
      try {
        // let response = await fetch("http://test4.jnik.s53.hhos.ru/php/register.php", { // production
        let response = await fetch(`${process.env.VUE_APP_URL_TO_DB}register.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify([login, nick, pwd]),
        }) // serve
        let res_from_php = await response.text()

        if (res_from_php === '1') {
          commit('registerResult', 'Успешно')
          commit('toggleLoginBtn', true)
          commit('clearRegisterInputs')
        } else {
          commit('registerResult', 'Такой логин есть')
          commit('toggleLoginBtn', false)
        }
      } catch (e) {
        console.log('err')
      }
    },
    toggleLoginBtn({ commit }, value) {
      commit('toggleLoginBtn', value)
    },
    toggleRegisterBtn({ commit }, value) {
      commit('toggleRegisterBtn', value)
    },
    isRem({ commit }, value) {
      commit('isRem', value)
    },
    async autologin({ commit }, [login, hash]) {
      login = login.replaceAll('"', '')
      try {
        // let response = await fetch("http://test4.jnik.s53.hhos.ru/php/login.php", { // production
        let resp = await fetch(`${process.env.VUE_APP_URL_TO_DB}autologin.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          // withCredentials: true,
          body: JSON.stringify([login, hash]),
        }) // serve
        let res_from_autologin_php = await resp.text()
        // console.log(res_from_autologin_php)
        // console.log(JSON.parse(res_from_autologin_php))
        if (res_from_autologin_php != 0) {
          commit('autologin', [login, hash])
          commit('userId', res_from_autologin_php)
        } else {
          commit('logout')
        }
      } catch (e) {
        console.log('err autologin')
      }
    },
  },
}

function loginInputs() {
  return [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: 'admin4@c.com',
      pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      valid: false,
      activated: false,
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '111',
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

function delLS() {
  console.log('delLS')
}
