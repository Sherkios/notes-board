<template>
  <my-form>
    <template #default>Вы уверены, что хотите удалить заметку?</template>
    <template #inputs>
      <my-input v-model="title" placeholder="Заголовок...">Заголовок</my-input>
      <my-input v-model="body" placeholder="Текст...">Текст</my-input>
    </template>
    <template #buttons>
      <my-button buttonType="dark" @click="$emit('hide')">Отмена</my-button>
      <my-button @click="$emit('addPost')">Добавить</my-button>
    </template>
  </my-form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      body: '',
    }
  }
}
</script>

<style lang="scss" scoped>

</style>