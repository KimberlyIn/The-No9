<template>
  <div style="background-color: #464646;padding: 80px 0;">
    <div class="container d-flex justify-content-center">
      <div>
        <div class="d-flex justify-content-center">
          <div class="d-flex mb-2">
            <div>
              <img src="@/assets/images/logo-light.png" alt="TheNo9-LOGO" style="width: 180px;" class="me-3" />
            </div>
            <div class="d-flex align-items-en">
              <router-link class="pt-3 text-light" to="/login">
                <small>| 後台登入</small>
              </router-link>
            </div>
          </div>
        </div>
        <div class="mb-4 text-center" style="letter-spacing: 3px;">
          <div>
            <small class="mb-1 text-light">本網站僅供個人作品使用，不提供商業用途</small>
          </div>
          <div>
            <small class="mb-0 text-light">THE NO.9 © 2022 COPYRIGHT</small>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="social-media">
            <ul class="clearfix">
              <li>
                <a class="rounded-circle" href="#" style="padding: 10px 14px;border: 1px solid #888888;">
                  <img src="@/assets/images/icon-facebook.png" alt="" style="width: 10px;">
                </a>
              </li>
              <li>
                <a class="rounded-circle" href="#" style="padding: 10px 9px;border: 1px solid #888888;">
                  <img src="@/assets/images/icon-material-email.png" alt="" style="width: 20px;">
                </a>
              </li>
              <li>
                <a class="rounded-circle" href="#" style="padding: 10px 9px;border: 1px solid #888888;">
                  <img src="@/assets/images/icon-awesome-instagram.png" alt="" style="width: 20px;">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.social-media li {
    float: left;
    padding-right: 10px;
}
</style>