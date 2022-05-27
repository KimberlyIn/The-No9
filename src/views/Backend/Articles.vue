<template>
  <!-- 
    1.抓取所有文章列表 
    2.對每個位置補上抓到的對應資料
    3.製作建立新文章：串接 post Api
    4.
  -->
  <div>
    <div class="div-backend-top">
      <!-- <Loading :actuve="isLoading" :z-index="1060"></Loading> -->
      <div class="text-end mt-4 mx-5"> 
        <button 
          type="button" 
          class="btn btn-secondary"
          @click="openModal(true)"
        >
          建立新的頁面
        </button>
      </div>
      <div class="px-3">
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th>標題</th>
              <th>作者</th>
              <th>描述</th>
              <th width="120">建立時間</th>
              <th width="120">是否公開</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td>{{ article.title }}</td>
              <td>{{ article.author }}</td>
              <td>{{ article.description }}</td>
              <td>{{ $filters.date(article.create_at) }}</td>
              <td>
                <span class="text-success" v-if="article.isPublic">已上架</span>
                <span v-else>未上架</span>
              </td>
              <td>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-secondary border-end-0 rounded-0"
                  @click="getArticle(article.id)"
                >
                  編輯
                </button>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-danger rounded-0"
                  @click="openDelArticleModal(article)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- ArticleModal.vue 中觸發 button @click="$emit('update-article', tempArticle)" -->
    <ArticleModal :article="tempArticle" :is-new="isNew" ref="articleModal" @update-article="updateArticle"/>
    <DeleteProduct :item="tempArticle" @del-product="delArticle" ref="deleteProduct"/>
  </div>
</template>

<script>
import ArticleModal from '@/components/Backend/ArticleModal.vue';
import DeleteProduct from '@/components/Backend/DeleteProduct.vue';

export default {
  inject: ['emitter', '$httpMessageState'],
  components: {
    ArticleModal,
    DeleteProduct,
  },
  data() {
    return {
      articles: [],
      article: {},
      isPublic: false,
      isNew: false,
      tempArticle: {},
      currentPage: 1,
    };
  },
  mounted() {
    // 這裡要執行才會出現列表
    this.getArticles();
  },
  methods: {
    getArticles(page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.$http.get(api)
      .then((response)=>{
        this.articles = response.data.articles;
        this.pagination = response.data.pagination;
      })
      .catch((error)=>{
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
    getArticle(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      this.$http.get(api)
      .then((response)=>{
        if(response.data.success) {
          this.openModal(false, response.data.article);
          this.isNew = false;
        }
      })
      .catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
    // 雖然 openModal 大致上都寫好，也在 button 正確的放上 click
    // 但是 this.$refs.articleModal.openModal(); 需要靠 modalMixin 啟用
    // 所以記得在 ArticleModal.vue 把 modalMixin 載入
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.isNew = true;
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      this.$refs.articleModal.openModal();
    },
    updateArticle(item) {
      this.tempArticle = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      let status = '新增貼文';
      
      if(!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
        httpMethod = 'put';
        status = '更新貼文'
      }
      // this.$refs.articleModal.hideModal();
      const articleComponent = this.$refs.articleModal;
      this.$http[httpMethod](api, { data: this.tempArticle })
      .then((response)=>{
        this.$httpMessageState(response, status);
        articleComponent.hideModal();
        // this.$refs.articleModal.hideModal();
        this.getArticles(this.currentPage);
      })
      .catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
    delArticle() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.$http.delete(api)
      .then((response)=>{
        this.$httpMessageState(response, '刪除貼文');
        // this.$refs.deleteProduct.hideModal();
        const delComponent = this.$refs.deleteProduct;
        delComponent.hideModal();
        this.getArticle(this.currentPage);
      })
      .catch((error)=>{
        this.$httpMessageState(error.response, '刪除貼文');
      });
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      // this.$refs.deleteProduct.openModal();
      const delComponent = this.$refs.deleteProduct;
      delComponent.openModal();
    },
  },
}
</script>