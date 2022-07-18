<template>
  <div>
    <div class="div-backend-top">
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
      const articleComponent = this.$refs.articleModal;
      this.$http[httpMethod](api, { data: this.tempArticle })
      .then((response)=>{
        this.$httpMessageState(response, status);
        articleComponent.hideModal();
        this.getArticles(this.currentPage);
      })
      .catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      const delComponent = this.$refs.deleteProduct;
      delComponent.openModal();
    },
    delArticle() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.$http.delete(api)
      .then((response)=>{
        this.$httpMessageState(response, '刪除貼文');
        const delComponent = this.$refs.deleteProduct;
        delComponent.hideModal();
        this.getArticle(this.currentPage);
      })
      .catch((error)=>{
        this.$httpMessageState(error.response, '刪除貼文');
      });
    },
  },
}
</script>