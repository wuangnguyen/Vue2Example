<template>
  <v-table :headers="headers" :items="items" :loading="loading" :search="search" :custom-filter="customFilter" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field v-model="search" label="Tìm kiếm" class="mt-6"></v-text-field>
        <v-spacer></v-spacer>
        <v-menu v-model="fromDateMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field class="mt-6" :value="computedFromDateFormatted" label="Từ ngày" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker locale="vi-vn" v-model="fromDate" @input="fromDateMenu = false"></v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu v-model="toDateMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field class="mt-6" :value="computedToDateFormatted" label="Đến ngày" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker locale="vi-vn" v-model="toDate" @input="toDateMenu = false"></v-date-picker>
        </v-menu>
      </v-toolbar>
    </template>
    <template v-slot:item.start="{ item }">
      {{ item.start | date }} <br />
      {{ item.end | date }}
    </template>
    <template v-slot:item.price="{ item }">
      {{ item.price | currency }}
    </template>
    <template v-slot:item.total="{ item }">
      {{ item.total | currency }}
    </template>
    <template v-slot:item.is_off="{ item }">
      {{ item.is_off === null ? 'Có' : item.is_off === true ? 'Nghỉ có phép' : 'Nghỉ không phép' }}
    </template>
    <template slot="body.append">
      <tr class="pink--text">
        <th class="title">Tổng</th>
        <th class="title"></th>
        <th class="title"></th>
        <th class="title">{{ sumField('duration') }} giờ</th>
        <th class="title"></th>
        <th class="title">{{ sumField('total') | currency }}</th>
      </tr>
    </template>
  </v-table>
</template>
<script>
import { toVnFormat } from '@/helpers/date-helper';
import schedulerAppointmentService from '@/services/schedulerAppointmentService';
import tableMixins from '@/components/VTable/v-table-mixins';
export default {
  props: ['userId', 'tabActive'],
  components: {
    vTable: () => import('@/components/VTable/VTable')
  },
  mixins: [tableMixins({})],
  data() {
    return {
      fromDateMenu: false,
      toDateMenu: false,
      fromDate: this.getDefaultFromDate(),
      toDate: this.getDefaultToDate(),
      headers: [
        { text: 'Thời gian', value: 'start' },
        { text: 'Tên công việc', value: 'task_name' },
        { text: 'Giá tiền/h', value: 'price' },
        { text: 'Tổng giờ', value: 'duration' },
        { text: 'Hiện diện', value: 'is_off' },
        { text: 'Tổng tiền', value: 'total' }
      ]
    };
  },
  computed: {
    computedFromDateFormatted() {
      return toVnFormat(this.fromDate);
    },
    computedToDateFormatted() {
      return toVnFormat(this.toDate);
    }
  },
  watch: {
    fromDate() {
      this.loadData();
    },
    toDate() {
      this.loadData();
    },
    tabActive(value) {
      if (value === 1) {
        this.loadData();
      }
    }
  },
  methods: {
    getDefaultFromDate() {
      let from = new Date();
      from.setDate(1);
      from.setMonth(from.getMonth() - 1);
      return from.toISOString().substr(0, 10);
    },
    getDefaultToDate() {
      let to = new Date();
      return to.toISOString().substr(0, 10);
    },
    loadData() {
      let self = this;
      self.loading = true;
      schedulerAppointmentService
        .getSalaryItems(this.userId, this.fromDate, this.toDate)
        .then(response => {
          self.items = response.data;
        })
        .finally(function() {
          self.loading = false;
        });
    },
    sumField(key) {
      return this.items.reduce((a, b) => a + (b[key] || 0), 0);
    }
  }
};
</script>
