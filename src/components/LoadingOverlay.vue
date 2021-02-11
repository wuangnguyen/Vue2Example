<template>
  <v-overlay :value="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>
<script>
import { EventBus } from '@/plugins/event-bus.js';
export default {
  data: () => ({
    loading: false
  }),
  created() {
    EventBus.$on('showLoading', () => (this.loading = true));
    EventBus.$on('hideLoading', () => (this.loading = false));
  }
};
</script>
<style scoped>
.v-overlay {
  z-index: 99999 !important;
}
</style>
