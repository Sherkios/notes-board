export default {
  data() {
    return {
      isShowDialog: false,
    }
  },
  methods: {
    hideDialog() {
      this.isShowDialog = false;
    },
    showDialog() {
      this.isShowDialog = true;
    }
  }
}