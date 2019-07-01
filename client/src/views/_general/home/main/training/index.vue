<template>
  <section id="training" class="training position_relative px_3">
    <div class="section--title-content">
      <h3 class="title">Đào tạo thường xuyên về marketing</h3>
      <h4 class="desc d_md_block">
        Được cung cấp các tài liệu, kiến thức, hỗ trợ kinh doanh và cách vận
        dụng công cụ vào kinh doanh bán hàng
      </h4>
    </div>
    <div class="slider--training ct">
      <!-- <transition name="slide--img" v-for="(item, index) in imageTraining" :key="index">
        <div
          class="img--training"
          :style="{
            backgroundImage: 'url(' + item + ')'
          }"
          v-if="currentSliderTraining === index"
        ></div>
      </transition>-->
      <div class="d_flex items">
        <div
          class="img--training"
          :style="{
                backgroundImage: 'url(' + imageTraining[0] + ')'
              }"
        ></div>
        <div
          class="img--training"
          :style="{
                backgroundImage: 'url(' + imageTraining[1] + ')'
              }"
        ></div>
      </div>
      <div class="d_flex items">
        <div
          class="img--training"
          :style="{
                backgroundImage: 'url(' + imageTraining[2] + ')'
              }"
        ></div>
        <div
          class="img--training"
          :style="{
                backgroundImage: 'url(' + imageTraining[3] + ')'
              }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script src="../index.script.js"></script>

<style scoped lang="scss">
@import "../index.style";
</style>
