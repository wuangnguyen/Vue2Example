<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Product' }">
          <v-icon transition="scale-transition" size="40" class="pr-3">fa-dollar-sign</v-icon>
        </router-link>
      </div>
    </v-app-bar>
    <v-main>
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col class="account-container"> <router-view> </router-view> </v-col>
        </v-row>
      </v-container>
    </v-main>
    <loading-overlay></loading-overlay>
  </v-app>
</template>
<script>
export default {
  components: {
    loadingOverlay: () => import('@/components/Overlay/LoadingOverlay')
  }
};
</script>
<style lang="scss" scoped>
.account-container {
  max-width: 600px;
  margin: 0 auto;
}
.v-main {
  background-image: linear-gradient(to top, #6a85b6 0%, #bac8e0 100%);
}
</style>
