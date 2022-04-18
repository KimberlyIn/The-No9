<template>
  <div>
    <div 
      class="modal fade" 
      id="couponModal" 
      ref="modal" tabindex="-1" 
      aria-labelledby="exampleModalLabel" 
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light" id="exampleModalLabel">
              <span v-if="isNew">新增優惠卷</span>
              <span v-else>編輯貼文</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="col-12 mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入標題">
              </div>
              <div class="col-12 mb-3">
                <label for="coupon-code" class="form-label">優惠碼</label>
                <input type="text" class="form-control" id="coupon-code" v-model="tempCoupon.code" placeholder="請輸入優惠碼">
              </div>
              <div class="col-12 mb-3">
                <label for="due_date" class="form-label">到期日</label>
                <!-- due_date 在 coupons 裡面 -->
                <input type="date" class="form-control" id="due_date" v-model="due_date">
              </div>
              <div class="col-12 mb-3">
                <label for="percent" class="form-label">折扣百分比</label>
                <input type="number" class="form-control" id="percent" v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
              </div>
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled" 
                  :true-value="1" 
                  :false-value="0"
                >
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button 
              type="button" 
              class="btn btn-secondary" 
              @click="$emit('update-coupon', tempCoupon)"
            >
              <!-- 如果 isNew 是 true 就新增商品，如果是 false 就更新優惠券 -->
              {{ isNew ? '新增商品': '更新優惠券' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tempCoupon: {},
      due_date: '',
    };
  },
  emits: ['update-coupon'],
  mixins: [modalMixin],
  watch: {
    coupon() {
      // 將 this.coupon 賦予 this.tempCoupon
      this.tempCoupon = this.coupon;
      // 對 couponDate 賦予時間
      const couponDate = new Date(this.tempCoupon.due_date * 1000)
      .toISOString().split('T');
      // 將已付與日期的 couponDate 賦予 this.due_data
      [this.due_date] = couponDate;
    },
    due_date() {
      // 對 this.tempCoupon.due_data 賦予月份
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
}
</script>