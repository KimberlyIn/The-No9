<template>
  <div class="article-swiper">
    <!-- 精選文章 -->
    <swiper
      :options="swiperOptions"
      :breakpoints="breakpoints"
      navigation
      :pagination="{ clickable: true }"
    >
      <swiper-slide v-for="article in articles" :key="article.id">
        <ul class="d-flex justify-content-center">
          <li>
            <a href="#" @click.prevent="viewArticle(article.id)">
              <div class="global-img">
                <img :src="article.imageUrl" alt="">
              </div>
              <div class="swiper-text">
                <div class="text-place">
                  <p class="mb-2 fw-bolder text-dark">{{ article.title }}</p>
                  <small class="text-spac text-secondary">{{ $filters.date(article.create_at) }}</small> 
                </div>
              </div>
            </a>
          </li>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script>
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default {
  inject: ['emitter', '$httpMessageState'],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // filterArticles: [],
      articles: [],
      // 文章數量
      articleCount: 1,
      // Swiper
      swiperOptions: {
        pagination: '.swiper-pagination',
      },
      breakpoints: {
        // 1920: {
        //   slidesPerView: 9,
        //   spaceBetween: 20,
        // },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    getArticles(page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.$http.get(api)
      .then((response) => {
        this.articles = response.data.articles;
        this.pagination = response.data.pagination;
      })
      .catch ((error) => {
        alert(error);
      })
    },
    viewArticle(articleId) {
      this.$router.push(`/artivle/${articleId}`);
    },
  },
}
</script>