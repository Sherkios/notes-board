<template>
  <div class="posts">
    <post-item
    v-for="post in posts" 
    :key="post.id"
    :post="post"
    :isShowUser="isShowUser"
    @showRemoveDialog="showRemoveDialog"
    @showChangeDialog="showChangeDialog"
    ></post-item>
  </div>

  <my-dialog v-model:is-show="isShowDialog">

    <delete-form v-if="typeDialog == 'delete'"
    @hide="hideDialog"
    @removePost="removePost"
    ></delete-form>

    <change-form v-if="typeDialog == 'change'"
    @hide="hideDialog"
    @changePost="changePost"
    :postEl="changesPost"
    ></change-form>

  </my-dialog>
</template>

<script>

import axios from 'axios';
import PostItem from "@/components/posts/PostItem.vue";
import DeleteForm from "@/components/posts/DeleteForm.vue";
import ChangeForm from "@/components/posts/ChangeForm.vue";
import GetPosts from "@/mixins/GetPosts";
import DeletePost from '@/mixins/DeletePost';
export default {
  props: {
    isShowUser: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Number,
      default: null,
    }
  },
  components: {
    PostItem,
    DeleteForm,
    ChangeForm,
  },
  mixins: [GetPosts,DeletePost],
  data() {
    return {
      posts: [],
      isShowDialog: false,
      typeDialog: "",
      idDeletingPost: undefined,
      changesPost: {},
    }
  },
  methods: {
    hideDialog() {
      this.isShowDialog = false;
    },
    showRemoveDialog(id) {
      this.typeDialog = "delete"
      this.idDeletingPost = id;
      this.showDialog()
    },
    showChangeDialog(post) {
      this.changesPost = post;
      this.typeDialog = "change"
      this.showDialog()
    },
    async removePost() {
      this.posts = await this.deletePost(this.posts, this.idDeletingPost);
      this.hideDialog();
    },
    async changePost(changedPost) {
      this.posts = this.posts.map(post => {
        if (post.id != changedPost.id) {
          return post;
        } else {
          return changedPost;
        }
      });
      this.hideDialog();
    },
    showDialog() {
      this.isShowDialog = true;
    }
  },
  async mounted() {
    this.posts = await this.getPosts(this.userId);
  }
}

</script>

<style lang="scss" scoped>
  .posts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 64px;
  }

  .post{
    flex: 0 1 auto;
  }

</style>