<template>
  <v-dialog max-width="300px" :isDisplay="isDisplay">
    <template #title>{{ title }}</template>
    <template #footer>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="isDisplay = false">Hủy</v-btn>
      <v-btn color="blue darken-1" text @click="confirm">Đồng ý</v-btn>
    </template>
  </v-dialog>
</template>
<script>
import dialogMixins from '@/mixins/dialog-mixins';
export default {
  props: {
    title: {
      type: String,
      default: 'Xóa dòng này?'
    }
  },
  mixins: [dialogMixins],
  components: {
    vDialog: () => import('./VDialog')
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    }
  }
};
</script>
