<template>
  <div class="login" style="background-color: rgb(236, 236, 236);">
    <ToastMessages></ToastMessages>
    <div class="container vh-100">
      <form 
        class="form-floating row h-100 align-items-center justify-content-center"
        @submit.prevent="login"
      >
        <div class="col-md-5">
          <div class="d-flex justify-content-center mb-3">
            <router-link class="navbar-brand text-secondary" to="/">
              <img src="@/assets/images/logo.gif" alt="TheNo9-LOGO" style="width: 160px;"/>
            </router-link>
          </div>
          <div class="h3 mb-4 text-center">請先登入</div>
          <div class="mb-3">
            <label for="floatingInputInvalid">Email address</label>
            <input 
              type="email" 
              class="form-control" 
              id="floatingInputInvalid" 
              placeholder="name@example.com"
              v-model="user.username"
              required
              autofocus
            >
          </div>
          <div class="mb-4">
            <label for="floatingInputInvalid2">Password</label>
            <input 
              type="password" 
              class="form-control" 
              id="floatingInputInvalid2" 
              placeholder="請輸入密碼" 
              v-model="user.password"
              required
            >
          </div>
          <div class="text-center">
            <button type="submit" class="w-50 btn btn-secondary">登入</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="d-flex justify-content-center w-100">
    <Alert v-if="isShowAlert" :customClass="alertClass" :content="alertMsg" />
  </div>
</template>

<script>
import emitter from '@/methods/eventBus';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  data() {
    return {
      isLoading: false,
      isShowAlert: false,
      alertMsg: '',
      alertClass: 'alert-success',
      user: {},
      tips: {
        data: {
          success: false,
          message: '登入失敗，請重新登入。',
        },
      },
    };
  },
  components: {
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  inject: ['$httpMessageState'],
  methods: {
    login() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      this.isLoading = true;
      this.$http.post(api, this.user).then((response) => {
        const { token, expired } = response.data;
        document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
        this.isLoading = false;
        this.$router.push('/admin');
      }).catch(() => {
        this.isLoading = false;
        this.$httpMessageState(this.tips, '登入');
      });
    },
    checkLogin() {
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http.post(api)
      .then((response) => {
        if(response.data.success) {
          this.isShowAlert = true;
          this.alertClass = 'alert-warning';
          this.alertMsg = '你已登入! 即將轉頁至後台';
          setTimeout(() => {
            this.$router.push('/admin');
          }, 1500);
        } else { 
          // ...
        }
      })
      .catch(() => {
        this.$httpMessageState(this.tips, '登入');
      })
    },
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
};
</script>