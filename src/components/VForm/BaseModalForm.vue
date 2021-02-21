<template>
  <v-dialog :isDisplay="isDisplay">
    <template #title><slot name="title"/></template>
    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <slot></slot>
    </v-form>
    <template #footer>
      <v-spacer></v-spacer>
      <v-btn tabindex="6" color="blue" text @click="close">
        Hủy
      </v-btn>
      <v-btn tabindex="5" color="primary" @click="summit">
        <v-icon left small>
          fa-save
        </v-icon>
        Lưu
      </v-btn>
    </template>
  </v-dialog>
</template>
<script>
import dialogMixins from '@/mixins/dialog-mixins';
export default {
  mixins: [dialogMixins],
  components: {
    vDialog: () => import('@/components/VDialog/VDialog')
  },
  data() {
    return {
      isFormValid: false
    };
  },
  methods: {
    close() {
      this.hideDialog();
      this.$emit('close');
    },
    summit() {
      this.isFormValid = this.$refs.form.validate();
      if (!this.isFormValid) {
        return;
      }
      this.$emit('submit');
    }
  }
};
</script>
