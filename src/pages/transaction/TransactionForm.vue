<template>
  <base-modal-form ref="baseModalForm" @close="close" @submit="submit">
    <template #title>{{ model.id === -1 ? 'Thêm mới nhập/xuất' : 'Cập nhật nhập/xuất' }}</template>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select v-model="model.category_id" :items="transactionTypes" item-text="name" item-value="id" label="Loại"></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="computedDateFormatted" label="Ngày" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker locale="vi-vn" v-model="model.date" @input="menu = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field required :rules="[() => !!model.quantity || 'Nhập số lượng']" label="Số lượng" v-model="model.quantity" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea v-model="model.notes" rows="3" label="Ghi chú"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </base-modal-form>
</template>

<script>
import transactionService from '@/services/transactionService';
import formMixins from '@/mixins/form-mixins';
export default {
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  mixins: [formMixins(transactionService)],
  components: {
    baseModalForm: () => import('@/components/VForm/BaseModalForm')
  },
  data: function() {
    return {
      menu: false,
      transactionTypes: [
        { id: 1, name: 'Nhập' },
        { id: 2, name: 'Xuất' }
      ]
    };
  }
};
</script>
