<template>
  <v-table :headers="headers" :items="items" :loading="loading" :search="search" :custom-filter="customFilter" class="elevation-1">
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
        <modal-form ref="form" @close="modalFormClosed" :model="item" />
        <confirm-dialog ref="deleteDialog" @close="modalFormClosed" @confirm="handleDelete"></confirm-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.price="{ item }">
      {{ item.price | currency }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="mx-1" small title="cập nhật" @click="editItem(item)">
        fa-edit
      </v-icon>
      <v-icon class="mx-1" small title="xoá" @click="deleteItem(item)">
        fa-trash-alt
      </v-icon>
    </template>
  </v-table>
</template>
<script>
import taskService from '@/services/taskService';
import tableMixins from '@/components/VTable/v-table-mixins';
export default {
  components: {
    vTable: () => import('@/components/VTable/VTable'),
    modalForm: () => import('./TaskForm'),
    confirmDialog: () => import('@/components/VDialog/ConfirmDialog')
  },
  mixins: [tableMixins(taskService)],
  data() {
    return {
      displayDeleteDialog: false,
      headers: [
        { text: 'Tên việc', value: 'name' },
        { text: 'Lương/giờ', value: 'price' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, filterable: false, align: 'right' }
      ],
      defaultItem: {
        id: -1,
        name: '',
        price: 0
      }
    };
  }
};
</script>
