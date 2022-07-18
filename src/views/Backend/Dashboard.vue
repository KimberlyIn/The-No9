<template>
  <div>
    <Navbar/>
    <ToastMessages></ToastMessages>
    <!-- 決定是否呈現畫面 ( 是否登入 ) -->
    <router-view v-if="status"/>
  </div>
  <!-- Alert提示 -->
  <div class="d-flex justify-content-center w-100">
    <Alert v-if="!status" :customClass="alertClass" :content="alertMsg" />
  </div>
</template>

<script>
import emitter from '@/methods/eventBus';
import Navbar from '@/components/Backend/Navbar.vue';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  data() {
    return {
      // 決定是否呈現畫面 ( 是否登入 ) 
      status: false,
      alertClass: 'alert-danger',
      alertMsg: '驗證中，請稍後...',
    };
  },
  components: {
    Navbar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  inject: ['$httpMessageState'],
  methods: {
    checkLogin() {
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http.post(api)
      .then((response) => {
        if (response.data.success) {
          this.status = true;
        } else {
          this.status = false;
          this.alertMsg = '授權無效，請先登入!';
          this.$httpMessageState(response, '授權');
          this.$httpMessageState(response, '授權');
          setTimeout(() => {
            this.$router.push('/login');
          }, 1000);
        }
      })
      .catch(() => {});
    },
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
}
</script>