<template>
  <div>
    <!-- 精選文章 -->
    <div class="featured-articles">
      
    </div>
    <swiper
      :options="swiperOptions"
      :breakpoints="breakpoints"
      navigation
      :pagination="{ clickable: true }"
    >
      <!-- v-for="product in filterProducts" :key="product.id" -->
      <swiper-slide v-for="article in filterArticles" :key="article.id">
        <ul class="d-flex justify-content-between">
          <li>
            <!-- <div
              style="height: 100px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
            ></div> -->
            <div>
              <img :src="article.imageUrl" alt="">
            </div>
            <div>
              <p>{{ article.title }}</p>
              <p>日期</p>
            </div>
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
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    },
    // 限制項目偏數
    limitCount: {
      type: Number,
      default() {
        return 4;
      },
    },
    // 篩選文章
    filterArticle: {
      type: Object,
      default() {
        return {
          name: '',
          tag: '',
        };
      },
    },
  },
  data() {
    return {
      articles: [],
      filterArticles: [],
      recStr: '皮革日記',
      // 文章數量
      articleCount: 1,
      // Swiper
      swiperOptions: {
        pagination: '.swiper-pagination',
      },
      breakpoints: {
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
      currentPage: 1,
    };
  },
  mounted() {
    this.getArticles();
  },
  watch: {
    // 監聽是否有變動推薦產品
    filterArticle() {
      this.getArticles();
    },
  },
  methods: {
    getArticles(page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.$http.get(api)
      .then((response) => {
        if(response.data.success) {
          this.articles = response.data.articles;
          const recStrArticle = this.filterArticle.tag !== '' ? this.filterArticle.tag : '';
          // 取得精選文章
          this.articleCount = 0;
          this.filterArticles = [];

          this.articles.forEach((item) => {
            if(recStrArticle !== '') {
              if(item.id !== this.filterArticle.id && item.tag === resStrArticle) {
                if(this.articleCount < this.limitCount) {
                  const tempItem = { ...item};
                  this.filterArticles.push(tempItem);
                  this.articleCount += 1;
                }
              }
              // 如果文章包含 recStr 就加上去
            } else if (item.title.includes(this.recStr)) {
              // 文章比數限制
              if(this.articleCount < this.limitCount) {
                const tempItem = { ...item };
                this.filterArticles.push(tempItem);
                this.articleCount += 1;
              }
            }
          });
        } else {
          this.$httpMessageState(response, '取得精選文章');
        }
      })
      .catch ((error) => {
        alert(error);
      })
    }
  },
}
</script>