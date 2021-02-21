<template>
  <v-table group-by="date" group-desc :headers="headers" :loading="loading" :search="search" :custom-filter="customFilter" :items="filteredPaymentHistories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field v-model="search" label="Tìm kiếm" class="mt-6"></v-text-field>
        <v-spacer></v-spacer>
        <v-select dense class="mt-6" v-model="selectedCategoryId" :items="paymentHistoryTypes" item-text="name" item-value="id" label="Loại"></v-select>
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
        {{ items[0].date | date }}
      </th>
    </template>
    <template v-slot:item.amount="{ item }">
      <span :class="{ 'money pa-1 rounded': true, 'green darken-1': item.category_id === 3, 'deep-orange accent-4': item.category_id === 4 }">{{ item.amount | currency }}</span>
    </template>
    <template v-slot:item.date="{ item }">
      {{ item.date | date }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="mx-1" small @click="editItem(item)">
        fa-edit
      </v-icon>
      <v-icon class="mx-1" small @click="deleteItem(item)">
        fa-trash-alt
      </v-icon>
    </template>
  </v-table>
</template>

<script>
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
        { text: 'Ngày', value: 'date' },
        { text: 'Loại', value: 'payment_history_type', filterable: false },
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
      }
    };
  },
  computed: {
    filteredPaymentHistories() {
      if (!this.selectedCategoryId) {
        return this.items;
      }
      return this.items.filter(x => x.category_id == this.selectedCategoryId);
    }
  }
};
</script>
<style>
.money {
  color: #fff;
}
</style>
