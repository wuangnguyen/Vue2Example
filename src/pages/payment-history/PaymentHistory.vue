<template>
  <div>
    <v-data-table
      :loading="loading"
      group-by="date"
      group-desc
      :headers="headers"
      :items="filteredPaymentHistories"
      :items-per-page="-1"
      hide-default-footer
      :no-data-text="'Chưa có dữ liệu'"
      :search="search"
      :custom-filter="customFilter"
      class="elevation-1"
    >
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
          <component :is="addOrUpdateDialog" :paymentHistoryItem="paymentHistoryItem" @close="onAddEditDialogClose"></component>
        </v-toolbar>
      </template>
      <template v-slot:group.header="{ items, headers, isOpen, toggle }">
        <th :colspan="headers.length">
          <v-icon left small @click="toggle">{{ isOpen ? 'fa-minus' : 'fa-plus' }} </v-icon>
          {{ formatDate(items[0].date) }}
        </th>
      </template>
      <template v-slot:item.amount="{ item }">
        {{ format(item.amount) }}
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
        <v-card-title class="headline"> Xóa dòng này? </v-card-title>
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
import paymentHistoryService from '@/services/paymentHistoryService';
import { removeUnicode } from '@/helpers/string-helper';
import Vue from 'vue';
export default {
  components: {
    addOrUpdateDialog: () => import('./AddOrUpdateDialog')
  },
  data: function() {
    return {
      search: '',
      loading: false,
      paymentHistoryTypes: [
        { id: 0, name: '' },
        { id: 3, name: 'Thu' },
        { id: 4, name: 'Chi' }
      ],
      selectedCategoryId: null,
      addOrUpdateDialog: '',
      displayDeleteDialog: false,
      headers: [
        { text: 'Ngày', value: 'date' },
        { text: 'Loại', value: 'payment_history_type', filterable: false },
        { text: 'Số tiền', value: 'amount' },
        { text: 'Người thực hiện', value: 'created_by' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, align: 'right', filterable: false }
      ],
      paymentHistories: [],
      defaultPaymentHistoryItem: {
        id: -1,
        category_id: 3,
        date: new Date().toISOString().substr(0, 10),
        quantity: 0,
        notes: ''
      },
      paymentHistoryItem: null
    };
  },
  computed: {
    filteredPaymentHistories() {
      if (!this.selectedCategoryId) {
        return this.paymentHistories;
      }
      return this.paymentHistories.filter(x => x.category_id == this.selectedCategoryId);
    }
  },
  methods: {
    loadPaymentHistories() {
      this.paymentHistoryItem = { ...this.defaultPaymentHistoryItem };
      this.loading = true;
      paymentHistoryService
        .get()
        .then(response => {
          this.paymentHistories = response.data;
          this.paymentHistories.forEach(item => (item.date = new Date(item.date).toISOString().substr(0, 10)));
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => (this.loading = false));
    },
    onBtnAddClicked() {
      this.addOrUpdateDialog = 'addOrUpdateDialog';
      console.log(this.paymentHistoryItem);
    },
    onAddEditDialogClose() {
      this.addOrUpdateDialog = '';
      this.loadPaymentHistories();
    },
    editItem(paymentHistoryItem) {
      this.paymentHistoryItem = paymentHistoryItem;
      this.addOrUpdateDialog = 'addOrUpdateDialog';
    },
    deleteItem(paymentHistoryItem) {
      this.displayDeleteDialog = true;
      this.paymentHistoryItem = paymentHistoryItem;
    },
    confirmDelete() {
      let self = this;
      paymentHistoryService
        .delete(this.paymentHistoryItem.id)
        .then(() => {
          Vue.$toast.success('Xóa thành công');
        })
        .catch(e => {
          Vue.$toast.error('Xảy ra lỗi khi xóa');
          console.log(e);
        })
        .finally(() => {
          self.displayDeleteDialog = false;
          self.loadPaymentHistories();
        });
    },
    format(value) {
      var formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
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
    }
  },
  created() {
    this.loadPaymentHistories();
  }
};
</script>
