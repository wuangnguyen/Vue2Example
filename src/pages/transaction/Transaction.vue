<template>
  <v-table :headers="headers" :items="filteredTransactions" :loading="loading" class="elevation-1 orange lighten-5">
    <template v-slot:top>
      <v-toolbar flat>
        <v-select dense class="mt-6" v-model="selectedCategoryId" :items="transactionTypes" item-text="name" item-value="id" label="Loại"></v-select>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="onBtnAddClicked">
          <v-icon small>
            fa-plus
          </v-icon>
        </v-btn>
        <modal-form ref="form" @close="modalFormClosed" :productId="productId" :model="item" />
        <confirm-dialog ref="deleteDialog" @close="modalFormClosed" @confirm="handleDelete"></confirm-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.date="{ item }">
      {{ item.date | date }}
    </template>
    <template v-if="isLoggedIn()" v-slot:item.actions="{ item }">
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
import transactionService from '@/services/transactionService';
import tableMixins from '@/components/VTable/v-table-mixins';
export default {
  props: ['productId'],
  components: {
    vTable: () => import('@/components/VTable/VTable'),
    modalForm: () => import('./TransactionForm'),
    confirmDialog: () => import('@/components/VDialog/ConfirmDialog')
  },
  mixins: [tableMixins(transactionService)],
  data: function() {
    return {
      transactionTypes: [
        { id: 0, name: 'Tất cả' },
        { id: 1, name: 'Nhập' },
        { id: 2, name: 'Xuất' }
      ],
      selectedCategoryId: null,
      displayDeleteDialog: false,
      headers: [
        { text: 'Ngày', value: 'date' },
        { text: 'Loại', value: 'transaction_type' },
        { text: 'Số lượng', value: 'quantity' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, align: 'right' }
      ],
      defaultItem: {
        id: -1,
        category_id: 1,
        product_id: this.productId,
        date: new Date().toISOString().substr(0, 10),
        quantity: 0,
        notes: ''
      }
    };
  },
  computed: {
    filteredTransactions() {
      if (!this.selectedCategoryId) {
        return this.items;
      }
      return this.items.filter(x => x.category_id == this.selectedCategoryId);
    }
  },
  methods: {
    loadData() {
      let self = this;
      self.loading = true;
      transactionService
        .get(self.productId)
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
    modalFormClosed(model) {
      this.loadData();
      this.$emit('close', model);
    }
  }
};
</script>
