<template>
  <base-modal-form ref="baseModalForm" @close="close" @submit="submit">
    <template #title>{{ model.id === -1 ? 'Thêm mới' : 'Cập nhật' }}</template>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select v-model="model.type" :items="rewardTypes" item-text="name" item-value="id" label="Loại"></v-select>
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
        <v-col cols="12">
          <v-textarea v-model="model.notes" rows="3" label="Ghi chú" required :rules="[() => !!model.notes || 'Nhập ghi chú']"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </base-modal-form>
</template>

<script>
import rewardService from '@/services/rewardService';
import formMixins from '@/mixins/form-mixins';
export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  mixins: [formMixins(rewardService)],
  components: {
    baseModalForm: () => import('@/components/VForm/BaseModalForm')
  },
  data: function() {
    return {
      menu: false,
      rewardTypes: [
        { id: 0, name: 'Khen thưởng' },
        { id: 1, name: 'Kỷ luật' }
      ]
    };
  }
};
</script>
