<template>
  <div class="wrap--home-help">
    <!-- Start: Top Question -->
    <div class="question--wrapper p_0">
      <div class="ct">
        <div class="r m_0 question pd">
          <div class="c_12 c_lg_6 choose">
            <div class="title--home">Câu hỏi bạn có thể có</div>
            <ul>
              <li>
                <a href="">Tên nào được phép trên Facebook?</a>
              </li>
              <li>
                <a href=""
                  >Làm cách nào để chọn nội dung thông báo tôi sẽ nhận trên
                  Facebook?</a
                >
              </li>
              <li>
                <a href=""
                  >Tôi có thể tìm thấy cài đặt trên Facebook của mình ở đâu?</a
                >
              </li>
              <li>
                <a href=""
                  >Làm cách nào để thay đổi hoặc đặt lại mật khẩu Facebook?</a
                >
              </li>
              <li>
                <a href=""
                  >Tại sao tôi nhận được thông báo lỗi cho biết tôi không thể
                  trả lời cuộc trò chuyện trên Facebook?</a
                >
              </li>
            </ul>
          </div>
          <div
            class="c_12 c_lg_6 descri--img"
            :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
          ></div>
        </div>
      </div>
    </div>
    <!-- End: Top Question -->
    <div class="ct">
      <!-- Start: Top Subject -->
      <div class="popular--topics pd">
        <div class="title--home">Chủ đề phổ biến</div>
        <div class="r m_0">
          <div class="c_12 c_md_6 c_lg_3 topic--card text_center mb_3 mb_lg_0">
            <div class="topic--card-content">
              <div
                class="img--position"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="topic--name mt_2">GIỚI THIỆU</div>
              <div class="title">Trang cá nhân và cài đặt</div>
              <div class="content mt_2">
                Tìm hiểu cách thêm ảnh đại điện, chỉnh sửa thông tin và quản lý
                bài viết trên Dòng thời gian của bạn.
              </div>
            </div>
          </div>
          <div class="c_12 c_md_6 c_lg_3 topic--card text_center mb_3 mb_lg_0">
            <div class="topic--card-content">
              <div
                class="img--position"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="topic--name mt_2">GIỚI THIỆU</div>
              <div class="title">Trang</div>
              <div class="content mt_2">
                Nhận trợ giúp quản lý Trang và hiểu cách tương tác với Trang mà
                bạn quan tâm.
              </div>
            </div>
          </div>
          <div class="c_12 c_md_6 c_lg_3 topic--card text_center">
            <div class="topic--card-content">
              <div
                class="img--position"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="topic--name mt_2">GIỚI THIỆU</div>
              <div class="title">Nhắn tin</div>
              <div class="content mt_2">
                Tìm câu trả lời về cách gửi và nhận tin nhắn trên Facebook.
              </div>
            </div>
          </div>
          <div class="c_12 c_md_6 c_lg_3 topic--card text_center">
            <div class="topic--card-content">
              <div
                class="img--position"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="topic--name mt_2">GIỚI THIỆU</div>
              <div class="title">Thông báo</div>
              <div class="content mt_2">
                Thay đổi nội dung bạn sẽ được thông báo trên Facebook và quyết
                định cách nhận các thông báo đó.
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Top Subject -->
      <!-- Start: Other Search-->
      <div class="search--other pd">
        <div class="title--home text_center">Bạn tìm kiếm điều khác?</div>
        <div class="text_center description">
          Khám phá Cộng đồng trợ giúp của chúng tôi hoặc tìm hiểu thêm về Quảng
          cáo trên Facebook
        </div>
        <div class="r">
          <div class="pd-lr d_inline_flex">
            <div class="c_6 text_center">
              <div
                class="img"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div>
                <a href="" class="access--public access--help">
                  Truy cập Cộng đồng trợ giúp
                </a>
              </div>
              <div class="des--content">
                <div class="text">
                  Nhận trợ giúp từ người khác trên Facebook có câu hỏi tương tự
                </div>
              </div>
            </div>

            <div class="c_6 text_center">
              <div
                class="img advertise"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div>
                <a href="" class="access--public access--help-advertise">
                  Truy cập Cộng đồng trợ giúp
                </a>
              </div>
              <div class="des--content">
                <div class="text">
                  Tìm hiểu thêm về cách quảng cáo doanh nghiệp trên Facebook
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Other Search-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      srcDefault: require("@/assets/images/home-help.png")
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
