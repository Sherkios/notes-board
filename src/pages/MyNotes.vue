<template>
  <div class="wrapper notes">
    <title-box>
      <template #default>Ваши заметки</template>
      <template #button><my-button @click="showNewDialog">Новая заметка +</my-button></template>
    </title-box>
    <div class="notes__posts">
      <post-list 
      :user-id="userId"
      :posts="posts"
      @remove-post="removePost"
      @change-post="changePost"
      @show-remove-dialog="showRemoveDialog"
      @show-change-dialog="showChangeDialog"

      ></post-list>
    </div>
  </div>

  <my-dialog v-model:is-show="isShowDialog">

    <new-form v-if="typeDialog == 'new'"
    :prop-user-id="userId"
    @hide="hideDialog"
    @add-post="addPost"
    ></new-form>

    <delete-form v-if="typeDialog == 'delete'"
    @hide="hideDialog"
    @removePost="removePost"
    ></delete-form>

    <change-form v-if="typeDialog == 'change'"
    @hide="hideDialog"
    @change-post="changePost"
    :postEl="changesPost"
    ></change-form>

  </my-dialog>
  
</template>

<script>

import NotesPage from "@/mixins/NotesPage";

export default {
  data() {
    return {
    }
  },
  mixins: [NotesPage],
  
  async mounted() {
    this.posts = await this.getPosts(this.userId)
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