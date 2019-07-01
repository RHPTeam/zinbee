<template>
  <div
    class="banner position_relative"
    :style="{
      backgroundImage: 'url(' + backgroundTool + ')'
    }"
  >
    <div class="ct m_auto position_relative content d_flex content">
      <div class="left">
        <div class="title">
          VŨ KHÍ KHÔNG THỂ THIẾU CHO BÁN HÀNG TRÊN FACEBOOK
        </div>
        <div class="desc">
          TỰ ĐỘNG TÌM KIẾM NỘI DUNG VÀ CHĂM SÓC 100+ TRANG, NHÓM, TRANG CÁ NHÂN
          TRÊN FACEBOOK CHỈ VỚI VÀI THAO TÁC
        </div>
        <div class="register" @click="goToSignUp">TRẢI NGHIỆM NGAY</div>
      </div>
      <div class="right">
        <div
          class="image--banner"
          :style="{
            backgroundImage: 'url(' + backgroundBanner + ')'
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped lang="scss">
@import "../index.style";
</style>
