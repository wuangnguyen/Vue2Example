export default {
  data() {
    return {
      isDisplay: false
    };
  },
  watch: {
    isDisplay(value) {
      if (value === false) {
        this.$emit('close');
      }
    }
  },
  methods: {
    showDialog() {
      this.isDisplay = true;
    },
    hideDialog() {
      this.isDisplay = false;
    }
  }
};
