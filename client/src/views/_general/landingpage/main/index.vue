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
          <h1 class="hero-title" ref="showTyped"><span class="test"></span></h1>
        </div>
        <div class="desc">
          TỰ ĐỘNG TÌM KIẾM NỘI DUNG VÀ CHĂM SÓC 100+ PAGE, GROUP, PROFILE
          FACEBOOK VỚI 1 CLICK
        </div>
        <div class="register m_auto d_flex" @click="showTyped">
          Đăng ký ngay
        </div>
        <img
          class="image--introduce mt_5"
          src="@/assets/images/landingpage/banner.jpg"
          alt="Banner ZinBee"
        />
      </div>
    </section>
    <!-- End: Banner -->

    <div class="content">
      <!-- Start:  introduce-->
      <section class="introduce text_center ct">
        <div class="section--title-content">
          <h3 class="title">TẠI SAO BẠN CẦN ZINBEE NGAY HÔM NAY?</h3>
          <h4 class="desc">
            TỰ ĐỘNG TÌM KIẾM NỘI DUNG VÀ CHĂM SÓC 100 PAGE, GROUP, PROFILE
            FACEBOOK CHỈ VỚI 1 CLICK
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
              Zinbee sẽ cung cấp cho bạn các nội dung hot, nhiều lượt tương tác
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
      </section>
      <!-- End:  introduce-->

      <!-- Start: tool -->
      <section
        id="tool"
        class="tool"
        :style="{
          backgroundImage: 'url(' + backgroundTool + ')'
        }"
      >
        <div class="ct">
          <div class="title text_center">CÔNG CỤ HỖ TRỢ TUYỆT VỜI</div>
          <div class="r content">
            <div class="c_lg_6 c_md_12 left">
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
                  <p>Bạn sẽ có nhiều thời gian hơn</p>
                  <p>Tự động chăm sóc page, group, profile</p>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="icon">
                  <icon-base
                    icon-name="close"
                    width="48"
                    height="48"
                    viewBox="0 0 600 600"
                  >
                    <icon-diamond />
                  </icon-base>
                </div>
                <div class="text">
                  <p>Tự động hoàn toàn</p>
                  <p>Tự động hoàn toàn ngay cả khi bạn đang ngủ.</p>
                </div>
              </div>
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
                  <p>Hỗ trợ nhiều tài khoản</p>
                  <p>
                    Bạn có thể chăm sóc nhiều page, group, profile chỉ với vài
                    click.
                  </p>
                </div>
              </div>
            </div>
            <div class="c_lg_6 c_md_12 right position_relative">
              <div class="info position_absolute">ZinBee</div>
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
                  <p>Hỗ trợ cả máy tính và điện thoại</p>
                  <p>Thao tác đơn giản với máy tính hoặc smart phone.</p>
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
                  <p>Tự động tìm kiếm nội dung</p>
                  <p>Tự động tìm nội dung theo chủ đề bạn mong muốn.</p>
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
                  <p>Hơn 5000 khách hàng đang tin dùng</p>
                  <p>
                    Zinbee tuyệt vời đang được hàng nghìn khách hàng và doanh
                    nghiệp tin dùng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End: tool -->

      <!-- Start: Utilities -->
      <section id="utilities" class="utilities ct">
        <div class="d_flex options mb_4">
          <div class="d_flex first">
            <div
              class="title"
              :class="[activetab === 1 ? 'active' : '']"
              @click="activetab = 1"
            >
              <p>01. Giao diện thân thiện</p>
            </div>
            <div
              class="title"
              :class="[activetab === 2 ? 'active' : '']"
              @click="activetab = 2"
            >
              <p>02. Nội dung đa dạng</p>
            </div>
          </div>
          <div class="d_flex second">
            <div
              class="title"
              :class="[activetab === 3 ? 'active' : '']"
              @click="activetab = 3"
            >
              <p>03. Tự động hóa</p>
            </div>
            <div
              class="title"
              :class="[activetab === 4 ? 'active' : '']"
              @click="activetab = 4"
            >
              <p>04. Rất nhiều tính năng khác</p>
            </div>
          </div>
        </div>
        <div class="content--options text_center">
          <transition name="fade">
            <div class="items display" v-if="activetab === 1">
              <div class="section--title-content">
                <div class="title">01. Giao diện thân thiện</div>
                <div class="desc">
                  Đội ngũ Zinbee không ngừng cải tiến, nâng cấp nhằm xây dựng
                  một hệ thống tiện lợi nhất cho người dùng
                </div>
              </div>
              <img
                src="@/assets/images/landingpage/dashboard.png"
                alt="Banner ZinBee"
              />
            </div>
          </transition>
          <transition name="fade">
            <div class="content items" v-if="activetab === 2">
              <div class="section--title-content">
                <div class="title">02. Nội dung đa dạng</div>
                <div class="desc">
                  Kho nội dung được cập nhật tiên lục, đem đến sự lựa chọn dễ
                  dàng và phù hợp cho khách hàng.
                </div>
              </div>
              <img
                src="@/assets/images/landingpage/content.png"
                alt="Banner ZinBee"
              />
            </div>
          </transition>
          <transition name="fade">
            <div class="automation items" v-if="activetab === 3">
              <div class="section--title-content">
                <div class="title">03. Tự động hóa</div>
                <div class="desc">
                  Bạn sẽ có nhiều thời gian hơn với hệ thống tự động hóa của
                  Zinbee, mọi thứ chỉ cần setup và Zinbee sẽ thay bạn thực hiện
                  bất kể ngày hay đêm
                </div>
              </div>
              <img
                src="@/assets/images/landingpage/tudong.png"
                alt="Banner ZinBee"
              />
            </div>
          </transition>
          <transition name="fade">
            <div class="function items" v-if="activetab === 4">
              <div class="section--title-content">
                <div class="title">04. Rất nhiều tính năng khác</div>
                <div class="desc">
                  Hàng chục tính năng khác luôn được update liên tục, đem tới
                  những tiện ích tối ưu nhất cho khách hàng của Zinbee
                </div>
              </div>
              <img
                src="@/assets/images/landingpage/tinhnang.png"
                alt="Banner ZinBee"
              />
            </div>
          </transition>
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
              <div class="title--section">Ý kiến khách hàng</div>
              <div class="desc">
                Những phản hồi tích cực của khách hàng Zinbee
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
                          src="@/assets/images/landingpage/NQK.jpg"
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
                          src="@/assets/images/landingpage/NTL.jpg"
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
                          src="@/assets/images/landingpage/NHL.jpg"
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
                  width="50"
                  height="50"
                  viewBox="0 0 650 650"
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

      <!-- Start: guide -->
      <section
        id="guide"
        class="guide"
        :style="{
          backgroundImage: 'url(' + backgroundMap + ')'
        }"
      >
        <div class="ct">
          <div class="section--title-content text_center">
            <h3 class="title">HƯỚNG DẪN NÂNG CẤP GÓI SỬ DỤNG</h3>
            <h4 class="desc">
              Để nâng cấp gói sử dụng các bạn vui lòng theo hướng dẫn dưới đây
            </h4>
          </div>
          <div class="r m_0">
            <div class="c_lg_6 c_md_12 mb_md_3  c">
              <img
                src="@/assets/images/landingpage/giahan.png"
                alt="Banner ZinBee"
              />
            </div>
            <div class="c_lg_6 c_md_12 mb_md_3 pl_md_3 pl_0">
              <ul>
                <li>
                  Để nâng cấp gói sử dụng các bạn vui lòng theo hướng dẫn dưới
                  đây:
                </li>
                <li>
                  Chuyển khoản số tiền theo các gói 3 tháng, 6 tháng, 1 năm đến
                  số tài khoản:
                </li>
                <li><span class="pr_5">STK:</span> 0991 0000 43720</li>
                <li><span class="pr_5">Tên:</span> Nguyễn Văn Trường</li>
                <li>Ngân hàng: Vietcombank</li>
                <li>Chi nhánh: Tây Hồ - Hà Nội</li>
                <li>
                  Điền thông tin chuyển khoản với nội dung: "email đăng ký
                  Zinbee của bạn"
                </li>
                <li>Zinbee sẽ nâng cấp cho bạn ngay lập tức</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <!-- End: guide -->
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
