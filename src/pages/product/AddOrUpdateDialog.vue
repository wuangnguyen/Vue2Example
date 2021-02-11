<template>
  <v-dialog persistent v-model="isDisplay" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ this.item && this.item.id !== -1 ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm' }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="isValid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field tabindex="1" required :rules="[() => !!item.name || 'Nhập tên sản phẩm']" v-model="item.name" label="Tên sản phẩm"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-money tabindex="2" label="Đơn giá" v-model="item.price" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field tabindex="3" required :rules="[() => !!item.unit || 'Nhập đơn vị tính']" label="Đơn vị tính" v-model="item.unit" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea tabindex="4" rows="3" v-model="item.notes" label="Ghi chú"></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tabindex="6" color="blue" text @click="close(true)">
          Hủy
        </v-btn>
        <v-btn tabindex="5" color="primary" @click="save">
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
import productService from '@/services/productService';
import Vue from 'vue';
export default {
  props: ['product'],
  components: {
    vMoney: () => import('@/components/VMoney')
  },
  data: function() {
    return {
      isDisplay: true,
      item: this.$props.product,
      isValid: true
    };
  },
  methods: {
    close(value) {
      this.$emit('close', value);
    },
    save() {
      this.isValid = this.$refs.form.validate();
      if (!this.isValid) {
        return;
      }
      if (this.item.id == -1) {
        this.handleAdd();
      } else {
        this.handleUpdate();
      }
    },
    handleAdd() {
      let self = this;
      productService
        .create(self.item)
        .then(() => {
          Vue.$toast.success('Thêm thành công');
          self.close();
        })
        .catch(() => {
          Vue.$toast.error('Sản phẩm đã tồn tại');
        });
    },
    handleUpdate() {
      let self = this;
      productService
        .update(this.product.id, this.item)
        .then(() => {
          Vue.$toast.success('Cập nhật thành công');
          self.close();
        })
        .catch(() => {
          Vue.$toast.error('Sản phẩm đã tồn tại');
        });
    }
  }
};
</script>
