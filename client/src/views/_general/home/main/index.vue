<template>
  <div class="wrapper--main">
    <!-- Start: banner -->
    <section
      class="banner text_center"
      :style="{
        backgroundImage: 'url(' + backgroundBanner + ')'
      }"
    >
      <div class="ct m_auto position_relative content">
        <div class="title">
          <h1 class="hero-title" ref="showTyped">
            <span class="test"></span>
          </h1>
        </div>
        <div class="desc">
          TỰ ĐỘNG TÌM KIẾM NỘI DUNG VÀ CHĂM SÓC 100+ TRANG, NHÓM, TRANG CÁ NHÂN
          TRÊN FACEBOOK VÀI THAO TÁC
        </div>
        <div class="register m_auto d_flex" @click="goToSignUp">
          TRẢI NGHIỆM NGAY
        </div>
        <img
          class="image--introduce mt_5"
          src="@/assets/images/home/banner.jpg"
          alt="Banner ZinBee"
        />
      </div>
    </section>
    <!-- End: Banner -->

    <div class="content">
      <!-- Start:  introduce-->
      <!-- <section class="introduce text_center ct">
        <div class="section--title-content">
          <h3 class="title">ZINBEE GIÚP BẠN ĐƯỢC NHỮNG GÌ</h3>
          <h4 class="desc">
            TỰ ĐỘNG TÌM KIẾM NỘI DUNG VÀ CHĂM SÓC 100+ TRANG, NHÓM, TRANG CÁ NHÂN TRÊN FACEBOOK VÀI THAO TÁC
          </h4>
        </div>
        <div class="r content">
          <div class="c_lg_4 items mb_md_3">
            <div class="heading">
              <div class="bg--icon">
                <icon-base
                  icon-name="close"
                  width="50"
                  height="50"
                  viewBox="0 0 500 500"
                >
                  <icon-provider />
                </icon-base>
              </div>
              <div class="title">CUNG CẤP KHO NỘI DUNG</div>
            </div>
            <div class="desc">
              Zinbee sẽ cung cấp cho bạn các nội dung hot, nổi bật, nhiều lượt tương tác
              nhất trên facebook
            </div>
          </div>
          <div class="c_lg_4 items mb_md_3">
            <div class="bg--icon">
              <icon-base
                icon-name="close"
                width="50"
                height="50"
                viewBox="0 0 500 500"
              >
                <icon-automatic />
              </icon-base>
            </div>
            <div class="title">TỰ ĐỘNG HÓA</div>
            <div class="desc">
              Zinbee sẽ giúp bạn tự động hoá chăm sóc tài khoản, tự động tương
              tác trên facebook.
            </div>
          </div>
          <div class="c_lg_4 items mb_md_3">
            <div class="bg--icon">
              <icon-base
                icon-name="close"
                width="50"
                height="50"
                viewBox="0 0 500 500"
              >
                <icon-world />
              </icon-base>
            </div>
            <div class="title">NHIỀU TÍNH NĂNG VƯỢT TRỘI</div>
            <div class="desc">
              Và hàng chục tính năng hấp dẫn khác có thể hỗ trợ bạn bán hàng
              trên Facebook.
            </div>
          </div>
        </div>
      </section>-->
      <!-- End:  introduce-->

      <!-- Start: tool -->
      <section id="tool" class="tool">
        <div class="ct">
          <div class="section--title-content">
            <h3 class="title">Công cụ hỗ trợ marketing – bán hàng</h3>
            <div class="desc">
              Zinbee cung cấp bộ công cụ giúp quản lý cũng như tự động nhiều
              hoạt động trong quá trình làm marketing, bán hàng và tương tác với
              khách hàng trên Facebook.
            </div>
          </div>
          <div class="r content mb_md_3">
            <div class="c_lg_6 c_md_12 mb_md_3 left">
              <!-- <img :src="imageTool1" alt> -->
              <div
                class="marketing--section-image"
                :style="{
                  backgroundImage: 'url(' + benefit + ')'
                }"
              ></div>
            </div>
            <div class="c_lg_6 c_md_12 right position_relative">
              <div class="title--content">
                Những tính năng nổi trội của Zinbee
              </div>
              <div class="items d_flex align_items_center">
                <div class="icon">
                  <icon-base
                    icon-name="close"
                    width="50"
                    height="50"
                    viewBox="0 0 70 70"
                  >
                    <icon-database />
                  </icon-base>
                </div>
                <div class="text">
                  <p>
                    Zinbee cung cấp kho content mẫu đa dạng, cùng tính năng đăng
                    bài theo chiến dịch. Sau khi thiết lập chiến dịch, các bài
                    đăng sẽ được đăng tự đông theo giờ đã cài đặt sặn
                  </p>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="icon">
                  <icon-base
                    icon-name="close"
                    width="50"
                    height="50"
                    viewBox="0 0 500 500"
                  >
                    <icon-search-auto />
                  </icon-base>
                </div>
                <div class="text">
                  <p>
                    Tự động tăng tương tác với khách hàng. Lọc và xây dựng tệp
                    khách hàng tiềm năng.
                  </p>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="icon">
                  <icon-base
                    icon-name="close"
                    width="50"
                    height="50"
                    viewBox="0 0 500 500"
                  >
                    <icon-chart-bar />
                  </icon-base>
                </div>
                <div class="text">
                  <p>
                    Zinbee là bộ công cụ giúp tự động hóa việc marketing, bán
                    hàng cũng như tự động tương tác với khách hàng trên
                    facebook.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="r content benefit">
            <div class="c_lg_6 c_md_12 mb_md_3 left">
              <div class="title--content">Lợi ích Zinbee mang lại</div>
              <div class="items d_flex align_items_center">
                <div class="icon">
                  <icon-base
                    icon-name="close"
                    width="50"
                    height="50"
                    viewBox="0 0 550 550"
                  >
                    <icon-rocket />
                  </icon-base>
                </div>
                <div class="text">
                  <p>Tăng hiệu quả kinh doanh</p>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="icon">
                  <icon-base
                    icon-name="close"
                    width="48"
                    height="48"
                    viewBox="0 0 500 500"
                  >
                    <icon-laptop-phone />
                  </icon-base>
                </div>
                <div class="text">
                  <p>Dễ dàng quản lý nội dung bài đăng, chiến dich.</p>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="icon">
                  <icon-base
                    icon-name="close"
                    width="48"
                    height="48"
                    viewBox="0 0 60 60"
                  >
                    <icon-diamond />
                  </icon-base>
                </div>
                <div class="text">
                  <p>Tăng tương tác và xây dựng tệp khách hàng tiềm năng</p>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="icon">
                  <icon-base
                    icon-name="close"
                    width="48"
                    height="48"
                    viewBox="0 0 29 29"
                  >
                    <icon-timer />
                  </icon-base>
                </div>
                <div class="text">
                  <p>Tiết kiệm thời gian, chi phí cho quảng cáo và nhân sự</p>
                </div>
              </div>
            </div>
            <div class="c_lg_6 c_md_12 right position_relative">
              <!-- <div class="info position_absolute">ZinBee</div> -->
              <!-- <img :src="imageTool2" alt> -->
              <div
                class="marketing--section-image"
                :style="{
                  backgroundImage: 'url(' + automatic + ')'
                }"
              ></div>
            </div>
          </div>
        </div>
      </section>
      <!-- End: tool -->

      <!-- Start: Why Choose ZinBee -->
      <section id="why--chose" class="why--choose">
        <div class="section--title-content">
          <h3 class="title">Phần mềm này giành cho ai</h3>
        </div>

        <div class="marketing--section px_4 ct mb_5">
          <div class="r">
            <div class="c_md_6 c_lg_4 c_xl_4 mb_3 text_center">
              <img class="marketing--section-image" :src="srcSimpleInterface" />
              <div class="title mt_4">
                <b>Shop kinh doanh cá nhân</b>
              </div>
              <div>
                Các shop đang kinh doanh cá nhân đang cần giải pháp, công cụ hỗ
                trợ bán hàng, tương tác với khách hàng tốt hơn. Tiết kiệm thời
                gian và chị phí.
              </div>
            </div>
            <div class="c_md_6 c_lg_4 c_xl_4 mb_3 text_center">
              <img class="marketing--section-image" :src="srcExamlePost" />
              <div class="title mt_4">
                <b>Các doanh nghiệp</b>
              </div>
              <div>
                Các doanh nghiệp đang muốn triển khai marketing trên facebook
                với giải pháp tối ưu, hoàn toàn tự động để giảm chi phí và nhân
                sư.
              </div>
            </div>
            <div class="c_md_6 c_lg_4 c_xl_4 mb_3 text_center">
              <img class="marketing--section-image" :src="srcAutomatic" />
              <div class="title mt_4">
                <b>Tổ chức marketing- sale</b>
              </div>
              <div>
                Các tổ chức, cá nhân làm marketing và sale muốn tăng hiệu quả
                làm việc với công cụ quản lý các hoạt động trên facebook.
              </div>
            </div>
          </div>
        </div>
        <!-- End: Marketing Section -->
      </section>
      <!-- End: Why Choose ZinBee -->

      <!-- Start: Utilities -->
      <section id="utilities" class="utilities ct">
        <div class="section--title-content mb_0">
          <h3 class="title mb_0">Tại sao bạn chọn ZinBee</h3>
        </div>
        <div class="d_flex options mb_4">
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
        <div class="content--options text_center position_relative">
          <transition name="slide-fade">
            <div class="items display" v-if="currentIndexInfo === 1">
              <div class="section--title-content">
                <!-- <div class="title">01. Giao diện thân thiện</div> -->
                <div class="desc">
                  Đội ngũ Zinbee không ngừng cải tiến, nâng cấp nhằm xây dựng
                  một hệ thống tiện lợi nhất cho người dùng
                </div>
              </div>
              <img
                src="@/assets/images/home/dashboard.png"
                alt="Banner ZinBee"
              />
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="content items" v-if="currentIndexInfo === 2">
              <div class="section--title-content">
                <!-- <div class="title">02. Nội dung đa dạng</div> -->
                <div class="desc">
                  Kho nội dung được cập nhật tiên lục, đem đến sự lựa chọn dễ
                  dàng và phù hợp cho khách hàng.
                </div>
              </div>
              <img src="@/assets/images/home/content.png" alt="Banner ZinBee" />
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="automation items" v-if="currentIndexInfo === 3">
              <div class="section--title-content">
                <!-- <div class="title">03. Tự động hóa</div> -->
                <div class="desc">
                  Bạn sẽ có nhiều thời gian hơn với hệ thống tự động hóa của
                  Zinbee, mọi thứ chỉ cần setup và Zinbee sẽ thay bạn thực hiện
                  bất kể ngày hay đêm
                </div>
              </div>
              <img src="@/assets/images/home/tudong.png" alt="Banner ZinBee" />
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="function items" v-if="currentIndexInfo === 4">
              <div class="section--title-content">
                <!-- <div class="title">04. Rất nhiều tính năng khác</div> -->
                <div class="desc">
                  Hàng chục tính năng khác luôn được update liên tục, đem tới
                  những tiện ích tối ưu nhất cho khách hàng của Zinbee
                </div>
              </div>
              <img
                src="@/assets/images/home/tinhnang.png"
                alt="Banner ZinBee"
              />
            </div>
          </transition>
          <div
            class="position_absolute action--slider-info d_flex align_items_center"
          >
            <span
              class="prev action"
              @click="prevInfo"
              v-if="currentIndexInfo !== 1"
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
              v-if="currentIndexInfo !== 4"
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
      </section>
      <!-- End: Utilities -->

      <!-- Start: Customer -->
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
            </div>
            <!-- End: Slider -->
          </div>
        </div>
      </section>
      <!-- End: Customer -->

      <!-- Start: Price -->
      <section id="price" class="price ct">
        <div class="section--title-content text_center">
          <h3 class="title">BẢNG GIÁ DỊCH VỤ</h3>
          <h4 class="desc">
            Zinbee cung cấp nhiều gói khác nhau linh hoạt cho từng nhu cầu của
            khách hàng.
          </h4>
        </div>
        <div class="r text_center">
          <div class="c_lg_6 c_md_6 mb_lg_3 mb_md_3 c_xl_3 items">
            <div class="item">
              <div class="heading">
                <icon-base
                  icon-name="close"
                  width="50"
                  height="50"
                  viewBox="0 0 550 550"
                >
                  <icon-rocket />
                </icon-base>
                <div class="month">1 THÁNG</div>
              </div>
              <ul class="list-unstyled plan-lists">
                <li>1 tài khoản facebook</li>
                <li>5 pages</li>
                <li>500 groups</li>
                <li>Tìm nội dung hot</li>
                <li>Tự động tìm nội dung</li>
                <li>Tự động đăng bài</li>
                <li>Tự động like</li>
                <li>Tự động thêm bạn</li>
                <li>Tự động huỷ kết bạn</li>
                <li>Chatbot profile</li>
              </ul>
              <div class="price--month">2.800.000đ/Tháng</div>
              <div class="register">Đăng ký</div>
            </div>
          </div>
          <div class="c_lg_6 c_md_6 mb_lg_3 mb_md_3 c_xl_3 items">
            <div class="item">
              <div class="heading">
                <icon-base
                  icon-name="close"
                  width="48"
                  height="48"
                  viewBox="0 0 60 60"
                >
                  <icon-diamond />
                </icon-base>
                <div class="month">6 THÁNG</div>
              </div>
              <ul class="list-unstyled plan-lists">
                <li>1 tài khoản facebook</li>
                <li>10 pages</li>
                <li>500 groups</li>
                <li>Tìm nội dung hot</li>
                <li>Tự động tìm nội dung</li>
                <li>Tự động đăng bài</li>
                <li>Tự động like</li>
                <li>Tự động thêm bạn</li>
                <li>Tự động huỷ kết bạn</li>
                <li>Chatbot profile</li>
              </ul>
              <div class="price--month">16.199.000đ/6 tháng</div>
              <div class="register">Đăng ký</div>
            </div>
          </div>
          <div class="c_lg_6 c_md_6 mb_lg_3 mb_md_3 c_xl_3 items">
            <div class="item">
              <div class="heading">
                <icon-base
                  icon-name="close"
                  width="50"
                  height="50"
                  viewBox="0 0 500 500"
                >
                  <icon-world />
                </icon-base>
                <div class="month">1 NĂM</div>
              </div>
              <ul class="list-unstyled plan-lists">
                <li>2 tài khoản facebook</li>
                <li>30 pages</li>
                <li>1000 groups</li>
                <li>Tìm nội dung hot</li>
                <li>Tự động tìm nội dung</li>
                <li>Tự động đăng bài</li>
                <li>Tự động like</li>
                <li>Tự động thêm bạn</li>
                <li>Tự động huỷ kết bạn</li>
                <li>Chatbot profile</li>
              </ul>
              <div class="price--month">28.799.000đ/1 năm</div>
              <div class="register">Đăng ký</div>
            </div>
          </div>
          <div class="c_lg_6 c_md_6 mb_lg_3 mb_md_3 c_xl_3 items">
            <div class="item">
              <div class="heading">
                <icon-base
                  icon-name="close"
                  width="50"
                  height="50"
                  viewBox="0 0 500 500"
                >
                  <icon-enterprise />
                </icon-base>
                <div class="month">DOANH NGHIỆP</div>
              </div>
              <ul class="list-unstyled plan-lists">
                <li>Liên hệ</li>
                <li>Liên hệ</li>
                <li>Liên hệ</li>
                <li>Tìm nội dung hot</li>
                <li>Tự động tìm nội dung</li>
                <li>Tự động đăng bài</li>
                <li>Tự động like</li>
                <li>Tự động thêm bạn</li>
                <li>Tự động huỷ kết bạn</li>
                <li>Chatbot profile</li>
              </ul>
              <div class="price--month">Liên hệ</div>
              <div class="register">Đăng ký</div>
            </div>
          </div>
        </div>
      </section>
      <!-- End: Price -->

      <!-- Start: Class Marketing -->
      <section id="training" class="training position_relative">
        <div class="section--title-content">
          <h3 class="title">
            Đào tạo thường xuyên và miễn phí về social marketing
          </h3>
          <h4 class="desc">
            Được cung cấp các tài liệu, kiến thức, hỗ trợ kinh doanh và cách vận
            dụng công cụ vào kinh doanh bán hàng
          </h4>
        </div>
        <div class="slider--training ct">
          <transition
            name="slide--img"
            v-for="(item, index) in imageTraining"
            :key="index"
          >
            <div
              class="img--training"
              :style="{
                backgroundImage: 'url(' + item + ')'
              }"
              v-if="currentSliderTraining === index"
            ></div>
          </transition>
        </div>
      </section>
      <!-- End: Class Marketing -->

      <!-- Start: Show owner -->
      <section
        id="owner"
        class="owner text_center px_3"
        :style="{
          backgroundImage: 'url(' + backgroundShow + ')'
        }"
      >
        <div class="title">
          Hơn 5000 doanh nghiệp và chủ shop đã đăng ký sử dụng!
        </div>
        <div class="desc">
          Liên hệ ngay để được tư vấn dùng thử 3 ngày miễn phí!
        </div>
        <a
          class="btn--live-chat"
          target="_blank"
          href="https://www.facebook.com/zinbeeauto/?ref=br_tf&epa=SEARCH_BOX"
          >LIÊN HỆ NGAY BÂY GIỜ</a
        >
      </section>
      <!-- End: Show owner -->
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style lang="scss" scoped>
@import "./index.style";
.owl-stage-outer .owl-stage .owl-item {
  max-width: 470px !important;
}
.owl-theme .owl-nav {
  display: none;
}
.owl-theme .owl-dots {
  display: none;
}
</style>
