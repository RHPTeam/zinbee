<template>
  <section id="utilities" class="utilities ct">
    <div class="section--title-content mb_0">
      <h3 class="title">Tại sao nên chọn ZinBee ?</h3>
    </div>
    <div class="d_none d_md_block">
      <div class="options mb_4 d_none">
        <div class="d_flex first">
          <div
            class="title"
            :class="[currentIndexInfo === 1 ? 'active' : '']"
            @click="currentIndexInfo = 1"
          >
            <p>01. Giao diện thân thiện</p>
          </div>
          <div
            class="title"
            :class="[currentIndexInfo === 2 ? 'active' : '']"
            @click="currentIndexInfo = 2"
          >
            <p>02. Nội dung đa dạng</p>
          </div>
        </div>
        <div class="d_flex second">
          <div
            class="title"
            :class="[currentIndexInfo === 3 ? 'active' : '']"
            @click="currentIndexInfo = 3"
          >
            <p>03. Tự động hóa</p>
          </div>
          <div
            class="title"
            :class="[currentIndexInfo === 4 ? 'active' : '']"
            @click="currentIndexInfo = 4"
          >
            <p>04. Rất nhiều tính năng khác</p>
          </div>
        </div>
      </div>
      <div class="content--options position_relative pt_4">
        <div class="px_3 slide--image">
          <transition name="slide-fade">
            <div class="items display d_flex" v-if="currentIndexInfo === 0">
              <div class="left text">
                <div class="title--why">Giao diện thân thiện</div>
                <div class="desc">
                  Đội ngũ Zinbee không ngừng cải tiến, nâng cấp nhằm xây dựng
                  một hệ thống tiện lợi nhất cho người dùng
                </div>
              </div>
              <div
                class="right order"
                :style="{
                  backgroundImage: 'url(' + sliderUtilities[0] + ')'
                }"
              ></div>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="content items d_flex" v-if="currentIndexInfo === 1">
              <div class="left text">
                <div class="title--why">Nội dung đa dạng</div>
                <div class="desc">
                  Kho nội dung được cập nhật tiên lục, đem đến sự lựa chọn dễ
                  dàng và phù hợp cho khách hàng.
                </div>
              </div>
              <div
                class="right order"
                :style="{
                  backgroundImage: 'url(' + sliderUtilities[1] + ')'
                }"
              ></div>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="automation items d_flex" v-if="currentIndexInfo === 2">
              <div class="right text">
                <div class="title--why">Tự động hóa</div>
                <div class="desc">
                  Bạn sẽ có nhiều thời gian hơn với hệ thống tự động hóa của
                  Zinbee, mọi thứ chỉ cần setup và Zinbee sẽ thay bạn thực hiện
                  bất kể ngày hay đêm
                </div>
              </div>
              <div
                class="left order"
                :style="{
                  backgroundImage: 'url(' + sliderUtilities[2] + ')'
                }"
              ></div>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="function items d_flex" v-if="currentIndexInfo === 3">
              <div class="left text">
                <div class="title--why">Rất nhiều tính năng khác</div>
                <div class="desc">
                  Hàng chục tính năng khác luôn được update liên tục, đem tới
                  những tiện ích tối ưu nhất cho khách hàng của Zinbee
                </div>
              </div>
              <div
                class="right order"
                :style="{
                  backgroundImage: 'url(' + sliderUtilities[3] + ')'
                }"
              ></div>
            </div>
          </transition>
        </div>
        <div class="action text_center">
          <ul>
            <li
              :class="[currentIndexInfo === 0 ? 'active' : '']"
              @click="currentIndexInfo = 0"
            ></li>
            <li
              :class="[currentIndexInfo === 1 ? 'active' : '']"
              @click="currentIndexInfo = 1"
            ></li>
            <li
              :class="[currentIndexInfo === 2 ? 'active' : '']"
              @click="currentIndexInfo = 2"
            ></li>
            <li
              :class="[currentIndexInfo === 3 ? 'active' : '']"
              @click="currentIndexInfo = 3"
            ></li>
          </ul>
        </div>
        <div
          class="position_absolute action--slider-info d_flex align_items_center"
        >
          <span
            class="prev action"
            @click="prevInfo"
            v-if="currentIndexInfo !== 0"
          >
            <icon-base
              class="icon--arrow-left"
              icon-name="Prev"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-arrow-left></icon-arrow-left>
            </icon-base>
          </span>
          <span
            class="next ml_auto action"
            @click="nextInfo"
            v-if="currentIndexInfo !== 3"
          >
            <icon-base
              class="icon--arrow-left"
              icon-name="Next"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-arrow-left></icon-arrow-left>
            </icon-base>
          </span>
        </div>
      </div>
    </div>
    <div class="d_md_none d_block">
      <div class="content--options px_3">
        <div class="items display mb_4">
          <div class="title--why">Giao diện thân thiện</div>
          <div class="desc mb_2">
            Đội ngũ Zinbee không ngừng cải tiến, nâng cấp nhằm xây dựng một hệ
            thống tiện lợi nhất cho người dùng
          </div>
          <div
            class="right order"
            :style="{
              backgroundImage: 'url(' + sliderUtilities[0] + ')'
            }"
          ></div>
        </div>

        <div class="content items mb_4">
          <div class="title--why">Nội dung đa dạng</div>
          <div class="desc mb_2">
            Kho nội dung được cập nhật tiên lục, đem đến sự lựa chọn dễ dàng và
            phù hợp cho khách hàng.
          </div>
          <div
            class="right order"
            :style="{
              backgroundImage: 'url(' + sliderUtilities[1] + ')'
            }"
          ></div>
        </div>

        <div class="automation items mb_4">
          <div class="title--why">Tự động hóa</div>
          <div class="desc mb_2">
            Bạn sẽ có nhiều thời gian hơn với hệ thống tự động hóa của Zinbee,
            mọi thứ chỉ cần setup và Zinbee sẽ thay bạn thực hiện bất kể ngày
            hay đêm
          </div>

          <div
            class="right order"
            :style="{
              backgroundImage: 'url(' + sliderUtilities[2] + ')'
            }"
          ></div>
        </div>

        <div class="function items mb_4">
          <div class="title--why">Rất nhiều tính năng khác</div>
          <div class="desc mb_2">
            Hàng chục tính năng khác luôn được update liên tục, đem tới những
            tiện ích tối ưu nhất cho khách hàng của Zinbee
          </div>
          <div
            class="right order"
            :style="{
              backgroundImage: 'url(' + sliderUtilities[3] + ')'
            }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="../index.script.js"></script>

<style scoped lang="scss">
@import "../index.style";
</style>
