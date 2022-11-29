<template>
  <div class="form-body">
    <div
      class="form-body__inputs"
      v-for="(input, ind) in formInputs"
      :key="ind"
    >
      <input
        :type="input.type"
        :placeholder="input.label"
        class="form-body__input"
        v-model.trim="input.value"
        @input="validate($event, ind)"
        autocomplete="on"
      />

      <div
        class="form-body__valid"
        :class="{ activated: input.activated, 'valid-input': input.valid }"
      ></div>
    </div>
    <div class="form-body__inputs">
      <label>
        <input type="checkbox" v-model="isInputCheckbox" @change="isRem"/>
        Запомнить меня
      </label>
    </div>
    <div class="form-body__button">
      <button-comp @click.prevent="login" :disabled="!isBtnDisabled"
        >Вход</button-comp
      >
    </div>
    <p class="error">{{ $store.getters['auth/isLoginError'] }}</p>
  </div>
</template>

<script>
import ButtonComp from "./UI/ButtonComp.vue";
export default {
  components: { ButtonComp },
  name: "login-component",
  data() {
    return {
      isInputCheckbox: false,
      isUserLoggedIn: this.$store.getters['auth/isLogged'],    
      // this.$store.getters.getIsRememberMe 
    };
  },
  computed: {
    isBtnDisabled() {
      return this.formInputs.every((item) => {
        return item.valid === true;
      });
    },
    formInputs() {
      return this.$store.getters['auth/getLoginInputs'];
    },
   
  },
  methods: {
    validate(e, ind) {
      e.target.composing = false;
      let activated = true;
      let valid = this.formInputs[ind].pattern.test(this.formInputs[ind].value);
      // console.log(activated, valid);
      this.$store.dispatch("auth/validation", [
        activated,
        valid,
        ind,
        "loginInputs",
      ]);
    },
    login() {
      let login = this.formInputs[0].value;
      let pwd = this.formInputs[1].value;
      let rem = this.$store.getters['auth/getIsRememberMe'] //стоит ли галочка на чекбоксе
      this.$store.dispatch("auth/login", [login, pwd, rem]).then(() => {
        // если вошел - на форум, если нет - регистрация
        if (this.$store.getters['auth/isLogged']) {
          this.$router.push({ name: "forum" });
        } else {
          return false;
        }
      });
    },
     isRem(){
      this.$store.dispatch('auth/isRem', this.isInputCheckbox)
    },
  },
  mounted() {},
  watch: {
    isUserLoggedIn() {
      console.log("watch");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-body__button {
  display: flex;
  align-items: center;
}
.activated {
  background-color: lightcoral;
  background-image: url("@/assets/svg/cancel.svg");
}
.valid-input {
  background-color: lightgreen;
  background-image: url("@/assets/svg/check.svg");
}
.error {
  font-size: 14px;
  color: red;
}
</style>