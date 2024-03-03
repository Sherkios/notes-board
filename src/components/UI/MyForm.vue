<template>
  <div class="form">

    <div class="form__title-box">
      <div class="form__title">
        <slot></slot>
      </div>

      <div class="form__subtitle">
        <slot name="subtext"></slot>
      </div>
    </div>
    
    
    <slot name="inputs"></slot>
    <div class="form__buttons">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-form',
  }
</script>

<style lang="scss" scoped>
  .form {
    max-width: 408px;
    width: 100%;

    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    padding: 24px;
    border-radius: 12px;
    background-color: var(--gray);
    color: var(--white);

    &__title-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    &__title {
      font-size: 18px;
      text-align: center;

    }
    &__subtitle{
      font-size: 14px;
      text-align: center;
    }

    &__buttons {
      display: flex;
      gap: 12px;
    }
  }
</style>