export default {
  data() {
    return {
      isShowDialog: false,
      typeDialog: '',
    }
  },
  methods: {
    hideDialog() {
      this.isShowDialog = false;
    },
    showDialog(type) {
      this.isShowDialog = true;
      this.typeDialog = type;
    }
  }
}