export default {
  data() {
    return {
      isDisplay: false
    };
  },
  methods: {
    showDialog() {
      this.isDisplay = true;
    },
    hideDialog(model) {
      this.isDisplay = false;
      this.$emit('close', model);
    }
  }
};
