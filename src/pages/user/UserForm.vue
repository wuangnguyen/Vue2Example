<template>
  <base-modal-form ref="baseModalForm" @close="close" @submit="submit">
    <template #title>{{ model.id === -1 ? 'Thêm mới' : 'Cập nhật' }}</template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field tabindex="1" required :rules="[() => !!model.name || 'Nhập tên/pháp danh']" v-model="model.name" label="Tên/pháp danh"></v-text-field>
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
import userService from '@/services/userService';
import Vue from 'vue';
import formMixins from '@/mixins/form-mixins';
export default {
  mixins: [formMixins(userService)],
  components: {
    baseModalForm: () => import('@/components/VForm/BaseModalForm')
  },
  methods: {
    onCreatedFailure() {
      Vue.$toast.error('Nhân sự đã tồn tại');
    },
    onUpdatedFailure() {
      Vue.$toast.error('Nhân sự đã tồn tại');
    }
  }
};
</script>
