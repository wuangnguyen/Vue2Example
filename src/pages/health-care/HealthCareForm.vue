<template>
  <base-modal-form ref="baseModalForm" @close="close" @submit="submit">
    <template #title>{{ model.id === -1 ? 'Thêm mới' : 'Cập nhật' }}</template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-datetime-picker clearText="Hủy" :date-picker-props="dateProps" v-model="model.date" date-format="dd/MM/yyyy">
            <template #dateIcon>
              <v-icon>fa-calendar</v-icon>
            </template>
            <template #timeIcon>
              <v-icon>fa-clock</v-icon>
            </template>
          </v-datetime-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-textarea rows="2" v-model="model.foods" label="Thực phẩm"></v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea rows="2" v-model="model.drinks" label="Thức uống"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="model.blood_sugar" label="Đường huyết"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="model.blood_pressure" label="Tăng xông"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea rows="2" v-model="model.notes" label="Ghi chú"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </base-modal-form>
</template>

<script>
import healthCareService from '@/services/healthCareService';
import formMixins from '@/mixins/form-mixins';
export default {
  mixins: [formMixins(healthCareService)],
  components: {
    baseModalForm: () => import('@/components/VForm/BaseModalForm')
  },
  data: function() {
    return {
      dateProps: {
        locale: 'vi-vn'
      }
    };
  }
};
</script>
