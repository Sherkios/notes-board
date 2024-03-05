<template>
  <my-header></my-header>
  <router-view/>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue';

export default {
  components: {
    MyHeader,
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>