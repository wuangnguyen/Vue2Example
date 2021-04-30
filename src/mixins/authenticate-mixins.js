import identity from '@/helpers/identity-helper';
export default {
  methods: {
    loginEmail() {
      return identity.currentUser();
    },
    isLoggedIn() {
      return identity.isAuthenticated();
    },
    logOut() {
      identity.logout().then(() => {
        this.$router.replace({ path: '/login' });
      });
    },
    changePassword() {
      this.$router.push({ path: '/change-password' });
    }
  }
};
