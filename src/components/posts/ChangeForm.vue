<template>
  <my-form>
    <template #default>Изменить заметку</template>
    <template #inputs>
      <my-input v-model="post.title" placeholder="Заголовок...">Заголовок</my-input>
      <my-input v-model="post.body" placeholder="Текст...">Текст</my-input>
    </template>
    <template #buttons>
      <my-button buttonType="dark" @click="$emit('hide')">Отмена</my-button>
      <my-button @click="$emit('changePost', post)">Изменить</my-button>
    </template>
  </my-form>
</template>

<script>
export default {
  props: {
    postEl: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      post: {...this.postEl},
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>

</style>