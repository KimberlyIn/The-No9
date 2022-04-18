<template>
  <Loading :active="isLoading" :z-index="1070"></Loading>
  <ToastMessages></ToastMessages>
  <Navbar />
  <div class="main-container">
    <router-view></router-view>
  </div>
  
</template>

<script>
import Navbar from '../components/Navbar.vue';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    Navbar,
    ToastMessages,
  },
  // 這裡有外層的 provide 要移到內層，provide 可以解釋成「提供」，inject 可以解釋成「注入」
  // 這個地方的意思就是，我們要把 eventBus.js 從外面注入到這裡
  // eventBus.js 裡面，mitt() 被定義成 emitter，因此最後被注入的名稱即為 emitter
  // 問題：這邊有個疑問是，我們知道 provide 是提供，inject 是注入，但是在這裡沒有看到 provide 資料
  // inject:['emitter'],
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    // 調整切換頁面效果 (載入效果)
    changeLoadingStatus(status) {
      this.isLoading = status;
    },
  },
  mounted() {
    this.emitter.on('change-isLoading', (status) => {
      this.changeLoadingStatus(status);
    });
  },
  unmounted() {
    this.emitter.off('change-isLoading', (status) => {
      this.changeLoadingStatus(status);
    });
  },
}
</script>