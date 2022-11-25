<template>
  <div>
    <header class="header">
      <nav>
        <div class="header-links">
          <router-link class="nav-link" :to="{ name: 'home' }">Главная</router-link>
          <router-link class="nav-link" :to="{ name: 'forum' }">Форум</router-link>
        </div>
        <div class="header-items">
          <router-link class="nav-link"  :to="{ name: 'autorization' }" v-if="!$store.getters.isLogged">Вход</router-link>
          <router-link class="nav-link" to="" @click.prevent="logout" v-else>Выйти</router-link>
          <div class="header-items__user" v-if="$store.getters.isLogged">
            {{$store.getters.getLoginInputs[0].value}}
          </div>
        </div>
      </nav>
    </header>

    <router-view />
    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  
  methods:{
    logout(){
      console.log('logout')
      this.$store.dispatch('logout')
      this.$router.push({name: 'home'})
    }
  },
  mounted(){
    
    if(localStorage.getItem('login')){
      console.log(localStorage.getItem('login'))
      this.$store.dispatch('autologin', [localStorage.getItem('login'),localStorage.getItem('hash')])
    }
    else{
      console.log('no')
    }
  }
}
</script>


<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

nav {
  padding: 30px;
  display: flex;
  justify-content:space-around;
  align-items: center;
  gap: 20px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.header-links, .header-items {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.container {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}
</style>
