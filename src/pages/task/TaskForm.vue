<template>
  <base-modal-form ref="baseModalForm" @close="close" @submit="submit">
    <template #title>{{ model.id === -1 ? 'Thêm mới công việc' : 'Cập nhật công việc' }}</template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field tabindex="1" required :rules="[() => !!model.name || 'Nhập tên công việc']" v-model="model.name" label="Tên công việc"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-money tabindex="2" label="Lương/giờ" v-model="model.price" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea tabindex="4" rows="3" v-model="model.notes" label="Ghi chú"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </base-modal-form>
</template>

<script>
import taskService from '@/services/taskService';
import Vue from 'vue';
import formMixins from '@/mixins/form-mixins';
export default {
  mixins: [formMixins(taskService)],
  components: {
    vMoney: () => import('@/components/VMoney/VMoney'),
    baseModalForm: () => import('@/components/VForm/BaseModalForm')
  },
  methods: {
    onCreatedFailure() {
      Vue.$toast.error('Công việc đã tồn tại');
    },
    onUpdatedFailure() {
      Vue.$toast.error('Công việc đã tồn tại');
    }
  }
};
</script>
