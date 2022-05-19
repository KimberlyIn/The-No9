<template>
  <div>
    <swiper
      :autoplay="{
				delay:5000
			}"
      :scrollbar="{
        hide: true,
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>
        <img src="../assets/images/index-swiper-img-1.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/index-swiper-img-3.jpg" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import { Swiper, SwiperSlide, } from 'swiper/vue';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import Swiper2, {Autoplay} from 'swiper';
Swiper2.use([Autoplay]);

export default {
  inject: ['emitter', '$httpMessageState'],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
  data() {
    return {
      // Swiper
      swiperOptions: {
        pagination: '.swiper-pagination',

      },
    };
  },
}
</script>

<style>
.mySwiper {
  height:100vh;
}
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  /* background: #eee; */

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}



</style>