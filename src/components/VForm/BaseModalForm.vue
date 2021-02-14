<template>
  <v-dialog persistent :value="!isHide" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline"><slot name="title"/></span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <slot></slot>
        </v-form>
      </v-card-text>
      <v-card-actions>
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isDisplay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isHide: true,
      isFormValid: false
    };
  },
  watch: {
    isDisplay(value) {
      this.isHide = !value;
    }
  },
  methods: {
    close() {
      this.isHide = true;
      this.$emit('update:isDisplay', false);
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
