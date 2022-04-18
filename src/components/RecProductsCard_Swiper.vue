<template>
  <div class="pt-3 pb-5">
    <swiper
      :options="swiperOptions"
      :breakpoints="breakpoints"
      navigation
      :pagination="{ clickable: true }"
    >
      <swiper-slide v-for="product in filterProducts" :key="product.id">
        <div class="res-product">
          <ul class="d-flex flex-grow-1">
            <li class="d-flex flex-grow-1" style="width: 279px; height: 350px;">
              <img :src="product.imageUrl" alt="">
              <div class="menu-detail">
                <div class="set-in-center">
                  <!-- 進入商品詳細頁面 -->
                  <a href="#" @click.prevent="viewProduct(product.id)">
                    <div class="title mb-2 fw-bolder">{{ product.title }}</div>
                    <p class="text-secondary">NT$ <span>{{ product.price }}</span> </p>
                  </a>
                </div>
                <button 
                  type="button"
                  @click.prevent="getCart(product.id)"
                >
                  <i class="bi bi-plus fs-1 text"></i>
                </button>
              </div>
            </li>
          </ul>
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
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    // 限制項目筆數
    limitCount: {
      type: Number,
      default() {
        return 4;
      },
    },
    // 篩選產品
    filterProduct: {
      type: Object,
      default() {
        return {
          name: '',
          category: '',
        };
      },
    },
  },
  watch: {
    // 監聽是否有變動推薦產品
    filterProduct() {
      this.getProducts();
    },
  },
  data() {
    return {
      // 推薦產品
      products: [],
      filterProducts: [],
      recStr: '手提包',
      // 產品數量
      productCount: 1,
      // Swiper
      swiperOptions: {
        pagination: '.swiper-pagination',
      },
      breakpoints: {
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    };
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    // 取得推薦清單
    getProducts() {
      const api =`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(api)
        .then((response) => {
          if (response.data.success) {
            this.products = response.data.products;
            // 判段是否有相關產品類別
            // recStrCategory 就是如果有內容救回傳內容，如果沒有就回傳空值
            // 雖然在這裡判斷了這個商品是否有類別，但還要判斷這個商品是否為商品本身，不會重複推薦商品
            const recStrCategory = this.filterProduct.category !== '' ? this.filterProduct.category : '';
            // 取得推薦產品
            this.productCount = 0;
            this.filterProducts = [];

            this.products.forEach((item) => {
              if (recStrCategory !== '') {
                //取得不包含產品本身的推薦產品（同類別）
                // 這個項目的 id 不等於 這些產品的 id 和 這個項目的類別，等同於這些項目的類別
                if (item.id !== this.filterProduct.id && item.category === recStrCategory) {
                  // 產品數量小於限制項目筆數，產品數量就 +1
                  if (this.productCount < this.limitCount) {
                    const tempItem = { ...item };
                    this.filterProducts.push(tempItem);
                    this.productCount += 1;
                  }
                }
                // 判斷 title 是否包含 recStr 的值
              } else if (item.title.includes(this.recStr)) {
                // 產品筆數限制
                if (this.productCount < this.limitCount) {
                  const tempItem = { ...item };
                  this.filterProducts.push(tempItem);
                  this.productCount += 1;
                }
              }
            });
          } else {
            this.$httpMessageState(response, '取得推薦清單');
          }
        })
        .catch(() => {
          this.$httpMessageState(this.tips, '取得推薦清單');
        });
    },
    // 檢視商品詳細資訊
    viewProduct(productId) {
      this.$router.push(`/product/${productId}`);
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
          alert(response.data.message);
          this.emitter.emit('get-cart');
        } else {
          alert(response.data.message);
        }
      })
    },
  },
  mounted() {
    this.getProducts();
  },
}
</script>