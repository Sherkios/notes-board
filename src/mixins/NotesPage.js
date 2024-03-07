import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import NewForm from "@/components/posts/NewForm.vue";
import DeleteForm from "@/components/posts/DeleteForm.vue";
import ChangeForm from "@/components/posts/ChangeForm.vue";
import DeletePost from '@/mixins/DeletePost';
import Dialog from "@/mixins/Dialog";
import PostList from "@/components/posts/PostList.vue";
import GetPosts from "@/mixins/GetPosts";
export default{
  props: {
  },
  mixins: [Dialog,  GetPosts, DeletePost],
  components: {
    PostList,
    NewForm,
    DeleteForm,
    ChangeForm,
  },
  data() {
    return {
      typeDialog: "",
      idDeletingPost: undefined,
      changesPost: {},
      posts: {},
    }
  },
  methods: {
    
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
    showNewDialog() {
      this.typeDialog = "new"
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
    async addPost(post) {
      post.id = Date.now();
      post.userId = this.userId;
      this.posts.push(post);
      this.hideDialog();
    }
    
  },
  computed: {
    ...mapState({
      userId: state => state.auth.userId,
    }),
  }
}