<template>
  <label class="input-box" :class="{'input-box_error': hasError}">
    <p class="input-box__label"><slot></slot></p>
    <input :value="modelValue" @input="updateInput" class="input-box__input" :type="type" :placeholder="placeholder">
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
    },
    placeholder: {
      type: String,
      default: 'Заполните...',
    },
    hasError: {
      type: Boolean,
      default: false,
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
  --label-color: var(--white);
  --input-border: 1px solid transparent;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &_error {
    --label-color: var(--red);
  }

  &__label {
    color: var(--label-color);
    transition: all 0.5s ease;
  }

  &__input {
    width: 100%;
    padding: 10px 14px;
    color: var(--main-dark);
    background-color: var(--white);
    border: var( --input-border, 1px solid transparent);
    border-radius: 8px;
    outline: none;
  }
}

</style>