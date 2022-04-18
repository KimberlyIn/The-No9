<template>
  <div>
    <div class="modal fade" id="orderModal" ref="modal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light" id="exampleModalToggleLabel">訂單細節</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <h4>用戶資料</h4>
                <table class="table">
                  <tbody v-if="tempOrder.user">
                    <tr>
                      <th>姓名</th>
                      <td>{{ tempOrder.user.name }}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{{ tempOrder.user.email }}</td>
                    </tr>
                    <tr>
                      <th>電話</th>
                      <td>{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td>{{ tempOrder.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-8">
                <h4>訂單細節</h4>
                <!-- 訂單細節 -->
                <table class="table">
                  <tbody>
                    <tr>
                      <th>訂單編號</th>
                      <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr>
                      <th>下單時間</th>
                      <td>{{ $filters.date(tempOrder.create_at) }}</td>
                    </tr>
                    <tr>
                      <th>付款時間</th>
                      <td>
                        <span v-if="tempOrder.is_paid">{{ $filters.date(tempOrder.is_paid)}}</span>
                        <span v-else>時間不正確</span>
                      </td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <span class="text-success" v-if="tempOrder.is_paid">已付款</span>
                        <span v-else class="text-secondary">未付款</span>
                      </td>
                    </tr>
                    <tr>
                      <th>總金額</th>
                      <td>{{ tempOrder.total }}</td>
                    </tr>
                  </tbody>
                </table>
                <!-- 選購商品 -->
                <h4>選購商品</h4>
                <table class="table">
                  <tbody>
                    <tr v-for="item in tempOrder.products" :key="item.id">
                      <th>{{ item.product.title }}</th>
                      <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="d-flex justify-content-end">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      value="" 
                      id="flexCheckChecked" 
                      v-model="tempOrder.is_paid"
                      checked
                    >
                    <label class="form-check-label" for="flexCheckChecked">
                      <span v-if="tempOrder.is_paid">已付款</span>
                      <span v-else>未付款</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary" 
              data-bs-dismiss="modal" 
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-secondary" 
              @click="$emit('update-order', tempOrder)"
            >
              修改付款狀態
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
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: '',
      tempOrder: {},
      isPaid: false,
    };
  },
  emits: ['update-order'],
  mixins: [modalMixin],
  inject: ['emitter'],
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
}
</script>