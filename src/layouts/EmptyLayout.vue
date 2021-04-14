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
  </v-app>
</template>
<style lang="scss">
.account-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
