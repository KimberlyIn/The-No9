<template>
  <div class="order-cart" v-if="cart.carts">
    <div></div>
    <div>
      <div class="order-header py-5">
        <ul class="d-flex justify-content-center align-items-center">
          <li class="nav-item">
            <div class="nav-link" :class="{ active: stepStatus.checkCart }">
              <i class="bi bi-bag-check"></i>
              <p>購物車確認</p>
            </div>
          </li>
          <li class="nav-item line"><hr></li>
          <li class="nav-item">
            <div 
              class="nav-link"
              :class="{
                active: stepStatus.createOrder &&  !stepStatus.checkCart,
                disabled: !stepStatus.createOrder && !stepStatus.checkOrder && !stepStatus.orderReceived,
              }"
            >
              <i class="bi bi-list-ul"></i>
              <p>建立訂單</p>
            </div>
          </li>
          <li class="nav-item line"><hr></li>
          <li class="nav-item">
            <div 
              class="nav-link"
              :class="{ 
              active: stepStatus.checkOrder && !stepStatus.checkCart && !stepStatus.createOrder,
              disabled: !stepStatus.checkOrder && !stepStatus.checkOrder && !stepStatus.orderReceived,
              }"
            >
              <i class="bi bi-credit-card-fill"></i>
              <p>確認及付款</p>
            </div>
          </li>
          <li class="nav-item line"><hr></li>
          <li class="nav-item">
            <div
              class="nav-link"
              :class="{
                active: stepStatus.orderReceived,
                disabled: !stepStatus.orderReceived,
              }"
            >
              <i class="bi bi-check-circle-fill"></i>
              <p>訂單完成</p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div class="container"> 
          <div class="order-body py-4">
            <!-- 購物車確認 check-cart -->
            <div 
              class="check-cart"
              v-if="stepStatus.checkCart"
            >
              <table class="table desktop-check-cart align-middle border">
                <thead class="border">
                  <tr>
                    <th></th>
                    <th>商品</th>
                    <th></th>
                    <th>價格</th>
                    <th>數量</th>
                    <th>總價格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    class="border-bottom"
                    v-for="item in cart.carts" :key="item.id"
                  >
                    <th class="text-center" width="200">
                      <button 
                        type="button"
                        class="close border-n"
                        @click="removeCartItem(item.id)"  
                      >
                        <i class="bi bi-x"></i>
                      </button>
                    </th>
                    <th width="100" class="mx-5">
                      <div
                        style="height: 100px; background-size: cover; background-position: center"
                        :style="{backgroundImage: `url(${item.product.imageUrl})`}"
                      ></div>
                    </th>
                    <th class="px-5">
                      <a class="hover-black-a" href="#">{{ item.product.title }}</a>
                    </th>
                    <th width="100"><span class="text-explain fw-normal">{{ item.product.price }}</span></th>
                    <th width="150">
                      <div class="d-flex align-items-center">
                        <div class="d-flex my-3 me-5">
                          <input 
                            type="text" 
                            class="form-control text-center text-explain rounded-0 border-end-0" 
                            placeholder=""
                            v-model.number="item.qty"
                          >
                          <div class="input-group w-50 border">
                            <div class="input-group-prepend border-bottom px-1">
                              <button 
                                type="button" 
                                class="btn"
                                :disabled="item.qty === 1 || loadingStatus.loadingItem === item.id"
                                @click="updateCart(item, -1)"
                              >
                                <i class="bi bi-dash"></i>
                              </button>
                            </div>
                            <div class="input-group-append px-1">
                              <button 
                                type="button" 
                                class="btn"
                                :disabled="loadingStatus.loadingItem === item.id"
                                @click="updateCart(item, 1)"
                              >
                                <i class="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                    <th width="200">
                      <span class="text-explain fw-normal">{{ item.total }}</span>
                    </th>
                  </tr>
                </tbody>
              </table>

              <!-- 手機版 -->
              <div class="mobile-check-cart py-3">
                <ul 
                  class="list-unstyled px-3 border"
                  v-for="item in cart.carts" :key="item.id"
                >
                  <li class="py-3 d-flex justify-content-between">
                    <div class="product-delete pe-4 align-self-center">
                      <button 
                        type="button" 
                        class="close border-n"
                        @click="removeCartItem(item.id)"  
                      > 
                        <i class="bi bi-x"></i>
                      </button>
                    </div> 
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
                      <div class="d-flex align-items-center justify-content-between">
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
                          <small class="text-secondary">小計：
                            <br>
                            NT$ {{ item.total }}</small>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>  
              </div>
              <!-- 手機版 -->
              <div>
                <div>
                  <div class="mt-5">
                    <span>
                      <i class="bi bi-arrow-right-circle-fill"></i>
                      周年慶期間消費贈送的優惠券碼，可享有85折優惠！
                    </span>
                    <div class="coupon-item mt-2 d-flex justify-content-between">
                      <div class="col-6">
                        <Form v-slot="{ errors }" @submit="onDiscount">
                          <div class="input-group mb-3">
                            <Field
                              id="coupon"
                              name="優惠券"
                              type="text"
                              class="form-control"
                              :class="{ 'is-invalid': errors['優惠券'] }"
                              :disabled="loadingStatus.loadingItem === 'coupon'"
                              placeholder="請輸入優惠碼"
                              v-model="discountCode"
                            ></Field>
                            <button
                              class="discolor-button"
                              type="submit"
                              id="button-coupon"
                              :disabled="!discountCode"
                            >
                              <span v-if="cart?.carts[0]?.coupon">
                                已套用優惠券 <i class="bi bi-check-circle-fill"></i>
                              </span>
                              <span v-else>套用優惠券</span>
                            </button>
                          </div>
                        </Form>
                      </div>
                      <div class="remove-cart">
                        <button 
                          type="button"
                          class="discolor-button-light"
                          @click="removeCartAll('all')"
                        >
                          清空購物車
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="totle border my-5">
                <p class="mb-0 py-4 px-5">總計 <span class="float-end fw-bold">$NT {{ $filters.currency(cart.total) }}</span></p>            
              </div>

              <div class="mb-5 text-end">
                <button 
                  type="submit"
                  class="discolor-button-light"
                  @click="onSubmit"
                >
                  下一步
                </button>
              </div>
            </div>

            <!-- 建立訂單 create-order -->
            <div 
              class="create-order"
              v-if="stepStatus.createOrder && !stepStatus.checkCart"
            >
              <Form v-slot="{ errors }" class="row g-3" @submit="onSubmit">
                <div class="col-md-6">
                  <label for="inputName" class="form-label">
                    <span class="text-danger">*</span>
                    姓名
                  </label>
                  <Field 
                    id="inputName"
                    name="姓名"
                    type="text" 
                    class="form-control" 
                    :class="{ 'is-invalid':errors['姓名'] }"
                    placeholder="請輸入姓名"
                    rules="required"
                    v-model="form.user.name"
                  >
                  </Field>
                  <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-md-6">
                  <label for="inputEmail" class="form-label">
                    <span class="text-danger">*</span>
                    信箱
                  </label>
                  <Field 
                    id="inputEmail"
                    name="信箱"
                    type="email" 
                    class="form-control" 
                    :class="{ 'is-invalid':errors['信箱'] }"
                    placeholder="請輸入信箱"
                    rules="email|required"
                    v-model="form.user.email"
                  >
                  </Field>
                  <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label for="phone" class="form-label">
                    <span class="text-danger">*</span>
                    電話
                  </label>
                  <Field 
                    id="phone"
                    name="電話"
                    type="phone" 
                    class="form-control" 
                    :class="{ 'is-invalid':errors['電話'] }"
                    placeholder="請輸入電話"
                    rules="required"
                    v-model="form.user.tel"
                  >
                  </Field>
                  <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label for="inputPayment" class="form-label">
                    <span class="text-danger">*</span>
                    付款方式
                  </label>
                  <Field 
                    id="inputPayment"
                    name="付款方式"
                    class="form-select" 
                    :class="{ 'is-invalid':errors['付款方式'] }"
                    placeholder="請輸入付款方式"
                    as="select"
                    rules="required"
                    v-model="form.user.payment"
                  >
                    <option value="" disabled>請選擇付款方式</option>
                    <option value="現金">現金</option>
                    <option value="信用卡">信用卡</option>
                  </Field>
                  <ErrorMessage name="付款方式" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-12">
                  <label for="inputAddress" class="form-label">
                    <span class="text-danger">*</span>
                    地址
                  </label>
                  <Field 
                    id="inputAddress"
                    name="地址"
                    type="address" 
                    class="form-control" 
                    :class="{ 'is-invalid':errors['地址'] }"
                    placeholder="請輸入地址"
                    rules="required"
                    v-model="form.user.address"
                  >
                  </Field>
                  <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-12">
                  <label for="inputMessage" class="form-label">
                    備註
                  </label>
                  <Field
                    id="inputMessage"
                    name="message"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['message'] }"
                    placeholder="請輸入備註"
                    as="textarea"
                    v-model="form.message"
                  ></Field>
                  <ErrorMessage name="message" class="invalid-feedback"></ErrorMessage>
                </div>

                <div class="mt-5">
                  <div class="float-start">
                    <button 
                      type="submit"
                      class="discolor-button-light"  
                      @click="onPreStep"
                    >
                      上一步
                    </button>
                  </div>
                  <div class="float-end">
                    <button 
                      type="submit"
                      class="discolor-button-light"
                    >
                      下一步
                    </button>
                  </div>
                </div>
              </Form>
            </div>

            <!-- 確認付款 check-order -->
            <div 
              class="check-order py-5"
              v-if="stepStatus.checkOrder && !stepStatus.createOrder"
            >
              <div class="check-order-list mx-auto">
                <div class="row">
                  <div class="col-6">
                    <label for="inputName" class="form-label">姓名</label>
                      <p>{{ form.user.name }}</p>
                  </div>
                  <div class="col-6">
                    <label for="phone" class="form-label">電話</label>
                    <p>{{ form.user.tel }}</p>
                  </div>
                  <div class="col-6 mobile-email">
                    <label for="inputEmail" class="form-label">信箱</label>
                    <p>{{ form.user.email }}</p>
                  </div>
                  <div class="col-6 mobile-pay">
                    <label for="inputPayment" class="form-label">付款方式</label>
                    <p>{{ form.user.payment }}</p>
                  </div>
                  <div class="col-12">
                    <label for="inputAddress" class="form-label">地址</label>
                    <p>{{ form.user.address }}</p>
                  </div>
                  <div class="col-12">
                    <label for="inputMessage" class="form-label">備註</label>
                      <p>{{ form.message }}</p>
                  </div>
                </div>
              </div>

              <div class="order-details mx-auto">
                <h4>商品明細</h4>
                <div class="px-4 border">
                  <table class="table align-middle">
                    <tbody>
                      <tr class="border-bottom" v-for="item in cart.carts" :key="item.id">
                        <td width="120" class="py-4 pe-3 ps-0">
                          <div
                            style="height: 100px; background-size: cover; background-position: center"
                            :style="{backgroundImage: `url(${item.product.imageUrl})`}"
                          ></div>
                        </td>
                        <td>
                          <div class="product-title">
                            {{ item.product.title }} x {{ item.qty }}
                          </div>
                          <div class="price-total text-color-9c">
                          NT$ {{ item.total }}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="ps-0"><div>總計</div></td>
                        <td class="pe-0">
                          <div class="text-end text-color-9c">NT$ {{ $filters.currency(cart.total) }}</div>
                        </td>
                      </tr>
                      <tr>
                        <td class="ps-0"><div>折扣後</div></td>
                        <td class="pe-0">
                          <div class="text-end text-color-9c">NT$ {{ $filters.currency(cart.final_total) }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div class="my-5">
                <div class="float-start">
                  <button 
                    type="submit"
                    class="discolor-button-light"  
                    @click="onPreStep"
                  >
                    上一步
                  </button>
                </div>

                <div class="float-end">
                  <button 
                    type="submit"
                    class="discolor-button-light"
                    @click="onSendOrder" 
                  >
                    確認付款
                  </button>
                </div>
              </div>
            </div>

            <!-- 訂單完成 order-received -->
            <div 
              class="order-received"
              v-if="stepStatus.orderReceived"
            >
              <div class="row flex-column align-items-center text-center">
                <div class="col-4 mb-5">
                  <p class="mb-3">訂單已成立，我們將盡快為您安排出貨，謝謝。</p>
                  <p class="mb-1">訂單編號 : <span class="text-color-9c">{{ order.orderId }}</span> </p>
                  <p class="mb-1">訂單日期 : <span class="text-color-9c">{{ order.create_at  }}</span></p>
                </div>
                <div class="col-4">
                  <div>
                    <router-link to="/">
                      <button 
                        type="submit"
                        class="discolor-button-light"  
                      >
                        返回首頁
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ... -->

    </div>
  </div>
</template>

<script type="module">

export default {
  inject: ['emitter', '$httpMessageState'],
  data() {
    return {
      cart: {},
      loadingStatus: {
        loadingItem: '',
      },
      stepStatus: {
        checkCart: true,
        createOrder: false,
        checkOrder: false,
        orderReceived: false,
      },
      form: {
        user: {},
      },
      order: {},
      discountCode: '',
    }
  },
  methods: {
    // 取得購物車
    inTheCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;

      this.emitter.emit('change-isLoading', true);
      this.$http.get(api)
      .then((res) => {
        this.emitter.emit('change-isLoading', false);
        if(res.data.success) {
          this.cart = res.data.data;
        } else {
          this.$httpMessageState(res, '加入購物車');
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    },
    // 更新購物車
    updateCart(item, qty) {
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
              alert(res.data.message);
            }
            // 更新購物車
            this.inTheCart(); 
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    // 取得優惠券
    getDisCount(code) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;

      const discountData = {
        code,
      };

      this.emitter.emit('change-isLoading', true);
      this.$http
        .post(api, { data: discountData })
        .then((res) => {
          this.emitter.emit('change-isLoading', false);
          this.$httpMessageState(res, '套用優惠券');
          if (res.data.success) {
            this.inTheCart();
            // 總計 (扣除折扣價)
            this.discountCode = '';
          }
        })
        .catch(() => {
          this.setTips(false, '糟糕，無法套用此優惠券!');
          this.$httpMessageState(this.tips, '套用優惠券');
        });
    },
    // 刪除購物車單一商品
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api)
      .then((res) => {
        if(res.data.success) {
          this.inTheCart();
          this.emitter.emit('get-cart');
          this.$httpMessageState(res, '刪除單一商品');
        } else {
          this.$httpMessageState(res, '刪除單一商品');
        }
      })
      .catch((err) => {
        alert(err.data.message);
      });
    },
    // 刪除購物車全部商品
    removeCartAll() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(api)
      .then((res) => {
        if(res.data.success) {
          this.inTheCart();
          this.emitter.emit('get-cart');
          this.$httpMessageState(res, '清空購物車');
        } else {
          this.$httpMessageState(res, '清空購物車');
        }
      })
    },
    onSendOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;

      if (this.cart.carts.length) {
        this.$http
          .post(api, { data: this.form })
          .then((res) => {
            if (res.data.success) {
              this.order = { ...res.data };
              // 付款
              this.onPayOrder();
            } else {
              alert('建立訂單');
            }
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    // 確認付款
    onPayOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.order.orderId}`;

      this.$http
        .post(api)
        .then((res) => {
          if (res.data.success) {
            this.stepStatus.checkOrder = false;
            this.stepStatus.orderReceived = true;

            // 取得訂餐清單 (刷新)
            this.emitter.emit('get-cart');
          } else {
            alert('付款');
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    // 下一步
    onSubmit() {
      if(this.stepStatus.checkCart) {
        this.stepStatus.checkCart = false;
        this.stepStatus.createOrder = true;
      } else if (this.stepStatus.createOrder) {
        this.stepStatus.createOrder = false;
        this.stepStatus.checkOrder = true;
      }
    },
    // 上一步
    onPreStep() {
      if(this.stepStatus.createOrder) {
        this.stepStatus.checkCart = true;
      } else if (this.stepStatus.checkOrder) {
        this.stepStatus.createOrder = true;
      }
    },
    onDiscount() {
      this.getDisCount(this.discountCode);
    },
    viewProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
  },
  mounted() {
    this.inTheCart();

    this.emitter.emit('page-loading', true);
    setTimeout(() => {
      this.emitter.emit('page-loading', false);
    }, 1000);
  },
}
</script>
