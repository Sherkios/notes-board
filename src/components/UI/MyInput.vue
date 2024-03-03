<template>
  <label class="input-box">
    <p class="input-box__label"><slot></slot></p>
    <input :value="modelValue" @input="updateInput" class="input-box__input" :type="type">
  </label>
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    }
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.input-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__label {
    

    color: var(--white);
  }

  &__input {
    width: 100%;
    padding: 10px 14px;
    color: var(--main-dark);
    background-color: var(--white);
    border: none;
    border-radius: 8px;
    outline: none;
  }
}

</style>