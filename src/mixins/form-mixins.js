import Vue from 'vue';
import { toVnFormat } from '@/helpers/date-helper';
export default dataService => {
  return {
    props: {
      model: Object
    },
    computed: {
      computedDateFormatted() {
        return toVnFormat(this.model.date);
      }
    },
    methods: {
      showModalForm() {
        this.$refs.baseModalForm.showDialog();
      },
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
      close(model) {
        this.$emit('close', model);
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
          .create(self.model)
          .then(() => {
            self.onCreatedSuccessfully();
            self.$refs.baseModalForm.hideDialog(self.model);
          })
          .catch(() => {
            self.onCreatedFailure();
          });
      },
      handleUpdate() {
        let self = this;
        dataService
          .update(self.model)
          .then(() => {
            self.onUpdatedSuccessfully();
            self.$refs.baseModalForm.hideDialog(self.model);
          })
          .catch(() => {
            self.onUpdatedFailure();
          });
      }
    }
  };
};
