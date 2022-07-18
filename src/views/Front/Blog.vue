<template>
  <div class="blog">
    <!-- 圖片輪撥 -->
    <div class="header-bg w-100" style="background-color: #C9C9C9;">
      <div class="container bg-white">
        <!-- 精選文章 -->
        <ArticlesSwiper />
      </div>
    </div>
    
    <div class="container blog-container broder">
      <div class="row justify-content-between">
        <!-- 文章內容 -->
        <div class="col-8">            
          <ul>
            <template v-for="article in articles" :key="article.id">
              <li class="border mb-5" v-if="article.isPublic">
                <div
                  style="width: 100%; height: 400px; background-size: cover; background-position: center"
                  :style="{backgroundImage: `url(${article.imageUrl})`}"
                ></div>
                <div class="pt-3 px-4">
                  <small class="text-secondary text-spac">{{ $filters.date(article.create_at) }}</small>
                  <h4 class="pt-2 fw-bolder">{{ article.title }}</h4>
                </div>
                <div class="pt-2 px-4 text-secondary text-spac" v-html="article.description"></div>
                <div class="py-3 px-4">
                  <router-link 
                    class="hover-black-a" 
                    :to="`/artivle/${article.id}`" 
                    v-if="article.isPublic"
                  >
                     <small class="text-spac"> &lt;繼續閱讀&gt;</small>
                  </router-link>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <!-- 作者資訊 -->
        <div class="col-3">
          <div class="border">
            <div class="title text-center text-spac py-3 border-bottom">- Nine -</div>
            <div class="global-img px-3 py-3" style="width: 100%; height: 250px;">
              <img src="https://images.unsplash.com/photo-1514813482567-2858e6c00ee1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="">
            </div>
            <div class="px-4 py-3">
              <small class="text-secondary">
                2012 那年與皮革相遇至今，沒有想過停止製作皮件，我想就會這麼繼續做下去了吧？你好，我是一個做皮件的人，你喜歡皮革嗎？
              </small>
              <div class="text-center text-spac pt-4 pb-2">
                <small class="text-secondary">
                  The No.9
                </small>
              </div>
            </div>
          </div>
          <div class="border mt-4">
            <div class="text-center text-spac py-3 border-bottom">- let's social -</div>
            <div class="py-4 px-3">
              <ul class="d-flex justify-content-center">
                <li class="px-1">
                  <a class="border" href="#" style="padding: 7px 11px;">
                    <img src="@/assets/images/icon-facebook-dark.png" alt="" style="width: 10px;">
                  </a>
                </li>
                <li class="px-1">
                  <a class="border" href="#" style="padding: 7px 6px;">
                    <img src="@/assets/images/icon-instagram-dark.png" alt="" style="width: 20px;">
                  </a>
                </li> 
                <li class="px-1">
                  <a class="border" href="#" style="padding: 7px 6px;">
                    <img src="@/assets/images/icon-email-dark.png" alt="" style="width: 20px;">
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import ArticlesSwiper from '@/components/ArticlesSwiper.vue';

export default {
  inject: ['emitter', '$httpMessageState'],
  components: {
    ArticlesSwiper,
  },
  data() {
    return {
      articles: [],
      article: {},
      articleId: '',
    };
  },
  mounted() {
    // 取得文章 ID
    this.articleId = this.$route.params.articleId;
    this.getArticle();
    this.getArticles();

    this.emitter.emit('page-loading', true);
    setTimeout(() => {
      this.emitter.emit('page-loading', false);
    }, 1000);
  },
  methods: {
    // 取得文章列表
    getArticles (page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.$http.get(api)
      .then((response)=>{
        this.articles = response.data.articles;
        this.pagination = response.data.pagination;
      })
      .catch((error)=>{
        alert(error);
      })
    },
    // 取得單一文章
    getArticle() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${this.articleId}`;
      this.$http.get(api)
      .then((response)=>{
        if(response.data.success) {
          this.articleId = response.data.article;
          // 取得單一文章
          const articleItem = { ...response.data.article };
          this.article = { ...articleItem };
        } else {
          // ...
        }
      })
      .catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      })
    },
  },
}
</script>