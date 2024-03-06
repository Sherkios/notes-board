<template>
  <div class="title-box">
    <div class="title-box__title"><slot></slot></div>
    <div class="title-box__button"><slot name="button"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'title-box'
    
  }
</script>

<style lang="scss" scoped>
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    color: var(--white);
    font-size: 48px;
    line-height: 60px;
  }

  &__button {
  }
}

</style>