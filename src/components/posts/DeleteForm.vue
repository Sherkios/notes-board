<template>
    <my-form>
      <template #default>Вы уверены, что хотите удалить заметку?</template>
      <template #buttons>
        <my-button buttonType="dark"@click="$emit('hide')">Отмена</my-button>
        <my-button buttonType="red" @click="$emit('removePost')">Удалить</my-button>
      </template>
    </my-form>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>