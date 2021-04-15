<template>
  <v-table :height="200" :headers="headers" :items="filteredRewards" :loading="loading" class="elevation-1 orange lighten-5">
    <template v-slot:top>
      <v-toolbar flat>
        <v-select dense class="mt-6" v-model="selectedType" :items="rewardTypes" item-text="name" item-value="id" label="Loại"></v-select>
        <v-spacer></v-spacer>
        <v-btn color="secondary" title="Thêm mới" @click="onBtnAddClicked">
          <v-icon small>
            fa-plus
          </v-icon>
        </v-btn>
        <modal-form ref="form" @close="modalFormClosed" :userId="userId" :model="item" />
        <confirm-dialog ref="deleteDialog" @close="modalFormClosed" @confirm="handleDelete"></confirm-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.date="{ item }">
      {{ item.date | date }}
    </template>
    <template v-slot:item.type="{ item }">
      {{ rewardTypes.find(x => x.id == item.type).name }}
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
import rewardService from '@/services/rewardService';
import tableMixins from '@/components/VTable/v-table-mixins';
export default {
  props: ['userId'],
  components: {
    vTable: () => import('@/components/VTable/VTable'),
    modalForm: () => import('./RewardForm'),
    confirmDialog: () => import('@/components/VDialog/ConfirmDialog')
  },
  mixins: [tableMixins(rewardService)],
  data: function() {
    return {
      rewardTypes: [
        { id: -1, name: 'Tất cả' },
        { id: 0, name: 'Khen thưởng' },
        { id: 1, name: 'Kỷ luật' }
      ],
      selectedType: null,
      displayDeleteDialog: false,
      headers: [
        { text: 'Ngày', value: 'date' },
        { text: 'Loại', value: 'type' },
        { text: 'Ghi chú', value: 'notes' },
        { text: '', value: 'actions', sortable: false, align: 'right' }
      ],
      defaultItem: {
        id: -1,
        type: 1,
        user_id: this.userId,
        date: new Date().toISOString().substr(0, 10),
        notes: ''
      }
    };
  },
  computed: {
    filteredRewards() {
      if (this.selectedType == null || this.selectedType == -1) {
        return this.items;
      }
      return this.items.filter(x => x.type == this.selectedType);
    }
  },
  methods: {
    loadData() {
      let self = this;
      self.loading = true;
      rewardService
        .get(self.userId)
        .then(response => {
          response.data.forEach(item => {
            item.date = item.date.substr(0, 10);
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
    modalFormClosed(model) {
      this.loadData();
      this.$emit('close', model);
    }
  }
};
</script>
