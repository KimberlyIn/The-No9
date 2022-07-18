<template>
  <div 
    class="loading bouncebag" 
    ref="loading" 
    :class="isLoading ? '' : 'fade'"
  >
    <i class="fas fa-2x fa-shopping-bag bag"></i>
    <span>loading</span>
  </div>
  <ToastMessages></ToastMessages>
  <Navbar />
  <div class="main-container">
    <router-view></router-view>
  </div>
  <Footer ref="footer" />
  <div id="scrollTop" role="button" class="px-2 py-1 rounded-1 fade d-none" ref="scrollTop"
    @click="scrollToTop">
    <span class="material-icons">
      <i class="bi bi-caret-up-fill"></i>
    </span>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ToastMessages from '@/components/ToastMessages.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    ToastMessages,
    Footer,
  },
  inject: ['emitter'],
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    scrollBtnPos() {
      const half = this.$refs.footer.offsetWidth / 2;
      this.$refs.scrollTop.style.marginRight = `-${half - 16}px`;
      this.showScrollBtn();
    },
    showScrollBtn() {
      if (window.pageYOffset > 0 || window.scrollY > 0) {
        this.$refs.scrollTop.classList.remove('d-none');
        this.$refs.scrollTop.classList.add('show');
      } else {
        this.$refs.scrollTop.classList.remove('show');
        setTimeout(() => {
          this.$refs.scrollTop.classList.add('d-none');
        }, 100);
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    this.emitter.on('page-loading', (val) => {
      const body = document.querySelector('body');
      this.isLoading = val;
      if (val) {
        this.$refs.loading.classList.remove('d-none');
        body.setAttribute('class', 'mh-100vh overflow-hidden');
      } else {
        setTimeout(() => {
          this.$refs.loading.classList.add('d-none');
          body.setAttribute('class', '');
        }, 200);
      }
    });

    this.scrollBtnPos();
    window.addEventListener('scroll', this.showScrollBtn);
    window.addEventListener('resize', this.scrollBtnPos);
  },
  unmounted() {
    window.removeEventListener('scroll', this.showScrollBtn);
    window.removeEventListener('resize', this.scrollBtnPos);
  },
}
</script>