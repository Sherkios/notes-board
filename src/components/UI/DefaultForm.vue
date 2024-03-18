<template>
  <my-form>
    <template #default>
      <slot></slot>
    </template>
    <template #buttons>
      <my-button buttonType="dark" @click="$emit('hide')">Хорошо</my-button>
    </template>
  </my-form>
</template>

<script>
export default {
  name: 'default-form',
}
</script>

<style lang="scss" scoped>

</style>