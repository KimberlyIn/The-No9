<template>
  <div class="div-front-top">
    <div class="header w-100 py-5"></div>
    <!-- 圖片輪撥 -->
    <div>
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://i.ibb.co/MBk9h5z/IMG-6330.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="https://i.ibb.co/8XgfjR2/IMG-4462.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="https://i.ibb.co/b2Lmzrx/IMG-1944.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="container">
      <!-- 精選文章 -->
      <ArticlesSwiper :limitCount="999" :filterArticle="recArticle" />
      <div class="row justify-content-between">
        <!-- 文章內容 -->
        <div class="col-8">            
          <ul>
            <template v-for="article in articles" :key="article.id">
              <li v-if="article.isPublic">
                <div
                  style="width: 600px; height: 400px; background-size: cover; background-position: center"
                  :style="{backgroundImage: `url(${article.imageUrl})`}"
                ></div>
                <div>
                  <h4>{{ article.title }}</h4>
                  <small>{{ $filters.date(article.create_at) }}</small>
                  <div v-html="article.description"></div>
                </div>
                <div>
                  <router-link :to="`/artivle/${article.id}`">
                    繼續閱讀
                  </router-link>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <!-- 作者資訊 -->
        <div class="col-3">
          <div>
            <div class="title">Nine</div>
            <div>
              <img src="" alt="">
            </div>
            <div>
              簡短描述簡短描述簡短描述
            </div>
          </div>

          <div>
            let's social
          </div>
          <div>
            <ul>
              <li>FB</li>
              <li>IG</li>
              <li>Email</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
    
  </div>
  <Footer />
</template>

<script>
import Footer from '@/components/Footer.vue';
import ArticlesSwiper from '@/components/ArticlesSwiper.vue';

export default {
  inject: ['emitter', '$httpMessageState'],
  components: {
    ArticlesSwiper,
    Footer,
  },
  data() {
    return {
      articles: [],
      article: {},
      articleId: '',
      recArticle: {
        id: 0,
        name: '',
        tag: '',
      },
      currentPage: 1,
    };
  },
  mounted() {
    // 取得文章 ID
    this.articleId = this.$route.params.articleId;
    this.getArticle();
    this.getArticles();
  },
  watch: {
    // 監聽 route 參數變化 (切換推薦產品)
    $route() {
      // 取得產品ID
      this.articleId = this.$route.params.articleId;
      if (this.articleId !== undefined) {
        this.getArticle();
      }
    },
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
          // 取得推薦商品資訊
          this.recArticle = {
            id: this.article.id,
            name: this.article.title,
            tag: this.article.tag,
          };
        } else {
          // ...
        }
      })
      .catch((error) => {
        alert(error);
      })
    },
  },
}
</script>