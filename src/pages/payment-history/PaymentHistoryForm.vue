<template>
  <base-modal-form :isDisplay.sync="isDisplay" @submit="submit">
    <template #title>{{ model.id === -1 ? 'Thêm mới thu/chi' : 'Cập nhật thu/chi' }}</template>
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
          <v-money label="Số tiền" required :rules="[() => !!model.amount || 'Nhập số tiền']" v-model="model.amount" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="model.created_by" label="Người thực hiện"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea required :rules="[() => !!model.notes || 'Nhập lý do']" rows="2" v-model="model.notes" label="Lý do"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </base-modal-form>
</template>

<script>
import paymentHistoryService from '@/services/paymentHistoryService';
import dialogMixins from '@/mixins/dialog-mixins';
import formMixins from '@/mixins/form-mixins';
import { toVnFormat } from '@/helpers/date-helper';
export default {
  mixins: [dialogMixins, formMixins(paymentHistoryService)],
  components: {
    vMoney: () => import('@/components/VMoney/VMoney'),
    baseModalForm: () => import('@/components/VForm/BaseModalForm')
  },
  data: function() {
    return {
      menu: false,
      transactionTypes: [
        { id: 3, name: 'Thu' },
        { id: 4, name: 'Chi' }
      ]
    };
  },
  computed: {
    computedDateFormatted() {
      return toVnFormat(this.model.date);
    }
  }
};
</script>
