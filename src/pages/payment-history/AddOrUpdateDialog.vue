<template>
  <v-dialog persistent v-model="isDisplay" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ this.paymentHistoryItem && this.paymentHistoryItem.id !== -1 ? 'Cập nhật thu/chi' : 'Thêm mới thu/chi' }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="isValid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select v-model="paymentHistoryItem.category_id" :items="transactionTypes" item-text="name" item-value="id" label="Loại"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="computedDateFormatted" label="Ngày" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker locale="vi-vn" v-model="paymentHistoryItem.date" @input="menu = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-money label="Số tiền" v-model="paymentHistoryItem.amount" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="paymentHistoryItem.created_by" label="Người thực hiện"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea rows="2" v-model="paymentHistoryItem.notes" label="Ghi chú"></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="close(true)">
          Hủy
        </v-btn>
        <v-btn color="primary" @click="save">
          <v-icon left small>
            fa-save
          </v-icon>
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import paymentHistoryService from '@/services/paymentHistoryService';
import Vue from 'vue';
export default {
  props: ['paymentHistoryItem'],
  components: {
    vMoney: () => import('@/components/VMoney/VMoney')
  },
  data: function() {
    return {
      isDisplay: true,
      menu: false,
      isValid: true,
      transactionTypes: [
        { id: 3, name: 'Thu' },
        { id: 4, name: 'Chi' }
      ]
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.paymentHistoryItem.date);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    close(value) {
      this.$emit('close', value);
    },
    save() {
      this.isValid = this.$refs.form.validate();
      if (!this.isValid) {
        return;
      }
      if (this.paymentHistoryItem.id == -1) {
        this.handleAdd();
      } else {
        this.handleUpdate();
      }
    },
    handleAdd() {
      let self = this;
      paymentHistoryService
        .create(self.paymentHistoryItem)
        .then(() => {
          Vue.$toast.success('Thêm thành công');
          this.$emit('modified');
          self.close();
        })
        .catch(() => {
          Vue.$toast.error('Thêm không thành công');
        });
    },
    handleUpdate() {
      let self = this;
      paymentHistoryService
        .update(self.paymentHistoryItem)
        .then(() => {
          Vue.$toast.success('Cập nhật thành công');
          this.$emit('modified');
          self.close();
        })
        .catch(() => {
          Vue.$toast.error('Cập nhật không thành công');
        });
    }
  }
};
</script>
