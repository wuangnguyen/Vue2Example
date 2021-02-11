<template>
  <v-data-table
    item-key="id"
    show-expand
    :single-expand="true"
    :expanded.sync="expanded"
    :headers="headers"
    :items="products"
    :items-per-page="-1"
    hide-default-footer
    :loading="loading"
    :no-data-text="'Chưa có dữ liệu'"
    @item-expanded="onItemExpanded"
    :search="search"
    :custom-filter="customFilter"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field v-model="search" label="Tìm kiếm" class="mt-6"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="onBtnAddClicked">
          <v-icon left small>
            fa-plus
          </v-icon>
          Thêm mới
        </v-btn>
        <component :is="addOrUpdateDialog" :product="product" @close="onAddEditDialogClose"></component>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <div class="my-4 ">
          <component :is="transactionComponent" @transaction-deleted="loadProducts()" @transaction-modified="loadProducts()" :productId="item.id"></component>
        </div>
      </td>
    </template>
    <template v-slot:item.price="{ item }">
      {{ format(item.price) }}
    </template>
    <template v-slot:item.in_stock="{ item }">
      {{ item.import_count - item.export_count }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="mx-1" small @click="editItem(item)">
        fa-edit
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import productService from '@/services/productService';
import { removeUnicode } from '@/helpers/string-helper';
export default {
  components: {
    addOrUpdateDialog: () => import('./AddOrUpdateDialog')
  },
  data() {
    return {
      search: '',
      loading: false,
      addOrUpdateDialog: '',
      transactionComponent: '',
      expanded: [],
      headers: [
        {
          text: 'Tên sản phẩm',
          value: 'name'
        },
        { text: 'Tồn', value: 'in_stock' },
        { text: 'Nhập', value: 'import_count' },
        { text: 'Xuất', value: 'export_count' },
        { text: 'ĐVT', value: 'unit', align: 'center' },
        { text: 'Đơn giá/ĐVT', value: 'price' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, filterable: false, align: 'right' },
        { text: '', value: 'data-table-expand', filterable: false }
      ],
      products: [],
      defaultProduct: {
        id: -1,
        name: '',
        unit: '',
        price: 0
      },
      product: null
    };
  },

  methods: {
    onBtnAddClicked() {
      this.addOrUpdateDialog = 'addOrUpdateDialog';
    },
    loadProducts() {
      let self = this;
      self.product = { ...self.defaultProduct };
      self.loading = true;
      productService
        .getAll()
        .then(response => {
          self.products = response.data;
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
        let searchArr = search.split(' ');
        let originValue = value.split(' ');
        let transformValue = removeUnicode(value).split(' ');
        for (let i = 0; i < searchArr.length; i++) {
          if (originValue.includes(searchArr[i]) || transformValue.includes(searchArr[i])) {
            return true;
          }
        }
        return false;
      }
      return value.toString().indexOf(search) !== -1;
    },
    onItemExpanded() {
      this.transactionComponent = () => import('@/pages/transaction/Transaction');
    },
    editItem(product) {
      this.product = product;
      this.addOrUpdateDialog = 'addOrUpdateDialog';
    },
    format(value) {
      var formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    },
    onAddEditDialogClose(isCancel = false) {
      this.addOrUpdateDialog = '';
      if (isCancel) {
        return;
      }
      this.loadProducts();
    }
  },
  mounted() {
    this.loadProducts();
  }
};
</script>
