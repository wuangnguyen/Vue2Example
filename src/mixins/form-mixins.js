import Vue from 'vue';
export default dataService => {
  return {
    props: {
      model: Object
    },
    methods: {
      onCreatedSuccessfully() {
        Vue.$toast.success('Thêm thành công');
      },
      onCreatedFailure() {
        Vue.$toast.error('Thêm không thành công');
      },
      onUpdatedSuccessfully() {
        Vue.$toast.success('Cập nhật thành công');
      },
      onUpdatedFailure() {
        Vue.$toast.error('Cập nhật không thành công');
      },
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
