<template>
  <div>
    <v-data-table :loading="loading" :headers="headers" :items="filteredTransactions" :items-per-page="-1" hide-default-footer :no-data-text="'Chưa có dữ liệu'" class="elevation-1 orange lighten-5">
      <template v-slot:top>
        <v-toolbar flat>
          <v-select dense class="mt-6" v-model="selectedCategoryId" :items="transactionTypes" item-text="name" item-value="id" label="Loại"></v-select>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="onBtnAddClicked">
            <v-icon small>
              fa-plus
            </v-icon>
          </v-btn>
          <component :is="addOrUpdateDialog" :transactionItem="transactionItem" @transaction-modified="$emit('transaction-modified')" @close="onAddEditDialogClose"></component>
        </v-toolbar>
      </template>
      <template v-slot:item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mx-1" small @click="editItem(item)">
          fa-edit
        </v-icon>
        <v-icon class="mx-1" small @click="deleteItem(item)">
          fa-trash-alt
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog persistent v-model="displayDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline"> Xóa giao dịch này? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="displayDeleteDialog = false">Hủy</v-btn>
          <v-btn color="blue darken-1" text @click="confirmDelete">Đồng ý</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import transactionService from '@/services/transactionService';
import Vue from 'vue';
export default {
  props: ['productId'],
  components: {
    addOrUpdateDialog: () => import('./AddOrUpdateDialog')
  },
  data: function() {
    return {
      loading: false,
      transactionTypes: [
        { id: 0, name: '' },
        { id: 1, name: 'Nhập' },
        { id: 2, name: 'Xuất' }
      ],
      selectedCategoryId: null,
      addOrUpdateDialog: '',
      displayDeleteDialog: false,
      headers: [
        { text: 'Ngày', value: 'date' },
        { text: 'Loại', value: 'transaction_type' },
        { text: 'Số lượng', value: 'quantity' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, align: 'right' }
      ],
      transactions: [],
      defaultTransactionItem: {
        id: -1,
        category_id: 1,
        product_id: this.productId,
        date: new Date().toISOString().substr(0, 10),
        quantity: 0,
        notes: ''
      },
      transactionItem: null
    };
  },
  computed: {
    filteredTransactions() {
      if (!this.selectedCategoryId) {
        return this.transactions;
      }
      return this.transactions.filter(x => x.category_id == this.selectedCategoryId);
    }
  },
  methods: {
    loadTransactions() {
      this.transactionItem = { ...this.defaultTransactionItem };
      this.loading = true;
      transactionService
        .get(this.productId)
        .then(response => {
          this.transactions = response.data;
          this.transactions.forEach(item => (item.date = new Date(item.date).toISOString().substr(0, 10)));
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => (this.loading = false));
    },
    onBtnAddClicked() {
      this.addOrUpdateDialog = 'addOrUpdateDialog';
      console.log(this.transactionItem);
    },
    onAddEditDialogClose() {
      this.addOrUpdateDialog = '';
      this.loadTransactions();
    },
    editItem(transactionItem) {
      this.transactionItem = transactionItem;
      this.addOrUpdateDialog = 'addOrUpdateDialog';
    },
    deleteItem(transactionItem) {
      this.displayDeleteDialog = true;
      this.transactionItem = transactionItem;
    },
    confirmDelete() {
      let self = this;
      transactionService
        .delete(this.transactionItem.id)
        .then(() => {
          Vue.$toast.success('Xóa thành công');
          self.$emit('transaction-deleted');
        })
        .catch(e => {
          Vue.$toast.error('Xảy ra lỗi khi xóa');
          console.log(e);
        })
        .finally(() => {
          self.displayDeleteDialog = false;
          self.loadTransactions();
        });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    }
  },
  created() {
    this.loadTransactions();
  }
};
</script>
