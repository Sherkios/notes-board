<template>
  <my-form>
    <template #default>Добавить новую заметку</template>
    <template #inputs>
      <my-input v-model="post.title" placeholder="Заголовок...">Заголовок</my-input>
      <my-input v-model="post.body" placeholder="Текст...">Текст</my-input>
    </template>
    <template #buttons>
      <my-button buttonType="dark" @click="$emit('hide')">Отмена</my-button>
      <my-button @click="$emit('addPost', post)">Добавить</my-button>
    </template>
  </my-form>
</template>

<script>
export default {
  props: {
    propUserId : {
      type: [String, Number],
      required: true,
    }
  },
  data() {
    return {
      post: {
        title: '',
        body: '',
        userId: this.propUserId,
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>