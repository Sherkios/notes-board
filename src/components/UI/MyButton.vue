<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'my-button',
    
  }
</script>

<style lang="scss" scoped>

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    padding: 10px 18px;
    color: var(--button-color);
    background-color: var(--button-background-color);
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    border-radius: 8px;

    cursor: pointer;
  }
</style>