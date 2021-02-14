<template>
  <v-data-table
    :items="items"
    :headers="headers"
    v-bind="$attrs"
    v-on="$listeners"
    item-key="id"
    :items-per-page="-1"
    hide-default-footer
    :loading="loading"
    :no-data-text="'Chưa có dữ liệu'"
    :search="search"
    :custom-filter="customFilter"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field v-model="search" label="Tìm kiếm" class="mt-6"></v-text-field>
        <v-spacer></v-spacer>
        <slot name="top-toolbar"></slot>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$emit('btnAddClicked')">
          <v-icon left small>
            fa-plus
          </v-icon>
          Thêm mới
        </v-btn>
      </v-toolbar>
    </template>
    <template v-for="column in computedHeader" v-slot:[`item.${column.value}`]="{ item }">
      <slot :name="`item.${column.value}`" :item="item">
        {{ item[column.value] }}
      </slot>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <slot name="expanded-item" :headers="headers" :item="item" />
    </template>
  </v-data-table>
</template>

<script>
import { removeUnicode } from '@/helpers/string-helper';
export default {
  name: 'v-table',
  props: {
    headers: {
      type: Array,
      required: true
    },
    dataService: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      search: '',
      items: []
    };
  },
  computed: {
    computedHeader() {
      return this.headers.filter(x => x.value !== 'data-table-expand' && x.value !== 'data-table-select');
    }
  },
  methods: {
    loadData() {
      if (!this.$props.dataService) {
        return;
      }
      let self = this;
      self.loading = true;
      this.$props.dataService
        .getAll()
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
    customFilter(value, search) {
      if (!value || !search) {
        return false;
      }
      search = search.toLowerCase();
      if (typeof value === 'string') {
        value = value.toLowerCase();
        let searchArr = search;
        let originValue = value;
        let transformValue = removeUnicode(value);
        if (originValue.indexOf(search) !== -1 || transformValue.indexOf(search) !== -1) {
          return true;
        }
        searchArr = search.split(' ');
        originValue = value.split(' ');
        transformValue = transformValue.split(' ');
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
  mounted() {
    this.loadData();
  }
};
</script>
