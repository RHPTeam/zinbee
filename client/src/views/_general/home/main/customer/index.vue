<template>
  <section id="customer" class="customer">
    <div class="ct">
      <div class="r">
        <div
          class="c_lg_5 left c_md_12 mb_md_3"
          :style="{
                backgroundImage: 'url(' + backgroundCustomer + ')'
              }"
        >
          <div class="title--section">Ý kiến của khách hàng</div>
          <div class="desc">
            Những phản hồi tích cực của khách hàng đã sử dụng Zinbee
          </div>
        </div>
        <!-- Satrt: Slider -->
        <div class="c_lg_7 c_md_12 right">
          <div class="slider">
            <transition name="slide-fade">
              <div class="items" v-if="currentIndex === 1">
                <div class="introduce--customer d_flex align_items_center">
                  <div>
                    <img
                      src="@/assets/images/home/NQK.jpg"
                      alt="Banner ZinBee"
                    />
                  </div>
                  <div>
                    <h5>Quang Khải</h5>
                    <p>Doanh nhân - Diễn Giả</p>
                  </div>
                </div>
                <div class="desc">
                  Tôi đã tiết kiệm được rất nhiều thời gian kể từ khi sử
                  dụng Zinbee, tôi không phải lo nghĩ lúc nào cũng phải ngồi
                  đăng bài, kết bạn,... thật sự tuyệt vời.
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="items" v-if="currentIndex === 2">
                <div class="introduce--customer d_flex align_items_center">
                  <div>
                    <img
                      src="@/assets/images/home/NTL.jpg"
                      alt="Banner ZinBee"
                    />
                  </div>
                  <div>
                    <h5>Thùy Linh</h5>
                    <p>Kinh doanh mỹ phẩm</p>
                  </div>
                </div>
                <div class="desc">
                  Trước kia lúc nào tôi cũng phải vội vàng sắp xếp thời gian
                  để đăng bài, tương tác, lên từng page, group, từ khi có
                  Zinbee, mọi thứ thật đơn giản.
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="items" v-if="currentIndex === 3">
                <div class="introduce--customer d_flex align_items_center">
                  <div>
                    <img
                      src="@/assets/images/home/NHL.jpg"
                      alt="Banner ZinBee"
                    />
                  </div>
                  <div>
                    <h5>Huy Lâm</h5>
                    <p>Giám đốc kinh doanh</p>
                  </div>
                </div>
                <div class="desc">
                  Hiệu quả công việc của công ty tôi tăng lên rõ rệt từ khi
                  sử dụng Zinbee, cám ơn Zinbee rất nhiều, tôi chắc chắn sẽ
                  sử dụng Zinbee cho tất cả các đại lý của tôi.
                </div>
              </div>
            </transition>
          </div>
          <div
            class="position_absolute action--slider d_flex align_items_center"
          >
                <span
                  @click="prev"
                  class="prev action"
                  v-if="currentIndex !== 1"
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
              @click="next"
              class="next ml_auto action"
              v-if="currentIndex !== 3"
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
          <div class="action text_center">
            <ul>
              <li
                :class="[currentIndex === 1 ? 'active' : '']"
                @click="currentIndex = 1"
              ></li>
              <li
                :class="[currentIndex === 2 ? 'active' : '']"
                @click="currentIndex = 2"
              ></li>
              <li
                :class="[currentIndex === 3 ? 'active' : '']"
                @click="currentIndex = 3"
              ></li>
            </ul>
          </div>
        </div>
        <!-- End: Slider -->
      </div>
    </div>
  </section>
</template>

<script src="../index.script.js"></script>

<style scoped lang="scss">
@import "../index.style";
</style>
