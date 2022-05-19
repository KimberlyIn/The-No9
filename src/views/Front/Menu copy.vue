<template>
  <!-- <Navbar /> -->
  <div class="div-front-top">
    <div class="menu-body py-4 animate__animated animate__fadeInUp">
      <div class="row row-cols-4 products d-flex flex-wrap mx-5">
        <ul 
          class="d-flex flex-grow-1"
          v-for="item in products" :key="item.id"
        >
          <li class="d-flex flex-grow-1">
            <img :src="item.imageUrl" alt="">
            <div class="menu-detail">
              <div class="set-in-center">
                <!-- 進入商品詳細頁面 -->
                <a class="text-decoration-none" href="#" @click.prevent="viewProduct(item.id)">
                  <div class="title mb-2 fw-bolder">{{ item.title }}</div>
                  <p class="text-secondary">NT$ <span>{{ item.price }}</span> </p>
                </a>
              </div>
              <button 
                type="button"
                @click.prevent="getCart(item.id)"
              >
                <i class="bi bi-plus fs-1 text"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  inject: ['emitter', '$httpMessageState'],
  data() {
    return {
      products: [],
      cart: {
        quantity: 1,
      },
      // 篩選同類商品
      filterProducts: [],
      tips: {
        data: {
          success: false,
          message: '糟糕，目前沒有可以更新的商品喔。',
        },
      },
    };
  },
  methods: {
    // 取得所有商品
    getProducts() {
      // const api = `${this.baseAPI}/products`;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`;
      this.$http
      .get(api)
      .then((response) => {
        if(response.data.success) {
          this.products = response.data.products;
        } else {
          this.$httpMessageState(response, '商品取得');
        }
      })
      .catch(() => {
        this.$httpMessageState(this.tips, '商品清單更新');
      })
    },
    // 加入購物車
    getCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty,
      };
      this.$http
      .post(api, { data: cart })
      .then((response) => {
        if(response.data.success){
          this.$httpMessageState(response, '加入購物車');
          this.emitter.emit('get-cart');
        } else {
          alert(response.data.message);
        }
      })
    },
    // 檢視商品詳細資訊
    viewProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
  },
  mounted() {
    this.getProducts();
  }
};
</script>