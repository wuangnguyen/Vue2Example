<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Product' }">
          <v-icon transition="scale-transition" size="40" class="pr-3">fa-dollar-sign</v-icon>
        </router-link>
      </div>

      <router-link class="px-2" :to="{ name: 'Product' }"><v-btn outlined>Sản phẩm</v-btn></router-link>
      <router-link class="px-2" :to="{ name: 'PaymentHistory' }"><v-btn outlined>Thu chi</v-btn></router-link>
      <router-link class="px-2" :to="{ name: 'HealthCare' }"><v-btn outlined>Sức khỏe</v-btn></router-link>
      <router-link class="px-2" :to="{ name: 'Task' }"><v-btn outlined>Danh mục công việc</v-btn></router-link>
      <router-link class="px-2" :to="{ name: 'User' }"><v-btn outlined>Chúng chùa</v-btn></router-link>
      <v-spacer></v-spacer>
      <v-btn outlined @click="isLoggedIn() ? logOut() : logIn()">{{ isLoggedIn() ? 'Đăng xuất' : 'Đăng nhập' }}</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row class="mt-1" no-gutters>
          <v-col>
            <router-view name="subHeader"> </router-view>
          </v-col>
        </v-row>
        <v-row>
          <v-col> <router-view> </router-view> </v-col>
        </v-row>
      </v-container>
    </v-main>
    <loading-overlay></loading-overlay>
  </v-app>
</template>
<script>
import authenticateService from '@/mixins/authenticate-mixins';
export default {
  components: {
    loadingOverlay: () => import('@/components/Overlay/LoadingOverlay')
  },
  mixins: [authenticateService]
};
</script>
