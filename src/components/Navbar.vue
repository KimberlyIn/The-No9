<template>
<Loading :active="isLoading"></Loading>
  <div class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light py-4 px-4">
      <div class="container-fluid"> 
        <router-link class="navbar-brand text-secondary" to="/">
          <img src="@/assets/images/logo.gif" alt="TheNo9-LOGO" style="width: 160px;" class="me-3" />
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link pe-4" aria-current="page" href="#">首頁</a>
            <router-link class="nav-link pe-4" to="/menu">精緻皮件</router-link>
            <router-link class="nav-link pe-4" to="/about">關於我們</router-link>
            <router-link class="nav-link pe-4" to="/blog">部落格</router-link>
            <a 
              class="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i class="bi bi-search"></i>
            </a>
            <!-- 搜尋全屏 -->
            <!-- Modal -->
            <div class="modal fade modal-search" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>       
            <!-- 搜尋全屏結束 -->
            <div class="d-flex me-3 fun-bar">
              <a 
                href="#"
                id="nav-cart-btn"
                class="nav-link nav-link-cart"
                data-bs-toggle="offcanvas"
                data-bs-target="#cartBoxId"
                aria-controls="cartBoxId"
                @click.prevent="getCart"
              >
                <i class="bi bi-cart pe-1"></i>
                <!-- 購物車數量 -->
                <span class="cart-quantity" v-if="cart?.carts?.length">{{ cart?.carts?.length }}</span>
              </a>
            </div>
            <!-- 購物車 -->
            <div 
              class="cartBox offcanvas offcanvas-end offcanvas-size" 
              tabindex="-1" 
              id="cartBoxId"
            >
              <div class="offcanvas-header px-4">
                <h5 class="offcanvas-title title">訂單清單</h5>
                <button 
                  type="button"
                  class="close text-reset"
                  data-bs-dismiss="offcanvas"
                >
                  <i class="bi bi-x"></i>
                </button>
              </div>
              <!-- 判斷購物車裡面有沒有商品 -->
              <div 
                class="offcanvas-body d-flex flex-column"
                :class="{ 'd-flex justify-content-center': !cart?.carts?.length }"
              >
                <div 
                  class="d-flex flex-column justify-content-center text-center"
                  v-if="!cart?.carts?.length"
                >
                  <h5 class="pb-2 lh-base fs-5 text text-explain">您的購物車還沒有商品喔，要開始替自己添加精美皮件了嗎？</h5>
                  <router-link to="/menu">
                    <button 
                      class="discolor-button" 
                      type="button" 
                      data-bs-dismiss="offcanvas"
                    >
                      開始購物
                    </button>
                  </router-link>
                </div>
                <!-- 產生訂單 -->
                <ul 
                  class="list-unstyled"
                  v-for="item in cart.carts" :key="item.id"
                  style="width: 447px;"
                >
                  <li class="py-3 d-flex justify-content-between border-bottom">

                    <div class="cartBox-img">
                      <a 
                        href="#"
                        data-bs-dismiss="offcanvas"
                        @click.prevent="viewProduct(item.product_id)"
                      >
                        <img :src="item.product.imageUrl" alt="">
                      </a>
                    </div>
                    <div class="cart-product align-self-start flex-fill ps-3">
                      <h6 class="fw-bold">
                        <a 
                          class="text-dark" 
                          href="#"
                          data-bs-dismiss="offcanvas"
                          @click.prevent="viewProduct(item.product_id)"
                        >{{ item.product.title }}</a>
                      </h6>
                      <div class="qty-price d-flex pe-3">                    
                        <small class="price  text-secondary">$ {{ item.product.price }} / </small>                       
                        <small class="unit ps-1">{{ item.product.unit }}</small>
                      </div>
                      <div class="d-flex align-items-center">
                        <div class="nav-input input-group bg-light rounded me-3 mt-2 border">
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-outline-secondary border-0 rounded-0 py-2 px-1 border-end"
                              type="button"
                              :disabled="item.qty === 1 || loadingStatus.loadingItem === item.id"
                              @click="updateCart(item, -1)"
                            >
                              <i class="bi bi-dash"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            class="form-control border-0 text-center my-auto shadow-none px-1 bg-light fs-6 text-secondary"
                            placeholder=""
                            v-model.number="item.qty"
                            disabled
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-outline-secondary border-0 rounded-0 py-2 px-1 border-start"
                              type="button"
                              :disabled="loadingStatus.loadingItem === item.id"
                              @click="updateCart(item, 1)"
                            >
                              <i class="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div
                            class="spinner-border spinner-border-sm text-muted me-2"
                            role="status"
                            v-if="loadingStatus.loadingItem === item.id"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                          <small class="text-secondary">小計：NT$ {{ item.total }}</small>
                        </div>
                      </div>
                    </div>
                    <!-- @click="removeCartItem(item.id)" 不加 item 沒辦法刪除項目 -->
                    <div class="product-delete align-self-center">
                      <button 
                        type="button" 
                        class="close"
                        @click="removeCartItem(item.id)"  
                      > 
                        <i class="bi bi-x"></i>
                      </button>
                    </div> 
                  </li>
                </ul>        

              </div>
              <div 
                class="offcanvas-footer"
                v-if="cart?.carts?.length"
              >
                <div>
                  <p class="price-text text-end px-4">
                    總 計： NT$ <span class="fs-5 fw-bold">{{ cart.total }}</span></p>
                </div>
                <div class="row py-3">
                  <div class="col-6 pe-1 ps-4 text-end">
                    <button 
                      class="remove-cart discolor-button w-100" 
                      type="button"
                      data-bs-dismiss="offcanvas"
                      @click="removeCartAll('all')"
                    >
                      清空購物車
                    </button>
                  </div>
                  <div class="col-6 col-6 ps-1 pe-4">
                    <router-link to="/order">
                      <button 
                        class="checkout discolor-button-light w-100" 
                        type="button" 
                        data-bs-dismiss="offcanvas"
                      >
                        結帳
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <!-- 購物車 -->
          </div>
        </div>
      </div>
    </nav>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      cart: {},
      loadingStatus: {
        loadingItem: '',
      },
      isLoading: false,
      pageName: '',
      tips: {
        data: {
          success: false,
          message: '糟糕，目前沒有可以更新的商品喔。',
        },
      },
    }
  },
  inject: ['emitter', '$httpMessageState'],
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
      .get(api)
      .then((res) => {
        if(res.data.success) {
          this.cart = res.data.data;
        }
      })
      .catch(() => {
        this.setTips(false, '無法取得商品。');
        this.$httpMessageState(this.tips, '取得商品清單');
      })
    },
    // 更新購物車
    updateCart(item, qty) {
      this.loadingStatus.loadingItem = item.id;
      const computeQty = item.qty + qty;
      if (computeQty >= 1) {
        const cartItem = {
          product_id: item.product.id,
          qty: computeQty,
        };
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
        this.$http
          .put(api, { data: cartItem })
          .then((res) => {
            if (res.data.success) {
              // ...
            } else {
              this.$httpMessageState(this.tips, '商品清單');
            }
            // 更新購物車
            this.loadingStatus.loadingItem = '';
            this.getCart();
          })
          .catch(() => {
            this.loadingStatus.loadingItem = '';
            this.setTips(false, '無法取得商品。');
            this.$httpMessageState(this.tips, '商品清單更新');
          });
      }
    },
    // 刪除購物車單一商品
    removeCartItem(id) {
      this.loadingStatus.loadingItem = id;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api)
      .then((res) => {
        if(res.data.success) {
          // alert(res.data.message);
          this.getCart();
          this.loadingStatus.loadingItem = '';
        } 
      })
      .catch(() => {
        this.loadingStatus.loadingItem = '';
        this.setTips(false, '糟糕，無法刪除商品清單。');
        this.$httpMessageState(this.tips, '商品清單刪除');
      })
    },
    // 刪除購物車全部商品
    removeCartAll() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(api)
      .then((res) => {
        if(res.data.success) {
          // alert(res.data.message);
          this.getCart();
        } else {
          alert(res.data.message);
        }
      })
      .catch(() => {
        this.setTips(false, '糟糕，無法刪除商品清單。');
        this.$httpMessageState(this.tips, '商品清單刪除');
      })
    },
    // 檢視商品詳細資訊
    viewProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
  },
  mounted() {
    this.getCart();
    this.emitter.on('get-cart', () => {
      this.getCart();
    });
  },
  unmounted() {
    // 移除註冊取得訂餐清單事件
    this.emitter.off('get-cart', () => {
      this.getCart();
    });
  },
}
</script>

<style>
.modal-backdrop.show {
    z-index: 0;
}
</style>