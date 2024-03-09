<template>
  <my-form>
    <template #default>Добавить нового пользователя</template>
    <template #inputs>
      <my-input v-model="newUser.firstName" placeholder="Имя">Имя</my-input>
      <my-input v-model="newUser.lastName" placeholder="Фамилия">Фамилия</my-input>
      <my-input v-model="newUser.gender" placeholder="Пол">Пол</my-input>
    </template>
    <template #buttons>
      <my-button buttonType="dark" @click="$emit('hide')">Отмена</my-button>
      <my-button @click="() => {$emit('create-user', newUser); $emit('hide')}">Создать</my-button>
    </template>
  </my-form>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        firstName: "",
        lastName: "",
        gender: "",
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>