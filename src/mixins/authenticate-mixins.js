const passwordKey = 'is_authenticated';
export default {
  methods: {
    logIn() {
      let password = prompt('Password:');
      if (password === 'GX8uNA6Q') {
        localStorage.setItem(passwordKey, true);
        this.reload();
      }
    },
    isLoggedIn() {
      return !!localStorage.getItem(passwordKey);
    },
    logOut() {
      localStorage.removeItem(passwordKey);
      this.reload();
    },
    reload() {
      window.location = window.location.href;
    }
  }
};
