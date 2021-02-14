<template>
  <base-modal-form :isDisplay.sync="isDisplay" @submit="submit">
    <template #title>{{ product.id === -1 ? 'Thêm mới sản phẩm' : 'Cập nhật sản phẩm' }}</template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field tabindex="1" required :rules="[() => !!product.name || 'Nhập tên sản phẩm']" v-model="product.name" label="Tên sản phẩm"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-money tabindex="2" label="Đơn giá" v-model="product.price" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field tabindex="3" required :rules="[() => !!product.unit || 'Nhập đơn vị tính']" label="Đơn vị tính" v-model="product.unit" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea tabindex="4" rows="3" v-model="product.notes" label="Ghi chú"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </base-modal-form>
</template>

<script>
import productService from '@/services/productService';
import Vue from 'vue';
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {
          id: -1,
          name: '',
          unit: '',
          price: 0
        };
      }
    }
  },
  data() {
    return {
      isDisplay: false
    };
  },
  components: {
    vMoney: () => import('@/components/VMoney/VMoney'),
    baseModalForm: () => import('@/components/VForm/BaseModalForm')
  },
  watch: {
    isDisplay(value) {
      if (value === false) {
        this.$emit('close');
      }
    }
  },
  methods: {
    showDialog() {
      this.isDisplay = true;
    },
    hideDialog() {
      this.isDisplay = false;
    },
    submit() {
      if (this.product.id === -1) {
        this.handleAdd();
      } else {
        this.handleUpdate();
      }
    },
    handleAdd() {
      productService
        .create(this.product)
        .then(() => {
          Vue.$toast.success('Thêm thành công');
          this.hideDialog();
        })
        .catch(() => {
          Vue.$toast.error('Sản phẩm đã tồn tại');
        });
    },
    handleUpdate() {
      productService
        .update(this.product.id, this.product)
        .then(() => {
          Vue.$toast.success('Cập nhật thành công');
          this.hideDialog();
        })
        .catch(() => {
          Vue.$toast.error('Sản phẩm đã tồn tại');
        });
    }
  }
};
</script>
