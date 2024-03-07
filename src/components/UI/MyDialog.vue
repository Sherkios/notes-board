<template>
  <Transition name="dialog">
    <div class="dialog" v-if="isShow" @click="hideDialog">
      <div @click.stop class="dialog__content">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'my-dialog',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog {
    position: fixed;
    z-index: 400;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-dark-60);

    &__content {
      max-width: 408px;
      width: 100%;
    }
  }

  .dialog-enter-active,
  .dialog-leave-active {
    transition: all 0.5s ease;

    & .dialog__content {
      transition: all 1s ease;
    }
  }

  .dialog-enter-from{
    opacity: 0;

    & .dialog__content {
      transform: translateY(30px);
    }
  }
  .dialog-leave-from{
    opacity: 1;
  }
  .dialog-leave-to {
    opacity: 0;
    & .dialog__content {
      transform: translateY(30px);
    }
  } 
</style>