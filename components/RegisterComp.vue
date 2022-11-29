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
        <input type="checkbox" v-model="isInputCheckbox" />
        Согласен с условиями ПС
      </label>
    </div>
    {{ $store.getters['auth/getRegisterResult'] }}
    <div class="form-body__button">
      <button-comp @click.prevent="registration" :disabled="!isBtnDisabled"
        >Зарегистрироваться</button-comp
      >
    </div>
  </div>
</template>

<script>
import ButtonComp from "./UI/ButtonComp.vue";
export default {
  components: { ButtonComp },
  name: "register-component",
  data() {
    return {
      isInputCheckbox: false,
      isUserLoggedIn: this.$store.getters['auth/isLogged'],
    };
  },
  computed: {
    isBtnDisabled() {
      return this.formInputs.every((item) => {
        return item.valid == true;
      });
    },
    formInputs() {
      return this.$store.getters['auth/getRegisterInputs'];
    },
  },
  methods: {
    validate(e, ind) {
      e.target.composing = false;
      let activated = true;
      let valid = this.formInputs[ind].pattern.test(this.formInputs[ind].value);
      this.$store.dispatch("auth/validation", [
        activated,
        valid,
        ind,
        "registerInputs",
      ]);
    },

    registration() {
      let login = this.formInputs[0].value;
      let nick = this.formInputs[1].value;
      let pwd = this.formInputs[2].value;
      this.$store.dispatch("auth/register", [login, nick, pwd]);
    },
  },
  mounted() {},
  watch: {},
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