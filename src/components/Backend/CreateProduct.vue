<template>
  <div>
    <div class="modal fade " id="createProduct" ref="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light" id="staticBackdropLabel">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-flex">
            <div class="col-sm-4 pe-3">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i
                    class="fas fa-spinner fa-spin"
                    v-show="status.fileUploading"
                  ></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" />
              <div class="mt-5" v-if="tempProduct.imagesUrl">
                <div
                  v-for="(image, key) in tempProduct.imagesUrl"
                  class="mb-3"
                  :key="key"
                >
                  <input
                    type="url"
                    class="form-control form-control"
                    v-model="tempProduct.imagesUrl[key]"
                    placeholder="請輸入連結"
                  />
                  <div>
                    <img class="img-fluid" :src="image"/>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempProduct.imagesUrl.splice(key, 1)"
                  >
                    移除
                  </button>
                </div>
                <!-- 如果沒有判定，圖片會一直可以新增 -->
                <div
                  v-if="tempProduct.imagesUrl[tempProduct.imagesUrl.length -1 ] || !tempProduct.imagesUrl.length"
                >
                  <button
                    class="btn btn-outline-secondary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8 pe-3">
              <div class="mb-3">
                <label for="title" class="form-label mb-2">標題</label>
                <input type="text" class="form-control w-100" id="title" v-model="tempProduct.title" placeholder="請輸入標題">
              </div>

              <div class="row mb-3">
                <div class="col-6">
                  <label for="category" class="form-label">分類</label>
                  <input type="text" class="form-control w-100" id="category" v-model="tempProduct.category" placeholder="請輸入分類">
                </div>
                <div class="col-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" class="form-control w-100" id="origin_price" min="0" v-model.number="tempProduct.origin_price" placeholder="請輸入原價"/>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-6">
                  <label for="unit" class="form-label">單位</label>
                  <input type="text" class="form-control w-100" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                </div>
                <div class="col-6">
                  <label for="price" class="form-label">售價</label>
                  <input type="number" class="form-control w-100" id="price" min="0" v-model.number="tempProduct.price" placeholder="請輸入售價">
                </div>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea class="form-control w-100" id="description" v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
              </div>

              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea class="form-control w-100" id="content" v-model="tempProduct.content" placeholder="請輸入說明內容"></textarea>
              </div>
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="is_enabled" 
                  v-model="tempProduct.is_enabled"
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
            <!-- @click="$emit('update-product', tempProduct)" data 裡的 tempProduct 已被賦予傳進來的 product? -->
            <button type="button" class="btn btn-secondary" @click="$emit('update-product', tempProduct)">確認</button>
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
    product: {
      type: Object,
      default() { return {}; },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status: {},
      modal: '',
      tempProduct: {},
    };
  },
  emits: ['update-product'],
  mixins: [modalMixin],
  inject: ['emitter'],
  watch: {
    product() {
      this.tempProduct = this.product;
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = '';
      }
    },
  },
  methods: {
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        this.status.fileUploading = false;
        if (response.data.success) {
          this.tempProduct.imageUrl = response.data.imageUrl;
          this.$refs.fileInput.value = '';
          this.emitter.emit('push-message', {
            style: 'success',
            title: '圖片上傳成功',
            content: response.data.message,
          });
        } else {
          this.$refs.fileInput.value = '';
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '圖片上傳成功',
            content: response.data.message,
          });
        }
      }).catch((error) => {
        this.status.fileUploading = false;
        this.$httpMessageState(error.response, '圖片失敗');
      });
    },
  },
};
</script>
