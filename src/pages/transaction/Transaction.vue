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
        <v-dialog persistent v-model="displayDeleteDialog" max-width="300px">
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
      </v-toolbar>
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
import transactionService from '@/services/transactionService';
import Vue from 'vue';
import tableMixins from '@/components/VTable/v-table-mixins';
export default {
  props: ['productId'],
  components: {
    vTable: () => import('@/components/VTable/VTable'),
    modalForm: () => import('./TransactionForm')
  },
  mixins: [tableMixins(transactionService)],
  data: function() {
    return {
      transactionTypes: [
        { id: 0, name: '' },
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
    },
    deleteItem(item) {
      this.displayDeleteDialog = true;
      this.item = item;
    },
    confirmDelete() {
      let self = this;
      transactionService
        .delete(self.item.id)
        .then(() => {
          Vue.$toast.success('Xóa thành công');
        })
        .catch(e => {
          Vue.$toast.error('Xảy ra lỗi khi xóa');
          console.log(e);
        })
        .finally(() => {
          self.displayDeleteDialog = false;
          self.modalFormClosed(self.item);
        });
    }
  }
};
</script>
