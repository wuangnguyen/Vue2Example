<template>
  <v-card class="px-4">
    <v-card-text>
      <h2 class="py-4 text-center">Đăng nhập</h2>
      <v-form ref="loginForm" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-text-field name="email" v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              name="password"
              v-model="loginPassword"
              :append-icon="show1 ? 'fa fa-eye-slash' : 'fa fa-eye'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              label="Mật khẩu"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
            <v-btn color="primary" :disabled="!valid" @click="validate"> Đăng nhập </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import $ from 'jquery';
import identity from '@/helpers/identity-helper';
import Vue from 'vue';
export default {
  data: function() {
    return {
      valid: true,
      loginPassword: '',
      loginEmail: '',
      loginEmailRules: [v => !!v || 'Required', v => /.+@.+\..+/.test(v) || 'E-mail không đúng định dạng'],
      show1: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    };
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        identity
          .login(this.loginEmail, this.loginPassword)
          .then(() => {
            this.$router.replace({ path: '/' });
          })
          .catch(err => {
            console.log(err);
            switch (err.code) {
              case 'auth/wrong-password':
                Vue.$toast.error('Mật khẩu không đúng');
                break;
              case 'auth/user-not-found':
                Vue.$toast.error('Email không không đúng');
                break;
              default:
                break;
            }
          });
      }
    }
  },
  created() {
    identity.logout();
  },
  mounted() {
    $("input[name='email'], input[name='password']")
      .prev()
      .addClass('v-label--active');
  }
};
</script>
