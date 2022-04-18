<template>
  <div>
    <div class="div-backend-top">
      <Loading :actuve="isLoading" :z-index="1060"></Loading>
      <div class="text-end mt-4 mx-5"> 
        <button type="button" class="btn btn-secondary" @click="openCouponModal(true, item)">
          建立新的優惠券
        </button>
      </div>
      <div class="px-3">
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th>名稱</th>
              <th>折扣百分比</th>
              <th>到期日</th>
              <th>是否啟用</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in coupons" :key="key">
              <td>{{ item.title }}</td>
              <td>{{ item.percent }} %</td>
              <td>{{ $filters.date(item.due_date) }}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
                <span class="text-secondary" v-else>不啟用</span>
              </td>
              <td>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-secondary border-end-0 rounded-0"
                  @click="openCouponModal(false, item)"
                >
                  編輯
                </button>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-danger rounded-0"
                  @click="delOpenCouponModal(item)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <CouponModal></CouponModal> 和 <CouponModal/> 有什麼分別 -->
        <CouponModal :coupon="tempCoupon" @update-coupon="updateCoupon" :isNew="isNew" ref="couponModal" />
        <DeleteProduct :item="tempCoupon" @del-product="delCoupon" ref="deleteProduct" />
      </div>
    </div>
  </div>
</template>

<script>
import CouponModal from '@/components/Backend/CouponModal.vue';
import DeleteProduct from '@/components/Backend/DeleteProduct.vue';

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        // 折扣
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
    };
  },
  components: {
    CouponModal,
    DeleteProduct,
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if(this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = {...item};
      }
      this.$refs.couponModal.openModal();
    },
    // 為什麼刪除需要淺曾拷貝？
    delOpenCouponModal(item) {
      this.tempCoupon = {...item};
      const delComponent = this.$refs.deleteProduct;
      delComponent.openModal();
    },
    // 取得優惠券
    getCoupons() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(api)
      .then((response) => {
        this.coupons = response.data.coupons;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
    // 編輯或新增
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let apiMethods = 'post';
      // 把 tempCoupon 裡的必填項目代入
      let data = tempCoupon;

      if(!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        apiMethods = 'put';
        data = this.tempCoupon;
      };

      this.$http[apiMethods](api, {data})
      .then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, '新增優惠券');
        this.getCoupons();
        // 底下兩種寫法都可以
        const couponComponent = this.$refs.couponModal;
        couponComponent.hideModal();
        // this.$refs.couponModal.hideModal();
      })
      .catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '錯誤訊息');
      })
      
    },
    // 刪除優惠券
    delCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.$http.delete(api)
      .then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, '刪除優惠券')
        const delComponentCoupon = this.$refs.deleteProduct;
        delComponentCoupon.hideModal();
        this.getCoupons();
      })
      .catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
  },
  created() {
    this.getCoupons();
  },
}
</script>