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
            v-model.trim="username"
            placeholder="Логин"
            :hasError="errors.username"
            >Логин</my-input
          >
          <my-input
            v-model="password"
            type="password"
            placeholder="Пароль"
            :hasError="errors.password"
            >password</my-input
          >
        </template>

        <template #buttons>
          <my-button class="auth__button" @click="LogIn">Войти</my-button>
        </template>

        <template #tooltip>
          <div class="auth__tooltip" @mouseover="tooltip.show = true" @mouseleave="tooltip.show = false">
            <p class="auth__tooltip-header">Подсказка</p>
            
            <p class="auth__tooltip-info" :class="{'show': tooltip.show}">{{ getTooltip }}</p>
          </div>
        </template>

        <template v-if="errorMessage" #errorMessage>
          {{ errorMessage }}
        </template>


      </my-form>
    </div>
  </div>
</template>

<script>
import getCookie from "@/functions/Coockies/GetCookie";
import setCookie from "@/functions/Coockies/SetCookie";
import ValidateInput from "@/mixins/ValidateInput";
import axios from "axios";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  mixins: [ValidateInput],
  data() {
    return {
      username: "",
      password: "",
      errors: {
        username: false,
        password: false,
      },
      errorMessage: "",
      tooltip: {
        username: "kminchelle",
        password: "0lelplR",
        show: false,
      }
    };
  },
  methods: {
    ...mapActions({
      authorizate: "auth/authorizate",
    }),
    async LogIn() {
      this.errors.username = this.validateInput(this.username);
      this.errors.password = this.validateInput(this.password);

      try {
        if (this.getHasLogin()) {
          await this.authorizate({
            username: this.username,
            password: this.password,
          });
          console.log(this.$routr);
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push("/");
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.message == "Invalid credentials") {
          this.errorMessage = "Неверный логин или пароль";
        } else {
          this.errorMessage = error.response.data.message;
        }
      }
    },
    getHasLogin() {
      let has = false;
      for (let value of Object.values(this.errors)) {
        if (!has) {
          has = this.validateInput(value);
        }
      }
      return has;
    },
  },
  computed: {
    getTooltip() {
      return "Логин: " + this.tooltip.username + " Пароль: " + this.tooltip.password;
    }
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

  .auth__tooltip-info {
    height: 0em;
    opacity: 0;
    transition: all 0.5s ease;

    &.show {
      height: 1em;
      opacity: 1;
    }
  }
}
</style>