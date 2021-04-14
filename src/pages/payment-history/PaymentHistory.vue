<template>
  <v-table group-by="date" @current-items="currentItems" group-desc :headers="headers" :loading="loading" :search="search" :custom-filter="customFilter" :items="items" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field v-model="search" label="Tìm kiếm" class="mt-6"></v-text-field>
        <v-spacer></v-spacer>
        <v-select class="mt-6" dense v-model="selectedCategoryId" :items="paymentHistoryTypes" item-text="name" item-value="id" label="Loại"></v-select>
        <v-spacer></v-spacer>
        <v-menu v-model="fromDateMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field class="mt-6" clearable @click:clear="fromDate = null" :value="computedFromDateFormatted" label="Từ ngày" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker locale="vi-vn" v-model="fromDate" @input="fromDateMenu = false"></v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu v-model="toDateMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field class="mt-6" clearable @click:clear="toDate = null" :value="computedToDateFormatted" label="Đến ngày" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker locale="vi-vn" v-model="toDate" @input="toDateMenu = false"></v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="onBtnAddClicked">
          <v-icon small>
            fa-plus
          </v-icon>
        </v-btn>
        <modal-form ref="form" @close="modalFormClosed" :model="item" />
        <confirm-dialog ref="deleteDialog" @close="modalFormClosed" @confirm="handleDelete"></confirm-dialog>
      </v-toolbar>
    </template>
    <template v-slot:group.header="{ items, headers, isOpen, toggle }">
      <th :colspan="headers.length">
        <v-icon left small @click="toggle">{{ isOpen ? 'fa-minus' : 'fa-plus' }} </v-icon>
        {{ items[0].date | date }} => Thu: {{ getTotalAmount(items, 3) | currency }} / Chi: {{ getTotalAmount(items, 4) | currency }}
      </th>
    </template>
    <template v-slot:item.amount="{ item }">
      {{ item.amount | currency }}
    </template>
    <template v-slot:item.date="{ item }">
      {{ item.date | date }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="mx-1" small title="cập nhật" @click="editItem(item)">
        fa-edit
      </v-icon>
      <v-icon class="mx-1" small title="xoá" @click="deleteItem(item)">
        fa-trash-alt
      </v-icon>
    </template>
    <template v-slot:footer>
      <div class="pa-4">
        <span class="ma-2">
          Tổng thu: <b class="money pa-1 rounded green darken-1">{{ totalImport | currency }}</b>
        </span>
        /
        <span class="ma-2">
          Tổng chi: <b class="money ma-2 pa-1 rounded deep-orange accent-4">{{ totalExport | currency }}</b>
        </span>
      </div>
    </template>
  </v-table>
</template>

<script>
import { toVnFormat } from '@/helpers/date-helper';
import paymentHistoryService from '@/services/paymentHistoryService';
import tableMixins from '@/components/VTable/v-table-mixins';
export default {
  components: {
    vTable: () => import('@/components/VTable/VTable'),
    modalForm: () => import('./PaymentHistoryForm'),
    confirmDialog: () => import('@/components/VDialog/ConfirmDialog')
  },
  mixins: [tableMixins(paymentHistoryService)],
  data: function() {
    return {
      paymentHistoryTypes: [
        { id: 0, name: 'Tất cả' },
        { id: 3, name: 'Thu' },
        { id: 4, name: 'Chi' }
      ],
      selectedCategoryId: null,
      displayDeleteDialog: false,
      headers: [
        { text: 'Ngày', value: 'date', filter: this.dateFilter },
        { text: 'Loại', value: 'payment_history_type', filterable: false },
        { text: 'Loại', value: 'category_id', align: ' d-none', filter: this.categoryFilter },
        { text: 'Số tiền', value: 'amount' },
        { text: 'Người thực hiện', value: 'created_by' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, align: 'right', filterable: false }
      ],
      defaultItem: {
        id: -1,
        category_id: 4,
        date: new Date().toISOString().substr(0, 10),
        created_by: '',
        notes: ''
      },
      fromDateMenu: false,
      toDateMenu: false,
      fromDate: null,
      toDate: null,
      totalImport: 0,
      totalExport: 0
    };
  },
  methods: {
    currentItems(items) {
      this.totalImport = this.getTotalAmount(items, 3);
      this.totalExport = this.getTotalAmount(items, 4);
    },
    getTotalAmount(items, type) {
      return items
        .filter(x => x.category_id == type)
        .map(x => x.amount)
        .reduce((a, b) => a + b, 0);
    },
    dateFilter(value) {
      let fromCondition = true;
      let toCondition = true;
      if (this.fromDate != null) {
        fromCondition = value >= this.fromDate;
      }
      if (this.toDate != null) {
        toCondition = value <= this.toDate;
      }
      return fromCondition && toCondition;
    },
    categoryFilter(value) {
      if (!this.selectedCategoryId) {
        return true;
      }
      return value === this.selectedCategoryId;
    }
  },
  computed: {
    computedFromDateFormatted() {
      return toVnFormat(this.fromDate);
    },
    computedToDateFormatted() {
      return toVnFormat(this.toDate);
    }
  }
};
</script>
<style>
.money {
  color: #fff;
}
</style>
