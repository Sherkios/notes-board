import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import NewForm from "@/components/posts/NewForm.vue";
import DeleteForm from "@/components/posts/DeleteForm.vue";
import ChangeForm from "@/components/posts/ChangeForm.vue";
import DeletePost from '@/mixins/DeletePost';
import Dialog from "@/mixins/Dialog";
import PostList from "@/components/posts/PostList.vue";
export default{
  props: {
  },
  mixins: [Dialog,  DeletePost],
  components: {
    PostList,
    NewForm,
    DeleteForm,
    ChangeForm,
  },
  data() {
    return {
      idDeletingPost: undefined,
      changesPost: {},
      posts: {},
    }
  },
  methods: {
    
    showRemoveDialog(id) {
      this.idDeletingPost = id;
      this.showDialog("delete")
    },
    showChangeDialog(post) {
      this.changesPost = post;
      this.showDialog("change")
    },
    showNewDialog() {
      this.showDialog("new")
    },
    async removePost() {
      await this.deletePost(this.idDeletingPost)
      this.posts = this.posts.filter(post => post._id != this.idDeletingPost);
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
      await this._addPost(post)
      this.posts = await this.getPosts(this.userId)
      this.hideDialog();
    },

    ...mapActions({
      getPosts: "notes/getPosts",
      _addPost: "notes/addPost",
      deletePost: "notes/deletePost"
    })
    
  },
  computed: {
    ...mapState({
      userId: state => state.auth.userId,
    }),
  },

  
}