<template>
  <v-card class="px-4">
    <v-card-text>
      <h2 class="py-4 text-center">Đổi mật khẩu</h2>
      <v-form ref="changePasswordForm" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-text-field
              name="newPassword"
              v-model="newPassword"
              :append-icon="show1 ? 'fa fa-eye-slash' : 'fa fa-eye'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              label="Mật khẩu mới"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              name="confirmPassword"
              v-model="confirmPassword"
              :append-icon="show2 ? 'fa fa-eye-slash' : 'fa fa-eye'"
              :rules="[rules.required, rules.passwordMustMatch]"
              :type="show2 ? 'text' : 'password'"
              label="Xác nhận mật khẩu mới"
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex" cols="12" sm="4" xsm="12" align-right>
            <v-btn color="primary" :disabled="!valid" @click="validate"> Đổi mật khẩu </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import Vue from 'vue';
import $ from 'jquery';
import identity from '@/helpers/identity-helper';
export default {
  data: function() {
    return {
      valid: true,
      newPassword: '',
      confirmPassword: '',
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || 'Bắt buộc',
        passwordMustMatch: value => this.newPassword === value || 'Mật khẩu xác nhận không trùng khớp'
      }
    };
  },
  methods: {
    validate() {
      if (this.$refs.changePasswordForm.validate()) {
        identity
          .changePassword(this.newPassword)
          .then(() => {
            identity.logout().then(() => {
              Vue.$toast.success('Đổi mật khẩu thành công, vui lòng đăng nhập lại');
              this.$router.replace({ path: '/login' });
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    $("input[name='newPassword'], input[name='confirmPassword']")
      .prev()
      .addClass('v-label--active');
  }
};
</script>
