<template>
  <v-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :search="search"
    :custom-filter="customFilter"
    show-expand
    :single-expand="true"
    :expanded.sync="expanded"
    @item-expanded="onItemExpanded"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field v-model="search" label="Tìm kiếm" class="mt-6"></v-text-field>
        <v-spacer></v-spacer>
        <slot name="top-toolbar"></slot>
        <v-spacer></v-spacer>
        <v-btn color="primary" title="Thêm mới" @click="onBtnAddClicked">
          <v-icon left small>
            fa-plus
          </v-icon>
          Thêm mới
        </v-btn>
        <modal-form ref="form" @close="modalFormClosed" :model="item" />
        <confirm-dialog ref="deleteDialog" @close="modalFormClosed" @confirm="handleDelete"></confirm-dialog>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" class="py-4">
        <component :is="tabContainerComponent" :userId="item.id"></component>
      </td>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="mx-1" small title="cập nhật" @click="editItem(item)">
        fa-edit
      </v-icon>
      <v-icon class="mx-1" title="khen thưởng/kỷ luật" small @click="openReward(item)">
        fa-gift
      </v-icon>
      <v-icon class="mx-1" small title="xoá" @click="deleteItem(item)">
        fa-trash-alt
      </v-icon>
    </template>
  </v-table>
</template>
<script>
import userService from '@/services/userService';
import tableMixins from '@/components/VTable/v-table-mixins';
export default {
  components: {
    vTable: () => import('@/components/VTable/VTable'),
    modalForm: () => import('./UserForm'),
    confirmDialog: () => import('@/components/VDialog/ConfirmDialog')
  },
  mixins: [tableMixins(userService)],
  data() {
    return {
      expanded: [],
      tabContainerComponent: '',
      displayDeleteDialog: false,
      headers: [
        { text: 'Tên/pháp danh', value: 'name' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, filterable: false, align: 'right' },
        { text: '', value: 'data-table-expand', filterable: false }
      ],
      defaultItem: {
        id: -1,
        name: ''
      }
    };
  },
  methods: {
    onItemExpanded() {
      this.tabContainerComponent = () => import('./TabContainer');
    }
  }
};
</script>
