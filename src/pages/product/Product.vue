<template>
  <div>
    <v-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :search="search"
      :custom-filter="customFilter"
      show-expand
      :single-expand="true"
      :expanded.sync="expanded"
      @item-expanded="onItemExpanded"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field v-model="search" label="Tìm kiếm" class="mt-6"></v-text-field>
          <v-spacer></v-spacer>
          <slot name="top-toolbar"></slot>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onBtnAddClicked">
            <v-icon left small>
              fa-plus
            </v-icon>
            Thêm mới
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="my-4 ">
            <component :is="transactionComponent" @transaction-deleted="loadData()" @transaction-modified="loadData()" :productId="item.id"></component>
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
    <modal-form ref="form" @close="ModalFormClosed" :product="item" />
  </div>
</template>
<script>
import productService from '@/services/productService';
import tableMixins from '@/components/VTable/v-table-mixins';
export default {
  components: {
    vTable: () => import('@/components/VTable/VTable'),
    modalForm: () => import('./Form')
  },
  mixins: [tableMixins(productService)],
  data() {
    return {
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
      item: undefined
    };
  },

  methods: {
    onItemExpanded() {
      this.transactionComponent = () => import('@/pages/transaction/Transaction');
    }
  }
};
</script>
