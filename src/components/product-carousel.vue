<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-6-carousel" v-if="product.id">
          <div>
            <!-- 商品輪播 -->
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div 
                  class="carousel-item active"
                  v-for="(img, key) in product.imagesUrl" :key="key"
                >
                  <img :src="product.imagesUrl" class="d-block w-100" alt="">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <!-- 商品輪播 -->
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <h3>{{ product.title }}</h3>
            <div class="price">NT$ {{ product.price }}</div>
            <span>{{ product.description }}</span>
            <p>
              {{ product.content }}
            </p>
          </div>
          <div>
            <span>顏色</span>
            <select class="form-select" aria-label="Default select example">
              <option selected>請選擇顏色</option>
              <option value="1">天藍</option>
              <option value="2">粉</option>
              <option value="3">黑</option>
              <option value="4">咖啡</option>
              <option value="5">淺灰</option>
            </select>
          </div>
          <div class="d-flex">
            <div class="col-4 d-flex">
              <input 
                type="text" 
                class="form-control rounded-none border-end-0" 
                placeholder=""
                disabled
              >
              <div class="input-group w-50 border">
                <div class="input-group-prepend border-bottom">
                  <button 
                    type="button" 
                    class="btn"
                  >
                    <i class="bi bi-dash"></i>
                  </button>
                </div>
                <div class="input-group-append">
                  <button 
                    type="button" 
                    class="btn"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-6">
              <button 
                type="button"
                @click="addToCart"
              >
                加入購物車
              </button>
            </div>
          </div>
          <div>
            <p><span>類型：</span>{{ product.category }}</p>
          </div>
        </div>
      </div>
      <!-- 商品資訊 -->
      <div>
        <div>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">資訊</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">規格</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">注意事項</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
          </div>
        </div>
      </div>
      <!-- 商品輪播 -->
      <div>
        <h4>你可能會喜歡的商品.....</h4>
        <div id="carouselExampleControls" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <!-- 1 -->
              <div>
                <ul>
                  <li>

                    <div>
                      <img src="" alt="">
                    </div>

                    <div>
                      <i class="bi bi-plus fs-1 text"></i>
                    </div>

                    <div>
                      <h5>包包</h5>
                      <span>NT$ 5500</span>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- 2 -->
            </div>
            <div class="carousel-item">
              456
            </div>
            <div class="carousel-item">
              789
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <!-- 商品左右換頁 -->
      <div>
        <div class="prev">
          <a href="#">商品名稱 <i class="bi bi-chevron-right"></i></a>
        </div>
        <div class="next">
          <a href="#">商品名稱 <i class="bi bi-chevron-left"></i></a>
        </div>
      </div>
      <!-- 商品左右換頁 -->
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      product: {},
      productId: '',
      cart: {
        quantity: 1,
      },
      // recProduct: {
      //   id: 0,
      //   name: '',
      //   category: '',
      // },
    };
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
          // this.recProduct = {
          //   id: this.product.id,
          //   name: this.product.title,
          //   category: this.product.category,
          // };
        } else {
          // 查無產品時，導向404
          this.$router.push('/product');
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
        alert('1')
        this.cart.quantity = 1;
        // 取得訂單清單
        this.emitter.emit('get-cart');
      })
      .catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      })
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

<style>
  .col-md-6-carousel {
    height: 500px;
    overflow: hidden;
  }
  .col-md-6-carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #carouselExampleIndicators .carousel-inner {
    height: 500px;
  }
</style>
