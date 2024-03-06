<template>
  <div class="wrapper notes">
    <title-box>
      <template #default>Все заметки</template>
    </title-box>
    <div class="notes__posts">
      <post-list :is-show-user="true"></post-list>
    </div>
  </div>
</template>

<script>
import PostList from "@/components/posts/PostList.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    PostList,
  },
}
</script>

<style lang="scss" scoped>
  .notes {
    padding-top: 60px;

    &__posts {
      margin-top: 60px;
    }
  }
</style>