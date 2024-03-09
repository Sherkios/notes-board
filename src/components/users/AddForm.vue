<template>
  <my-form>
    <template #default>Добавить нового пользователя</template>
    <template #inputs>
      <my-input v-model="newUser.firstName" placeholder="Имя">Имя</my-input>
      <my-input v-model="newUser.lastName" placeholder="Фамилия">Фамилия</my-input>
      <my-input v-model="newUser.gender" placeholder="Пол">Пол</my-input>
      <my-input v-model="newUser.password" type="password" placeholder="Пароль">Пароль</my-input>
      <my-input v-model="newUser.secPassword" type="password" placeholder="Повторите пароль">Пароль</my-input>
    </template>
    <template #buttons>
      <my-button buttonType="dark" @click="$emit('hide')">Отмена</my-button>
      <my-button @click="sendForm()">Создать</my-button>
    </template>
    <template #errorMessage >
      <p v-show="errors.password">
      {{ errors.password }}
      </p>
    </template>
  </my-form>
</template>

<script>
export default {
  emits: [
    'create-user',
    'hide'
  ],
  data() {
    return {
      newUser: {
        firstName: "",
        lastName: "",
        gender: "",
        password: "",
        secPassword: "",
      },
      errors: {
        password: false,
      }
    }
  },
  methods: {
    sendForm() {
      if (this.checkPassword()) {
        this.$emit('create-user', this.newUser); 
        this.$emit('hide')
      }
    },
    checkPassword() {
      console.log(this.newUser.password, this.newUser.secPassword)
      if (this.newUser.password != this.newUser.secPassword) {
        this.errors.password = "Пароль не совпадает"
        return false;
      }
      this.errors.password = false;
      return true;
    }
  }
  
}
</script>

<style lang="scss" scoped>

</style>