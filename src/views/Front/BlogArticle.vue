<template>
  <div class="div-front-top blog-article">
    <div class="header-bg w-100" style="height: 500px; background-color: #C9C9C9;">
      <div class="container bg-white">
        <!-- 精選文章 -->
        <ArticlesSwiper />
      </div>
    </div>
    <div class="container blog-container">
      <div class="row pb-5 justify-content-between">
        
        <div class="col-8">
          <div class="mb-3">
            <router-link class="hover-black-a" to="/blog">
              <small>回到文章列表</small>
            </router-link>
          </div>
          <div class="article-col-8 border">
            <div class="pb-3" style="display: inline-block;">
              <div>
                <h5 class="mb-1 text-spac fw-bolder">{{ article.title }}</h5>
              </div>
              <div class="text-secondary">
                <small class="pe-2 text-spac">{{ $filters.date(article.create_at) }}</small>
                <small>作者：Nine</small>
              </div>
            </div>
            <!-- 文章內容 -->
            <div>
              <img :src="article.imageUrl" alt="">
            </div>
            <div class="py-5" v-html="article.content"></div>
          </div>
        </div>
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
  <Footer />
</template>

<script>
import ArticlesSwiper from '@/components/ArticlesSwiper.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    ArticlesSwiper,
    Footer,
  },
  data() {
    return {
      article: {},
      articleId: '',
    };
  },
  watch: {
    // 監聽 route 參數變化 (切換文章)
    $route() {
      // 取得文章ID
      this.articleId = this.$route.params.articleId;
      if (this.articleId !== undefined) {
        this.getArticle();
      }
    },
  },
  methods: {
    getArticle() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${this.articleId}`;
      this.$http.get(api).then((response) => {
        this.article = response.data.article;
      })
      .catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      });
    },
  },
  created() {
    this.articleId = this.$route.params.articleId;
    this.getArticle();
  },
}
</script>