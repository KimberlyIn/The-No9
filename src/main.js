import { createApp } from 'vue';

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
// import style (>= Swiper 5.x)
// import 'swiper/css/swiper.css'

import 'bootstrap';
import 'animate.css';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// import aos
import Aos from 'aos';
import 'aos/dist/aos.css';
// vue3-loading-overlay
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
// vee-validate 主套件
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import $httpMessageState from '@/methods/pushMessageState';

import App from './App.vue';
import router from './router';

// import Alert
import Alert from './components/Backend/Alert.vue';

// 初始化Aos
Aos.init();

import { date, currency } from './methods/filters';

// 定義驗證規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);
app.config.globalProperties.$filters = {
  date,
  currency,
};

app.config.globalProperties.$httpMessageState = $httpMessageState;

app.use(router);
app.use(VueAxios, axios);
app.use(VueAwesomeSwiper);
app.component('Loading', Loading);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('Alert', Alert);
app.mount('#app');
