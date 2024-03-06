<template>
  <div class="wrapper notes">
    <title-box>
      <template #default>Ваши заметки</template>
      <template #button><my-button>Новая заметка +</my-button></template>
    </title-box>
    <div class="notes__posts">
      <post-list :user-id="userId"></post-list>
    </div>
  </div>

  
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import PostList from "@/components/posts/PostList.vue";
export default {
  data() {
    return {
      isShowDeleteDialog: true,
    }
  },
  components: {
    PostList,
  },
  computed: {
    ...mapState({
      userId: state => state.auth.userId,
    }),
  }
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