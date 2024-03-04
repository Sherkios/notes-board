<template>
  <div class="wrapper">
    <div class="auth">
      <my-form>
        <template #svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z"
              stroke="#FCFCFC"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
        <template #default> Добро пожаловать </template>
        <template #subtext> Введите логин и пароль </template>

        <template #inputs>
          <my-input
            v-model.trim="login"
            placeholder="Логин"
            :hasError="!errors.login"
            >Логин</my-input
          >
          <my-input
            v-model="password"
            type="password"
            placeholder="Пароль"
            :hasError="!errors.password"
            >password</my-input
          >
        </template>

        <template #buttons>
          <my-button class="auth__button" @click="LogIn">Войти</my-button>
        </template>
      </my-form>
    </div>
  </div>
</template>

<script>
import ValidateInput from "@/mixins/ValidateInput";

export default {
  mixins: [ValidateInput],
  data() {
    return {
      login: "",
      password: "",
      errors: {
        login: false,
        password: false,
      },
    };
  },
  methods: {
    LogIn(event) {
      this.errors.login = this.validateInput(this.login);
      this.errors.password = this.validateInput(this.password);
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__button {
    margin-top: 12px;
  }
}
</style>
