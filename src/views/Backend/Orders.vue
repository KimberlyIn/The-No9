<template>
  <div class="div-backend-top">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <table class="table mt-4">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, key) in orders" :key="key">
            <tr>
              <td>{{ $filters.date(item.create_at) }}</td>
              <td>
                <span v-text="item.user.email" v-if="item.user"></span>
              </td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="(product, i) in item.products" :key="i">
                    <p>{{ product.product.title }} 　　數量：{{ product.qty }} {{ product.product.unit }}</p>
                  </li>
                  <li>
                    <p>備註：{{ item.message }}</p>
                  </li>
                </ul>
              </td>
              <td>{{ item.total }}</td>
              <td>
                <div class="form-check form-switch">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    id="flexSwitchCheckChecked" 
                    :id="`paidCheck${item.id}`"
                    v-model="item.is_paid"
                    @change="updateOrder(item)"
                    checked >
                  <label class="form-check-label" for="flexSwitchCheckChecked" :for="`paidCheck${item.id}`">
                    <span v-if="item.is_paid">已付款</span>
                    <span v-else>未付款</span>  
                  </label>
                </div>
                
              </td>
              <td>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-secondary border-end-0 rounded-0"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-danger rounded-0"
                  @click="delOrderModal(item)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </template>         
        </tbody>
      </table>
      <OrderModal :order="tempOrder" @update-order="updateOrder" ref="orderModal"></OrderModal>
      <DeleteProduct :item="tempOrder" @del-product="delOrder" ref="deleteProduct"></DeleteProduct>
      <Pagination :pages="pagination" @get-datas="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import OrderModal from '@/components/Backend/OrderModal.vue';
import DeleteProduct from '@/components/Backend/DeleteProduct.vue';

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      isLoading: false,
      pagination: {},
      tempOrder: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
    OrderModal,
    DeleteProduct,
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.$http.get(api, this.tempProduct)
      .then((response) => {
        this.orders = response.data.orders;
        this.pagination = response.data.pagination;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
    openModal(item) {
      this.tempOrder = {...item};
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.openModal();
    },
    delOrderModal(item) {
      this.tempOrder = {...item};
      const delComponent = this.$refs.deleteProduct;
      delComponent.openModal();
    },
    updateOrder(item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.isLoading = true;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http.put(api, { data: paid })
      .then((response) => {
        this.isLoading = false;
        const orderComponent = this.$refs.orderModal;
        orderComponent.hideModal();
        this.getOrders(this.currentPage);
        this.$httpMessageState(response, '更新付款狀態');
      })
      .catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
    delOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http.delete(api)
      .then(() => {
        const delComponent = this.$refs.deleteProduct;
        delComponent.hideModal();
        this.isLoading = false;
        this.getOrders(this.currentPage);
      })
      .catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
  },
  created() {
    this.getOrders();
  },
}
</script>