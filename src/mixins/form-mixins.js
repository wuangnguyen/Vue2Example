export default dataService => {
  return {
    props: {
      model: {
        type: Object,
        default() {
          return undefined;
        }
      }
    },
    methods: {
      onCreatedSuccessfully() {},
      onCreatedFailure() {},
      onUpdatedSuccessfully() {},
      onUpdatedFailure() {},
      submit() {
        if (this.model.id === -1) {
          this.handleCreate();
        } else {
          this.handleUpdate();
        }
      },
      handleCreate() {
        let self = this;
        dataService
          .create(this.model)
          .then(() => {
            self.onCreatedSuccessfully();
            self.hideDialog();
          })
          .catch(() => {
            self.onCreatedFailure();
          });
      },
      handleUpdate() {
        let self = this;
        dataService
          .update(this.model)
          .then(() => {
            self.onUpdatedSuccessfully();
            this.hideDialog();
          })
          .catch(() => {
            self.onUpdatedFailure();
          });
      }
    }
  };
};
