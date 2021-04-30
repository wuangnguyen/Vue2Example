import { EventBus } from '@/plugins/event-bus.js';
export default {
  currentUser: () => {
    return localStorage.getItem('currentUser');
  },
  isAuthenticated: () => {
    return localStorage.getItem('currentUser') != null;
  },
  login: (loginEmail, loginPassword) => {
    return new Promise((resolve, reject) => {
      EventBus.$emit('showLoading');
      window.firebase
        .auth()
        .signInWithEmailAndPassword(loginEmail, loginPassword)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          EventBus.$emit('hideLoading');
        });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      EventBus.$emit('showLoading');
      window.firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('currentUser');
          resolve();
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          EventBus.$emit('hideLoading');
        });
    });
  },
  changePassword: password => {
    return new Promise((resolve, reject) => {
      EventBus.$emit('showLoading');
      var user = window.firebase.auth().currentUser;
      if (user == null) {
        return;
      }
      user
        .updatePassword(password)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          EventBus.$emit('hideLoading');
        });
    });
  }
};
