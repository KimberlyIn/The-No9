<template>
  <div>
    <div class="menu">
      <div class="container">
        <div>
          <div>
            <h5>時尚皮藝 Leather</h5>
          </div>
          <div class="pos-rel">
            <div
              class="nav-icons me-2 d-none d-md-block"
              style="z-index: 1;"
            >
              <div class="nav-search rounded-pill"
                :class="isFocus ? 'expand' : ''">
                <Search :role="isFocus ? '' : 'button'"
                  @click="isFocus = true"></Search>
                <input type="text" class="form-control" placeholder="商品名稱"
                  v-model.trim.number="searchInput"
                  ref="searchInput"
                  @keyup.up="key--"
                  @keyup.down="key++"
                >
                <i class="bi bi-x material-icons fs-5" role="button"
                  @click="isFocus = false,
                    searchInput = ''"></i>
                <div class="search-list shadow rounded-1" v-if="filterSearchDatas.length > 0">
                  <ul class="list-unstyled m-0">
                    <li class="p-2" role="button"
                      v-for="(item, index) in filterSearchDatas" :key="item.id"
                      @click="toggleList(index)">
                      {{ item.title }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-category">
          <ul>
            <li
              class="btn btn-outline-primary"
              :class="isActive === 'all' ? 'active' : ''"
              @click="filterProducts(1, 'all'), (isActive = 'all')"
              v-if="products.length > 0"
            >
              <router-link
                :to="{ query: { category: 'all', page: 1 } }"
              >
                全部
              </router-link>
            </li>
            <li
              class="btn btn-outline-primary"
              v-for="(item, i) in category"
              :key="i"
              :class="isActive === item ? 'active' : ''"
              @click="filterProducts(1, item), (isActive = item)"
            >
              <router-link
                :to="{ query: { category: item, page: 1 } }"
              >
                {{ item }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="product-col row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div class="col" v-for="item in filterDatas" :key="item.id">
            <div 
              class="pos-rel product-img"
              style="height: 300px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
              @click.prevent="viewProduct(item.id)"
              role="button"
            >
              <div class="dark-bg">
                <small class="px-2 py-2">查看內容</small>
              </div>
              <span class="sale" v-if="item.price < item.origin_price">On Sale !!</span>
              
            </div>
            <div class="text-center my-4">
              <h6 class="fw-bold">{{ item.title }}</h6>
              <div>
                <div class="fs-5">
                  <small :class="item.price < item.origin_price ? 'del' : ''"
                    >$ {{ $cash(item.origin_price) }} NTD</small
                  >
                </div>
                <div class="price mb-3">
                  <span v-if="item.price < item.origin_price"
                    >$ {{ $cash(item.price) }}&nbsp;</span
                  >
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-primary mb-4"
                  @click.prevent="getCart(item.id)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <Pagination :pages="pages" @get-datas="filterProducts"/>
      </div>
    </div>

  </div>
</template>

<script>
import { navigator } from '@/scripts/methods';
import Search from '@/components/IconSearch.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  inject: ['emitter', '$httpMessageState'],
  components: {
    Search,
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      products: [],
      pages: [],
      category: [],
      filterDatas: [],
      tempArry: [],
      isActive: 'all',
      path: { 
        category: '',
        page: '',
      },
      // 搜尋
      filterSearchDatas: [],
      searchInput: '',
      key: -1,
      oldKey: 0,
      pos: 0,
      isFocus: false,
      scroll: {},
      // 提示
      tips: {
        data: {
          success: false,
          message: '糟糕，目前沒有可以更新的商品喔。',
        },
      },
    };
  },
  methods: {
    // 取得所有商品
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http
      .get(api)
      .then((response) => {
        if(response.data.success) {
          this.products = response.data.products;
          // 抓出分類
          const arry = this.products.map((item) => item.category);
          const newSet = new Set(arry);
          this.category = [...newSet];
          this.filterProducts(this.path.page, this.path.category);
        } else {
          this.$httpMessageState(response, '商品取得');
        }
      })
      .catch(() => {
        this.$httpMessageState(this.tips, '商品清單更新');
      })
    },
    // 加入購物車
    getCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty,
      };
      this.$http
      .post(api, { data: cart })
      .then((response) => {
        if(response.data.success){
          this.$httpMessageState(response, '加入購物車');
          this.emitter.emit('get-cart');
        } else {
          alert(response.data.message);
        }
      })
      .catch(()=>{
        this.$httpMessageState(this.tips, '商品清單更新');
      })
    },
    getPath() {
      // 抓取分類，並執行判斷條件，然後賦予到路由裡面的分類屬性
      this.path.category = this.$route.query.category || 'all';
      this.path.page = this.$route.query.page || 1;
      // 比較後的結果再賦予到 isActive
      this.isActive = this.path.category;
    },
    filterProducts(page = 1) {
      this.getPath();
      if (this.path.category === 'all') {
        this.tempArry = this.products;
      } else {
        this.tempArry = this.products.filter(
          (item) => item.category === this.path.category,
        );
      }
      const newNavigator = navigator(page, this.tempArry);
      this.pages = newNavigator.pages;
      this.filterDatas = newNavigator.newArray;
      // 跳往頁面
      this.$router.push(
        `./menu?category=${this.path.category}&page=${page}`,
      );
    },
    // 搜尋
    filterSearchProducts() {
      const keyword = this.searchInput;
      this.key = -1;
      if (!keyword) {
        this.filterSearchDatas = '';
        return;
      }
      const result = this.products.filter((item) => item.title.match(keyword));
      if (result) {
        this.filterSearchDatas = result;
      } else {
        this.filterSearchDatas = '';
      }
    },
    // 搜尋
    toggleList(index) {
      if (index >= 0) {
        this.key = index;
      }
      const list = document.querySelectorAll('.search-list li');
      const option = this.filterSearchDatas.filter(
        (item) => item.title === list[this.key].textContent,
      );

      if (option.length > 0) {
        const { id } = option[0];
        this.$router.push(`/product/${id}`);
        this.searchInput = '';
        this.filterSearchDatas = [];
        this.key = -1;
        this.isFocus = false;
      } else {
        this.$httpMessageState(this.tips, '商品清單更新');
      }
    },
    // 搜尋後會有選單 ( Option )
    selectOption() {
      const list = document.querySelectorAll('.search-list li');
      list.forEach((item, idx) => {
        const newItem = item;
        item.classList.remove('curr');
        this.pos = item.offsetHeight;
        if (idx === this.key) {
          newItem.classList.add('curr');
        }
      });
    },
    scrollList() {
      const wrap = document.querySelector('.search-list');
      const num = this.key;
      if (num < 0 || this.oldKey < 0) {
        this.key = 0;
        return;
      }
      if (num >= this.filterSearchDatas.length - 1) {
        this.key = this.filterSearchDatas.length - 1;
        return;
      }
      if (num % 4 === 0 || this.oldKey > num) {
        wrap.scrollTop = this.pos * this.key;
      }
    },
    // 檢視商品詳細資訊
    viewProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
  },
  watch: {
    $route: {
      handler(val) {
        if (val.name === 'Products') {
          this.filterProducts(val.query.page || 1, val.query.category || 'all');
        }
      },
      deep: true,
    },
    datas() {
      this.getProducts();
    },
    searchInput() {
      this.filterSearchProducts();
    },
    key(val, oldVal) {
      this.selectOption();
      this.oldKey = oldVal;
      this.scroll = this.scrollList(val);
    },
  },
  mounted() {
    this.getPath();
    this.getProducts();
    // 搜尋
    window.addEventListener('scroll', this.scrollList);
    this.$refs.searchInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.toggleList();
        window.removeEventListener('scroll', this.scroll);
      }
    });
    // loading
    this.emitter.emit('page-loading', true);
    setTimeout(() => {
      this.emitter.emit('page-loading', false);
    }, 1000);
  }
};
</script>