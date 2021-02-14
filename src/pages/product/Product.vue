<template>
  <div>
    <v-table ref="table" @btnAddClicked="onBtnAddClicked" :headers="headers" :data-service="dataService" show-expand :single-expand="true" :expanded.sync="expanded" @item-expanded="onItemExpanded">
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="my-4 ">
            <component :is="transactionComponent" @transaction-deleted="loadProducts()" @transaction-modified="loadProducts()" :productId="item.id"></component>
          </div>
        </td>
      </template>
      <template v-slot:item.price="{ item }">
        {{ item.price | currency }}
      </template>
      <template v-slot:item.in_stock="{ item }">
        {{ item.import_count - item.export_count }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mx-1" small @click="editItem(item)">
          fa-edit
        </v-icon>
      </template>
    </v-table>
    <modal-form ref="form" @close="ModalFormClosed" :product="product" />
  </div>
</template>
<script>
import productService from '@/services/productService';
export default {
  components: {
    vTable: () => import('@/components/VTable/VTable'),
    modalForm: () => import('./Form')
  },
  data() {
    return {
      dataService: productService,
      expanded: [],
      transactionComponent: '',
      headers: [
        { text: 'Tên sản phẩm', value: 'name' },
        { text: 'Tồn', value: 'in_stock' },
        { text: 'Nhập', value: 'import_count' },
        { text: 'Xuất', value: 'export_count' },
        { text: 'ĐVT', value: 'unit', align: 'center' },
        { text: 'Đơn giá/ĐVT', value: 'price' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, filterable: false, align: 'right' },
        { text: '', value: 'data-table-expand', filterable: false }
      ],
      product: undefined
    };
  },

  methods: {
    onBtnAddClicked() {
      this.showModalForm(undefined);
    },
    editItem(product) {
      this.showModalForm(product);
    },
    showModalForm(model) {
      this.product = model;
      this.$refs.form.showDialog();
    },
    ModalFormClosed() {
      this.$refs.table.loadData();
    },
    onItemExpanded() {
      this.transactionComponent = () => import('@/pages/transaction/Transaction');
    }
  }
};
</script>
