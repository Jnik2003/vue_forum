<template>
  <div class="form-box">
    <h3>Авторизация</h3>
    <authorization-form>
      <div class="form-tabs">
        <button
          @click.prevent="toggleLoginBtnActive"
          class="form__tab"
          :class="{ 'active-tab': isBtnLoginActive }"
        >
          Вход
        </button>
        <button
          @click.prevent="toggleRegisterBtnActive"
          class="form__tab"
          :class="{ 'active-tab': !isBtnLoginActive }"
        >
          Регистрация
        </button>
      </div>
      <login-comp v-if="isBtnLoginActive"></login-comp>
      <register-comp v-else></register-comp>
    </authorization-form>
  </div>
</template>

<script>
import AuthorizationForm from "../components/AuthorizationForm.vue";
import LoginComp from "../components/LoginComp.vue";
import RegisterComp from "../components/RegisterComp.vue";
export default {
    name: 'AutorizationPage',
  components: { AuthorizationForm, LoginComp, RegisterComp },
  data() {
    return {
      // isBtnLoginActive: true,
    };
  },
  methods: {
    toggleLoginBtnActive() {
      // this.isBtnLoginActive = true;
      this.$store.dispatch('toggleLoginBtn', true)
    },
    toggleRegisterBtnActive() {
      // this.isBtnLoginActive = false;
       this.$store.dispatch('toggleRegisterBtn', false)
    },
  },
  computed:{
    isBtnLoginActive(){
      return this.$store.getters.getIsBtnLoginActive
    }
  }
};
</script>

<style lang="scss" scoped>
.form-box {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}
</style>