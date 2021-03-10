<template>
  <v-table group-by="dateWithoutTime" group-desc :headers="headers" :loading="loading" :search="search" :custom-filter="customFilter" :items="items" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field v-model="search" label="Tìm kiếm" class="mt-6"></v-text-field>
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
        {{ items[0].dateWithoutTime }}
      </th>
    </template>
    <template v-slot:item.date="{ item }">
      {{ item.date | date }}
    </template>
    <template v-slot:item.foods="{ item }">
      <div v-html="item.foodsHtml"></div>
    </template>
    <template v-slot:item.drinks="{ item }">
      <div v-html="item.drinksHtml"></div>
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
import { toVnFormat } from '@/helpers/date-helper';
import healthCareService from '@/services/healthCareService';
import tableMixins from '@/components/VTable/v-table-mixins';
export default {
  components: {
    vTable: () => import('@/components/VTable/VTable'),
    modalForm: () => import('./HealthCareForm'),
    confirmDialog: () => import('@/components/VDialog/ConfirmDialog')
  },
  mixins: [tableMixins(healthCareService)],
  data: function() {
    return {
      displayDeleteDialog: false,
      headers: [
        { text: 'Thời gian', value: 'date', filter: this.dateFilter },
        { text: 'Thực phẩm', value: 'foods' },
        { text: 'Thức uống', value: 'drinks' },
        { text: 'Đường huyết', value: 'blood_sugar' },
        { text: 'Tăng xông', value: 'blood_pressure' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, align: 'right', filterable: false }
      ],
      defaultItem: {
        id: -1,
        foods: '',
        drinks: '',
        blood_sugar: '',
        blood_pressure: '',
        date: new Date(),
        notes: ''
      },
      fromDateMenu: false,
      toDateMenu: false,
      fromDate: null,
      toDate: null
    };
  },
  methods: {
    loadData() {
      let self = this;
      self.loading = true;
      healthCareService
        .getAll()
        .then(response => {
          response.data.forEach(item => {
            item['foodsHtml'] = item.foods.replace(/(?:\r\n|\r|\n)/g, '<br />');
            item['drinksHtml'] = item.drinks.replace(/(?:\r\n|\r|\n)/g, '<br />');
            item.date = new Date(item.date);
            item['dateWithoutTime'] = toVnFormat(item.date, true);
          });
          self.items = response.data;
        })
        .catch(e => {
          console.log(e);
        })
        .finally(function() {
          self.loading = false;
        });
    },
    dateFilter(value) {
      let fromCondition = true;
      let toCondition = true;
      if (this.fromDate != null) {
        fromCondition = new Date(value.toLocaleDateString().split('/')) >= new Date(this.fromDate.split('-'));
      }
      if (this.toDate != null) {
        toCondition = new Date(value.toLocaleDateString().split('/')) <= new Date(this.toDate.split('-'));
      }
      return fromCondition && toCondition;
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
