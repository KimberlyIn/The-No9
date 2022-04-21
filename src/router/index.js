import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    component: () => import('@/views/Front.vue'),
    children: [
      // 首頁
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/Front/Index.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/Front/About.vue'),
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/Front/Menu.vue'),
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('@/views/Front/Blog.vue'),
      },
      {
        path: 'artivle/:articleId',
        component: () => import('@/views/Front/BlogArticle.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/Front/Order.vue'),
      },
      {
        path: 'product/:productId',
        name: 'product',
        component: () => import('@/views/Front/product.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  // 後台
  {
    path: '/admin',
    component: () => import('@/views/Backend/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'products',
        component: () => import('@/views/Backend/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/Backend/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('@/views/Backend/Coupons.vue'),
      },
      {
        path: 'articles',
        component: () => import('@/views/Backend/Articles.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
