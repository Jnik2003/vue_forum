<template>
  <div>
    <header class="header">
      <nav>
        <div class="header-links">
          <router-link class="nav-link" :to="{ name: 'home' }"
            >Главная</router-link
          >
          <router-link class="nav-link" :to="{ name: 'forum' }"
            >Форум</router-link
          >
        </div>
        <div class="header-items">
          <router-link
            class="nav-link"
            :to="{ name: 'autorization' }"
            v-if="!$store.getters['auth/isLogged']"
            >Вход</router-link
          >
          <router-link class="nav-link" to="" @click.prevent="logout" v-else
            >Выйти</router-link
          >
          <div class="header-items__user" v-if="$store.getters['auth/isLogged']">
            {{ $store.getters['auth/getLoginName'] }}
          </div>
        </div>
      </nav>
    </header>
<!-- Анимация перехода между страницами (один в один + стили route, т.е. router-view в эту конструкцию)-->
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
<!--  -->
    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "home" });
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      console.log(localStorage.getItem("login"));
      this.$store.dispatch("auth/autologin", [
        localStorage.getItem("login"),
        localStorage.getItem("hash"),
      ]);
    } else {
      console.log("no");
    }
  },
};
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
  justify-content: space-around;
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
.header-links,
.header-items {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
// Для аниации перехода между страницами
.route-enter-from, .route-leave-to {
  opacity: 0;
  // transform: translateY(100px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.2s ease-out;
} 
// ---
</style>
