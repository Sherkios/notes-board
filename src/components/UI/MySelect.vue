<template>
  <div class="select">
    <div 
    class="select__current" 
    :class="options.currentClass, {'full': isShowOptions}"
    @click="clickSelect"
    >{{options.current}}</div>

    <transition name="options">
      <div class="select__options" 
      v-if="isShowOptions"
      >
        <div 
        v-for="option in options.option"
        class="select__option" 
        :class="option.class"
        @click="selectOption(options, option.class, option.value)"
        >{{option.value}}</div>
      </div>
    </transition>

  </div>
</template>

<script>
import changeStyleProperties from "@/functions/Css/ChangeStyleProperties";
export default {
  name: 'my-select',
  props: {
    options: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isShowOptions: false,
      cssCurrentTransition: 'all 0.1s ease'
    }
  },
  methods: {
    clickSelect() {
      this.isShowOptions ? this.isShowOptions = false : this.isShowOptions = true;
    },
    selectOption(options, className, value) {
      this.isShowOptions = false;
      this.$emit('change-status', options, className, value);
    }
  },
}
</script>

<style lang="scss" scoped>

.select {
  --color: var(--main-dark);
  position: relative;

  &__current {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px 6px 8px;

    color: var(--color);

    background-color: var(--white);
    border-radius: 16px 16px 16px 16px;

    transition: all 0.1s ease;

    cursor: pointer;

    &::after {
      position: absolute;
      content: '';
      top: 50%;
      transform: translate(0, -50%);
      right: 8px;
      width: 6px;
      height: 6px;
      background-color: var(--color);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
    }
    &.full {
      border-radius: 16px 16px 0 0;
    }
    &.red {
      --color: var(--red)
    }
    &.blue {
      --color: var(--blue)
    }
  }

  &__options {
    position: absolute;
    top: calc(100%);
    z-index: 2;
    width: 100%;
    height: max-content;
    background-color: var(--white);
    overflow: hidden;
    border-radius: 0 0 16px 16px;
  }

  &__option {
    padding: 4px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color);

    cursor: pointer;

    transition: all 0.2s ease;
    &:hover {
      background-color: var(--white-hover);
    }

    &.red {
      --color: var(--red);
    }

    &.blue {
      --color: var(--blue)
    }


  }
}

.options-enter-active {
  transition: all 0.5s ease 0.1s;

}
.options-leave-active {
  transition: all 0s ease;
}
.options-enter-from,
.options-leave-to {
  opacity: 0;
}

.options-enter-to,
.options-leave-from{
  opacity: 1;
}

</style>