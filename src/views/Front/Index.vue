<template>
  <div class="index" style="z-index: 0;">
    <div class="index-container">
      <div>
        <div class="index-title">
          <h1>THE NO.9</h1>
          <p class="letter-spacing-2">In order to be irreplaceable one must always be different.</p>
        </div>
        <div class="nav">
          <ul>
            <li>
              <router-link class="text-center" to="/about">
                <h5 class="m-0 letter-spacing-2">關於我們</h5>
                <p class="letter-spacing-2">About Us</p>
              </router-link>
            </li>
            <li>
              <router-link class="text-center" to="/menu">
                <h5 class="m-0 letter-spacing-2">精緻皮件</h5>
                <p class="letter-spacing-2">Leather</p>
              </router-link>
            </li>
            <li class="blog">
              <router-link class="text-center" to="/blog">
                <h5 class="m-0 letter-spacing-2">部落格</h5>
                <p class="letter-spacing-2">Blog</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="index-swiper">
      <a 
        href="#introduction-leather-coupon" 
        class="toggle-down text-white animate__animated animate__bounce" 
        @click.prevent="toTarget('introduction-leather-coupon')"
      >
        <i class="bi bi-arrow-down-circle fs-1 text-white"></i>
      </a>
      <div>
        <IndexSwiper/>
      </div>
    </div>
    
    <div id="introduction-leather-coupon" class="bg">
      <IntroductionLeatherCoupon />
    </div>
    <div class="subscription">
      <div class="d-flex bg-cover booking text-light flex-column subscription-bg justify-content-center">
        <div class="d-flex flex-column align-items-center">
          <p class="subscription-text col-lg-4 text-center mb-4" style="line-height: 2;">
            若您購買過我們的商品，認為這是個美好的體驗，並且希望了解 The No.9 更多資訊，歡迎訂閱我們的消息，不會錯過我們的優惠及服務。
          </p>
          <Form class="container row g-2 g-md-0 px-5 w-md-60
            d-md-flex justify-content-md-center"
            :class="show ? '' : 'd-none d-md-none'"
            v-slot="{ errors }" @submit="onSubmit" id="subscribe">
            <p class="input-p col-12 col-md-8 col-lg-4 m-0 me-md-3">
              <Field type="email" id="email" name="Email"
              class="form-control ls-2 ms-auto"
              :class="{ 'is-invalid': errors['Email'] }"
              :disabled="idDisabled"
              placeholder="name@example.com"
              rules="email|required"
              inputmode="email"
              v-model="email"></Field>
              <ErrorMessage name="Email"
              class="invalid-feedback position-md-absolute">
              </ErrorMessage>
            </p>
            <button type="submit" class="btn btn-primary col-12 col-md-3 col-lg-2"
            :disabled="idDisabled"
            @submit="onSubmit">
              訂閱
              <Spinner :spin-item="email" />
            </button> 
          </Form>
          <p class="text-warning ls-2 fade" v-if="email" ref="done">
            {{ email }} 已訂閱電子報 <i class="far fa-check-circle"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IntroductionLeatherCoupon from '@/components/IntroductionLeatherCoupon.vue';
import IndexSwiper from '@/components/IndexSwiper.vue';
import fadeInMix from '@/mixins/FadeInMix.vue';
import $ from 'jquery';

export default {
  components: {
    IndexSwiper,
    IntroductionLeatherCoupon,
  },
  emits: ['page-loading', 'push-message', 'toggle-spinner'],
  inject: ['emitter'],
  mixins: [fadeInMix],
  data() {
    return {
      promote: [],
      email: '',
      idDisabled: false,
      show: true,
    };
  },
  mounted() {
    this.emitter.emit('page-loading', true);
    setTimeout(() => {
      this.emitter.emit('page-loading', false);
    }, 1000);
  },
  methods: {
    toTarget(target){
      const gettop=$(`#${target}`).offset().top-0;
      if (target) {
        // jquery 將元素頂部動畫到滾動頂部代碼示例
        $('html,body').animate({ scrollTop: gettop }, 1000);
      }
    },
    onSubmit() {
      this.idDisabled = true;
      this.$emitter.emit('toggle-spinner', this.email);
      setTimeout(() => {
        this.idDisabled = false;
        this.$emitter.emit('toggle-spinner', false);
        this.$refs.done.classList.add('show');
        this.show = false;
      }, 1500);
    },
  },
};
</script>
