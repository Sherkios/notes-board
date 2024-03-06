<template>
  <router-view/>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import getCoockie from "@/functions/Coockies/GetCookie";
  export default {
    async mounted() {
    },
    methods: {
      ...mapActions({
      })
    }
  }
</script>

<style lang="scss">
:root {
  --main-dark: rgba(24, 24, 25, 1);
  --main-dark-60: rgba(24, 24, 25, 0.6);
  --gray: rgba(42, 42, 43, 1);
  --blue: rgba(0, 95, 249, 1);
  --red: rgba(186, 1, 23, 1);
  --white: rgba(255, 255, 255, 1);
  --button-background-color: var(--blue);
  --button-color: var(--white);
}


</style>
