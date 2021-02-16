import { removeUnicode } from '@/helpers/string-helper';
export default dataService => {
  return {
    data() {
      return {
        loading: true,
        search: '',
        headers: [],
        items: [],
        defaultItem: {},
        item: { ...this.defaultItem }
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
        this.showModalForm(this.defaultItem);
      },
      editItem(item) {
        this.showModalForm(item);
      },
      showModalForm(item) {
        this.item = item;
        this.$refs.form.showDialog();
      },
      modalFormClosed() {
        this.loadData();
      }
    },
    created() {
      this.loadData();
    }
  };
};
