export default {
  methods: {
    validateInput(value) {
      if (value != "") {
        return true;
      }
      return false;
    }
  }
}