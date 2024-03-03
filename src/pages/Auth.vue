<template>
  <div class="wrapper">
    <div class="auth">
      <my-form>
        <template #default>
          Добро пожаловать
        </template>
        <template #subtext>
          Введите логин и пароль
        </template>

        <template #inputs>
          <my-input v-model="login">Логин</my-input>
          <my-input v-model="password" :type="'password'">password</my-input>
        </template>

        <template #buttons>
          <my-button>Войти</my-button>
        </template>
        
      </my-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
    }
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>
  .auth {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

  }
</style>