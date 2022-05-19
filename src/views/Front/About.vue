<template>
  <div class="animate__animated animate__fadeIn">
    <div class="about">
      <div class="about-header-img"></div>
      <div class="container animate__animated animate__fadeInUp">
        <div class="row px-3 text-center">
          <div class="col-12 describe">
            <div>
              <h1 class="text-color-60 pb-4">THE NO.9</h1>
              <p class="pb-5">
                記得當時只是想讓自己的學分快點修滿，可以爽爽的度過整個大四，於是選了一堂好像有點新奇的課，直到開始跟著慢慢製作，突然做出了興趣。
                <br>
                <br>
                在這個過程中，發現皮革的製作是一件極需耐心的事，因為其實皮革很脆弱，需要繁雜的製作過程與步驟，縫製與雕刻更是需要小心翼翼，雖然這過程常常會搞的自己很累，但是完成後真的是有被自己與這個皮件感動到，於是漸漸的做完一件，又再繼續下一件，然後就這麼開始了製作皮件這件事。
                <br>
                <br>
                我對於皮革的想法是，皮革和酒一樣，越沉會越香，不論是氣味或者外觀，用的越久越是呈現自然的色澤與紋路，使用起來也是會慢慢的順著我們的使用方式，變的越來越好用，如果有正確的使用習慣，其實皮革是非常耐久與耐用的。另外，我也覺得皮革是一件很美的東西，不論用在哪裡都是那麼賞心悅目。
                <br>
                <br>
                我希望只要自己有時間都能夠繼續的製作皮件，讓我的皮革人生可以持續下去。
              </p>
            </div>
            <div class="mt-5">
              <div class="about-middle-img"></div>
            </div>
          </div>
          <div class="col-12">
            <div class="copyright">
              <div>
                <div class="icon-copyright pb-3">
                  <img src="@/assets/images/icon-copyright.png" alt="" style="width: 50px;">
                </div>
                <h3 class="mb-4">版權宣告</h3>
                <p class="mb-1">THE NO.9 網站 <span class="fw-bold">圖片</span> 及 <span class="fw-bold">文字</span> 僅供個人作品集使用，不提供轉載、引用及商業用途。</p>
                <p>圖片來源：THE NO.9、unsplash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['emitter', '$httpMessageState'],
  mounted() {
    this.emitter.emit('page-loading', true);
    setTimeout(() => {
      this.emitter.emit('page-loading', false);
    }, 1000);
  },
}
</script>

