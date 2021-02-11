<template>
  <h1>{{ this.pageTitle }}</h1>
</template>
<script>
export default {
  computed: {
    pageTitle() {
      let titleMeta = this.$route.matched.find(record => record.meta.title);
      if (titleMeta && titleMeta.meta.title) {
        return titleMeta.meta.title;
      }
      return '';
    }
  }
};
</script>
<style lang="scss" scoped>
h1 {
  opacity: 0.8;
}
</style>
