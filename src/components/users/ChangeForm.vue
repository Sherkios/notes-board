<template>
  <my-form>
    <template #default>Изменить пользователя {{ user.id }}</template>
    <template #inputs>
      <my-input v-model="user.firstName" placeholder="Имя">Имя</my-input>
      <my-input v-model="user.lastName" placeholder="Фамилия">Фамилия</my-input>
      <my-input v-model="user.password" type="password" placeholder="Пароль">Пароль</my-input>
    </template>
    <template #buttons>
      <my-button buttonType="dark" @click="$emit('hide')">Отмена</my-button>
      <my-button @click="() => {$emit('update-user', user); $emit('hide')}">Изменить</my-button>
    </template>
  </my-form>
</template>

<script>
export default {
  props: {
    userEl: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      user: {...this.userEl},
    }
  },
}
</script>

<style lang="scss" scoped>

</style>