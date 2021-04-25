import identity from '@/helpers/identity-helper';
export default {
  methods: {
    isLoggedIn() {
      return identity.isAuthenticated();
    },
    logOut() {
      localStorage.removeItem('isAuthenticated');
      identity.logout().then(() => {
        this.$router.replace({ path: '/login' });
      });
    },
    changePassword() {
      this.$router.push({ path: '/change-password' });
    }
  }
};
