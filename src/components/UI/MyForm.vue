<template>
  <div class="form">

    <div class="form__icon form-icon">
      <div class="form-icon__content"><slot name="svg"></slot></div>
    </div>

    <div class="form__title-box">
      <div class="form__title">
        <slot></slot>
      </div>

      <div class="form__subtitle">
        <slot name="subtext"></slot>
      </div>
    </div>
    
    
    <slot name="inputs"></slot>
    
    <slot name="tooltip"></slot>

    <div class="form__buttons">
      <slot name="buttons"></slot>
    </div>
    <div v-if="$slots.errorMessage" class="form__message">
      <slot name="errorMessage"></slot>
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
    
    &__message {
      text-align: center;
      color: var(--red);
    }
  }

  .form-icon {
    --diametr: 64px;
    width: var(--diametr);
    height: var(--diametr);

    display: flex;
    justify-content: center;
    align-items: center;

    align-self: center;
    border-radius: 50%;
    

    background: var(--white);

    &__content {
      --diametr: 44px;
      width: var(--diametr);
      height: var(--diametr);

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 50%;

      background-color: var(--gray);
    }
  }
</style>