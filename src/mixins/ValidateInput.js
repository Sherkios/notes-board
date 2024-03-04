export default {
  methods: {
    validateInput(value) {
      if (value != "") {
        return false;
      }
      return true;
    }
  }
}