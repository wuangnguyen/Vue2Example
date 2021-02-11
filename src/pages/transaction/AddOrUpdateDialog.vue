<template>
  <v-dialog persistent v-model="isDisplay" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ this.transactionItem && this.transactionItem.id !== -1 ? 'Cập nhật giao dịch' : 'Thêm mới giao dịch' }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="isValid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select v-model="transactionItem.category_id" :items="transactionTypes" item-text="name" item-value="id" label="Loại"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="computedDateFormatted" label="Ngày" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker locale="vi-vn" v-model="transactionItem.date" @input="menu = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field required :rules="[() => !!transactionItem.quantity || 'Nhập số lượng']" label="Số lượng" v-model="transactionItem.quantity" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-textarea rows="3" label="Ghi chú"></v-textarea>
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
import transactionService from '@/services/transactionService';
import Vue from 'vue';
export default {
  props: ['transactionItem'],
  data: function() {
    return {
      isDisplay: true,
      menu: false,
      isValid: true,
      transactionTypes: [
        { id: 1, name: 'Nhập' },
        { id: 2, name: 'Xuất' }
      ]
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.transactionItem.date);
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
      if (this.transactionItem.id == -1) {
        this.handleAdd();
      } else {
        this.handleUpdate();
      }
    },
    handleAdd() {
      let self = this;
      transactionService
        .create(self.transactionItem)
        .then(() => {
          Vue.$toast.success('Thêm thành công');
          this.$emit('transaction-modified');
          self.close();
        })
        .catch(() => {
          Vue.$toast.error('Thêm không thành công');
        });
    },
    handleUpdate() {
      let self = this;
      transactionService
        .update(self.transactionItem)
        .then(() => {
          Vue.$toast.success('Cập nhật thành công');
          this.$emit('transaction-modified');
          self.close();
        })
        .catch(() => {
          Vue.$toast.error('Cập nhật không thành công');
        });
    }
  }
};
</script>
