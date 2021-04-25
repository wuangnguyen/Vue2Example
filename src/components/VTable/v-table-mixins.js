import { removeUnicode } from '@/helpers/string-helper';
import Vue from 'vue';

export default dataService => {
  return {
    data() {
      return {
        loading: true,
        search: '',
        headers: [],
        items: [],
        defaultItem: {},
        item: {}
      };
    },
    methods: {
      loadData() {
        let self = this;
        self.loading = true;
        dataService
          .getAll()
          .then(response => {
            self.items = response.data;
          })
          .catch(e => {
            console.log(e);
          })
          .finally(function() {
            self.loading = false;
          });
      },
      customFilter(value, search) {
        if (!value || !search) {
          return false;
        }
        search = search.toLowerCase();
        if (typeof value === 'string') {
          value = value.toLowerCase();
          let searchArr = search;
          let originValue = value;
          let transformValue = removeUnicode(value);
          if (originValue.indexOf(search) !== -1 || transformValue.indexOf(search) !== -1) {
            return true;
          }
          searchArr = search.split(' ');
          originValue = value.split(' ');
          transformValue = transformValue.split(' ');
          for (let i = 0; i < searchArr.length; i++) {
            if (originValue.includes(searchArr[i]) || transformValue.includes(searchArr[i])) {
              return true;
            }
          }
          return false;
        }
        return value.toString().indexOf(search) !== -1;
      },
      onBtnAddClicked() {
        this.showModalForm(Object.assign({}, this.defaultItem));
      },
      editItem(item) {
        this.showModalForm(item);
      },
      deleteItem(item) {
        this.item = item;
        this.$refs.deleteDialog.showDialog();
      },
      showModalForm(item) {
        this.item = item;
        this.$refs.form.showModalForm();
      },
      modalFormClosed() {
        this.loadData();
      },
      handleDelete() {
        let self = this;
        dataService
          .delete(self.item.id)
          .then(() => {
            Vue.$toast.success('Xóa thành công');
          })
          .catch(e => {
            Vue.$toast.error('Xảy ra lỗi khi xóa');
            console.log(e);
          })
          .finally(() => {
            self.$refs.deleteDialog.hideDialog(self.item);
          });
      }
    },
    created() {
      this.loadData();
    }
  };
};
