<template>
  <div class="main-div d-flex px-4">
    <div class="col-4 px-3 my-3 text-center flex-grow-1">
      <div class="item d-flex align-items-center justify-content-evenly">
        <div class="title">
          <h1>關於我們</h1>
          <p class="col-4-p">About Us</p>
          <router-link to="/about">
            <button type="button" class="discolor-button">了解更多</button>
          </router-link>
        </div>        
        <img src="https://i.ibb.co/72M3wFL/IMG-3831.jpg" alt="">
      </div>
    </div>
    <div class="col-4 px-3 my-3 text-center flex-grow-1">
      <div class="item d-flex align-items-center justify-content-evenly">
        <div class="title">
          <h1 class="text-light">時尚皮藝</h1>
          <p class="text-light col-4-p">Leather</p>
          <router-link to="/menu">
            <button type="button" class="discolor-button-light">了解更多</button>
          </router-link>
        </div>        
        <img src="https://i.ibb.co/MBk9h5z/IMG-6330.jpg" alt="">
      </div>
    </div>
    <div class="col-4 px-3 my-3 text-center flex-grow-1">
      <div class="item d-flex align-items-center justify-content-evenly">
        <div class="title">
          <h1>部落格</h1>
          <p class="col-4-p">Blog</p>
          <router-link to="/blog">
            <button type="button" class="discolor-button">了解更多</button>
          </router-link>
        </div>        
        <img src="https://i.ibb.co/8XgfjR2/IMG-4462.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
    };
  },
};
</script>

<style>
.navbar {
  display: none;
}
</style>