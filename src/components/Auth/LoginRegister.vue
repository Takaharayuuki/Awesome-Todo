<template>
<form @submit.prevent="submitForm">
  <div class="row q-mb-lg">
    <q-banner class="bg-grey-3 col">
      <template v-slot:avatar>
        <q-icon
        name="account_circle"
        color="primary" />
      </template>
      {{ this.tab == 'login' ? bannerText.login : bannerText.register }}
    </q-banner>
  </div>
  <div class="row q-mb-sm">
    <q-input
    class="col"
    outlined
    ref="email"
    v-model="formData.email"
    :rules="[ val => isValidEmailAddress(val) || 'メールアドレスを入力してください']"
    hint="メールアドレスを入力してください"
    lazy-rules
    label="メールアドレス"
    stack-label />
  </div>
  <div class="row q-mb-md">
    <q-input
    class="col"
    ref="password"
    outlined
    v-model="formData.password"
    :rules="[ val => val.length >= 6 || 'パスワードは6文字以上で入力してください']"
    type="password"
    label="パスワード"
    hint="パスワードは6文字以上で入力してください"
    lazy-rules
    stack-label />
  </div>
  <div class="row">
    <q-space />
    <q-btn
      type="submit"
      color="primary"
      >{{ this.tab == 'login' ? 'ログイン' : '新規会員登録' }}</q-btn>
  </div>
</form>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    props: ['tab'],
    data() {
      return {
        formData: {
          email: '',
          password: '',
        },
        bannerText: {
          login: 'アカウントをお持ちの方は、登録時に入力されたメールアドレスとパスワードを入力してください',
          register: 'お客様の情報をご入力のうえ「新規会員登録」を押してください。'
        },
      }
    },
    methods: {
      ...mapActions('auth', ['registerUser', 'loginUser']),
      submitForm() {
        this.$refs.email.validate()
        this.$refs.password.validate()
        if(!this.$refs.email.hasError && !this.$refs.password.hasError) {
          if(this.tab == 'login') {
            this.loginUser(this.formData)
          } else {
           this.registerUser(this.formData)
          }
        }
      },
      isValidEmailAddress(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase());
      }
    },
    // filters: {
    //   titleCase(value) {
    //     return value.charAt(0).toUpperCase() + value.slice(1)
    //   }
    // }
  }
</script>
