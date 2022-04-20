<template>
  <div class="product div-front-top">
    <div class="header w-100 py-5"></div>
    <div class="container pt-5">
      <div class="row pb-5">
        <div class="col-md-6 col-md-6-carousel" v-if="product.id">
          <div>
            <!-- 商品圖片 -->
            <div class="row">
              <div class="col-12 pb-3">
                <div
                  style="height: 400px; background-size: cover; background-position: center"
                  :style="{ 'background-image': `url(${enterImage})` }">
                </div>
              </div>
              <!-- :class="img === enterImage ? 'active' : ''"
                  如果點選到 enterImage 就回傳 active，如果沒有點選到，救回傳空字串 -->

              <!-- @mouseover="enterImage = img" 滑鼠監聽 -->
              <div class="col-4"
                role="button"
                v-for="(img, key) in product.imagesUrl"
                :key="key"
                :class="img === enterImage ? 'active' : ''"
                @mouseover="enterImage = img"
                @click="enterImage = img"
              >
                <div
                  style="height: 100px; background-size: cover; background-position: center" 
                  :style="{ 'background-image': `url(${img})` }">
                </div>
              </div>
            </div>
            <!-- 商品圖片 -->
          </div>
        </div>
        <div class="col-md-6 mobile-top">
          <div class="mb-2 fs-6">
            <span>首頁</span>
            &nbsp;/&nbsp;
            <span>精緻皮革</span>
            &nbsp;/&nbsp;
            <span>手提包</span>
            <!-- <router-link to="/">首頁</router-link>
            &nbsp;/&nbsp;
            <a href="#">精緻皮革</a>
            &nbsp;/&nbsp;
            <a href="#">手提包</a> -->
          </div>
          <div>
            <h3 class="mb-4 fw-bolder">{{ product.title }}</h3>
            <div class="price mb-4">
              <div class="fs-3 fw-bold" v-if="!product.id">NT$ {{ product.origin_price }} / {{ product.unit }}</div>
              <del class="fs-6 text-secondary" v-if="product.id">原價 NT$ {{ product.origin_price }}</del>
              <div class="fs-3 fw-bold" v-if="product.id">NT$ {{ product.price }} / {{ product.unit }}</div>
            </div>
            <p class="mb-2 text-secondary">{{ product.description }}</p>
            <p class="mb-5 text-secondary">
              {{ product.content }}
            </p>
          </div>
          <div class="get-cart">
            <div class="row d-flex mb-4">
              <div class="col-4 col-4-input d-flex me-4">
                <div class="input-group-prepend border border-end-0">
                  <input
                    type="text"
                    class="form-control border-0 text-center my-auto shadow-none bg-light"
                    placeholder=""
                    v-model.number="cart.quantity"
                    disabled
                  />
                </div>
                <div class="input-group-append">
                  <div class="border">
                    <button
                      class="btn btn-outline-secondary border-0 py-0 px-1 rounded-0"
                      type="button"
                      @click.prevent="addNumber"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  <div class="border">
                    <button
                      class="btn btn-outline-secondary border-0 rounded-0 py-0 px-1"
                      type="button"
                      :disabled="!cart.isDash"
                      @click.prevent="dashNumber"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <button 
                  class="btn btn-lg rounded-0 fs-6"
                  type="button"
                  @click="addToCart"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
          <div>
            <p><span>類型：</span>{{ product.category }}</p>
          </div>
        </div>
      </div>
      <!-- 商品左右換頁 -->
      <!-- <div class="row mb-5">
        <div class="prev col-6">
          <div>
            <button type="button" class="btn btn-outline-secondary rounded-0 py-1 px-5">
              <i class="bi bi-chevron-left"></i>
              prev 
            </button>
          </div>
        </div>
        <div class="next col-6 text-end">
          <div>
            <button type="button" class="btn btn-outline-secondary rounded-0 py-1 px-5">
              next
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div> -->
      <!-- 商品左右換頁 -->
    </div>
    <ProductIllustrate />
    <div class="container">
      <div class="pt-5">
        <h4>你可能會喜歡的商品.....</h4>
        <div>
          <RecProductsCardSwiper :limitCount="999" :filterProduct="recProduct" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script>
import ProductIllustrate from '@/components/ProductIllustrate.vue';
import RecProductsCardSwiper from '@/components/RecProductsCard_Swiper.vue';
import Footer from '@/components/Footer.vue';

export default {
  data() {
    return {
      product: {},
      productId: '',
      cart: {
        quantity: 1,
      },
      enterImage: '',
      category: '',
      recProduct: {
        id: 0,
        name: '',
        category: '',
      },
    };
  },
  inject: ['emitter', '$httpMessageState'],
  components: {
    ProductIllustrate,
    RecProductsCardSwiper,
    Footer,
  },
  watch: {
    // 監聽 route 參數變化 (切換推薦產品)
    $route() {
      // 取得產品ID
      this.productId = this.$route.params.productId;
      if (this.productId !== undefined) {
        this.getProduct();
      }
    },
  },
  methods: {
    // 取得單一商品
    getProduct() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.productId}`;
      this.$http.get(api)
      .then((response)=>{
        if(response.data.success) {
          this.productId = response.data.product;
          // 取得單一產品
          const tempItem = { ...response.data.product };
          this.product = { ...tempItem };
          // 取得推薦產品資訊
          this.recProduct = {
            id: this.product.id,
            name: this.product.title,
            category: this.product.category,
          };
          // 取得商品圖片
          const { 0: img } = this.product.imagesUrl;
          this.enterImage = img;
        } else {
          // 查無產品時，導向404
          this.$router.push('/product');
          this.$httpMessageState(response, '取得產品');
        }
      })
      .catch((error)=>{
        alert(error.response.data.message);
      })
    },
    // 加入購物車
    addToCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: this.product.id,
        qty: this.cart.quantity,
      };
      this.$http.post(api, { data: cart })
      .then(() => {
        alert('已加入購物車')
        this.cart.quantity = 1;
        // 取得訂單清單
        this.emitter.emit('get-cart');
      })
      .catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
    // 減少數量 (等於 1 時不能減)
    dashNumber() {
      if (this.cart.quantity > 1) {
        this.cart.quantity -= 1;
        this.cart.isDash = this.cart.quantity > 1;
      }
    },
    // 增加數量
    addNumber() {
      this.cart.quantity += 1;
      this.cart.isDash = true;
    },
  },
  mounted() {
    // 取得產品ID
    this.productId = this.$route.params.productId;
    // 載入單一產品
    this.getProduct();
  },
};
</script>

