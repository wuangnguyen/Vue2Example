<template>
  <base-modal-form ref="baseModalForm" @close="close" @submit="submit">
    <template #title>{{ model.id === -1 ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm' }}</template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field tabindex="1" required :rules="[() => !!model.name || 'Nhập tên sản phẩm']" v-model="model.name" label="Tên sản phẩm"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-money tabindex="2" label="Đơn giá" v-model="model.price" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field tabindex="3" required :rules="[() => !!model.unit || 'Nhập đơn vị tính']" label="Đơn vị tính" v-model="model.unit" />
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
import productService from '@/services/productService';
import Vue from 'vue';
import formMixins from '@/mixins/form-mixins';
export default {
  mixins: [formMixins(productService)],
  components: {
    vMoney: () => import('@/components/VMoney/VMoney'),
    baseModalForm: () => import('@/components/VForm/BaseModalForm')
  },
  methods: {
    onCreatedFailure() {
      Vue.$toast.error('Sản phẩm đã tồn tại');
    },
    onUpdatedFailure() {
      Vue.$toast.error('Sản phẩm đã tồn tại');
    }
  }
};
</script>
