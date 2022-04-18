<template>
  <div>
    <div class="modal fade" id="deleteProduct" ref="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">刪除商品 {{ item.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <span class="fw-bold text-danger">{{ item.title }}</span> 商品(刪除後將無法恢復)
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button 
              type="button" 
              class="btn btn-danger"
              @click="$emit('del-product')"
            >
              確認刪除
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
    item: {},
  },
  data() {
    return {
      modal: '',
    };
  },
  emits: ['del-product'],
  mixins: [modalMixin],
}
</script>