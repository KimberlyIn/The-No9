<template>
  <h2 class="fs-4">你可能會喜歡的商品....</h2>
  <div class="pt-3 pb-5">
    <swiper
      class="products p-0 mb-5 "
      ref="swiper"
      :breakpoints="{
        '640': {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
    >
      <swiper-slide v-for="product in products" :key="product.id">
        <div class="menu">
          <div class="product-component product-col top" @click="toTop">
            <div 
              class="pos-rel product-img"
              style="height: 300px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${product.imageUrl})`}"
              @click="viewProduct(product.id)"
              role="button"
            >
              <div class="dark-bg">
                <small class="px-2 py-2">查看內容</small>
              </div>
              <span class="sale" v-if="product.price < product.origin_price">On Sale !!</span>
              
            </div>
            <div class="text-center my-4">
              <h6 class="fw-bold">{{ product.title }}</h6>
              <div>
                <div class="fs-5">
                  <small :class="product.price < product.origin_price ? 'del' : ''"
                    >$ {{ $cash(product.origin_price) }} NTD</small
                  >
                </div>
                <div class="price mb-3">
                  <span v-if="product.price < product.origin_price"
                    >$ {{ $cash(product.price) }}&nbsp;</span
                  >
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-primary mb-4"
                  @click.prevent="getCart(product.id)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div> 
        </div>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script>
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import Swiper2, {Autoplay} from 'swiper';
Swiper2.use([Autoplay]);

export default {
  inject: ['emitter', '$httpMessageState'],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // 推薦產品
      products: [],
      modules: [Autoplay],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    // 取得推薦清單
    getProducts() {
      const api =`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(api)
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.products;
          } else {
            this.$httpMessageState(response, '取得推薦清單');
          }
        })
        .catch(() => {
          this.$httpMessageState(this.tips, '取得推薦清單');
        });
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
          this.$httpMessageState(response, '加入購物車');
        }
      })
    },
    // 檢視商品詳細資訊
    viewProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
    toTop() {
      document.documentElement.scrollTop = 0;

      this.emitter.emit('page-loading', true);
      setTimeout(() => {
        this.emitter.emit('page-loading', false);
      }, 1000);
    },
  },
  
}
</script>

<style>
.go-to-top {
  height: 5000px;
}
</style>