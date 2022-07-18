<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          The No.9
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <router-link to="/admin" class="nav-link">產品</router-link>
            <router-link to="/admin/orders" class="nav-link">訂單</router-link>
            <router-link to="/admin/coupons" class="nav-link">優惠券</router-link>
            <!-- to="/admin/article" -->
            <router-link to="/admin/articles" class="nav-link">貼文</router-link>
            <a href="#" @click.prevent="logout" class="nav-link">登出</a>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  inject: ['emitter', '$httpMessageState'],
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.$http.post(api)
      .then((response) => {
        this.$httpMessageState(response, '登出');
        if (response.data.success) {
          this.$router.push('/login');
        }
      })
      .catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
    
  },
};
</script>