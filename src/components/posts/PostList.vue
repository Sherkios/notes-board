<template>
  <div class="posts">
    <post-item
    v-for="post in posts" 
    :key="post.id"
    :post="post"
    :isShowUser="isShowUser"
    @show-remove-dialog="((id) => $emit('show-remove-dialog', id))"
    @show-change-dialog="((post) => $emit('show-change-dialog', post))"
    ></post-item>
  </div>

</template>

<script>

import axios from 'axios';
import PostItem from "@/components/posts/PostItem.vue";

import GetPosts from "@/mixins/GetPosts";
import Dialog from '@/mixins/Dialog';
export default {
  emits: [
    'remove-post',
    'change-post',
    'show-remove-dialog',
    'show-change-dialog',
  ],
  props: {
    isShowUser: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Object,
      required: true,
    },
    userId: {
      type: [Number, String],
      default: null,
    }
  },
  components: {
    PostItem,
    
  },
  mixins: [
    GetPosts, 
    Dialog,
  ],
  data() {
    return {
      
    }
  },
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