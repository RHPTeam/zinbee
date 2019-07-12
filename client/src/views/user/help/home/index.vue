<template>
  <div class="wrap--home-help">
    <!-- Start: Top Question -->
    <div class="question--wrapper p_0">
      <div class="ct">
        <div class="r m_0 question pd">
          <div class="c_12 c_lg_6 choose">
            <div class="title--home">Câu hỏi bạn có thể có</div>
            <ul
              v-if="
                popularHelp.popular_blog && popularHelp.popular_blog.length > 0
              "
            >
              <li
                v-for="(item, index) in popularHelp.popular_blog"
                :key="`c-${index}`"
              >
                <a
                  @click="showDetailBlog(item)"
                  v-html="item.title.slice(0, 120)"
                ></a>
              </li>
            </ul>
            <div v-else>Chức năng đang nâng cấp vui lòng quay lại sau</div>
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
              <div class="title">Chiến dịch</div>
              <div class="content mt_2">
                Nhận trợ giúp quản lý chiến dịch và hiểu cách tương tác với
                chiến dịch mà bạn quan tâm.
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
              <div class="title">Trò chuyện</div>
              <div class="content mt_2">
                Tìm câu trả lời về cách gửi và nhận tin nhắn trên hệ thống
                Zinbee.
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
                Thay đổi nội dung bạn sẽ được thông báo trên hệ thống và quyết
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
                  Nhắn tin với quản trị viên
                </a>
              </div>
              <div class="des--content">
                <div class="text">
                  Nhắn tin với quản trị viên để được hỗ trợ những gì bạn đang
                  thắc mắc.
                </div>
              </div>
            </div>

            <div class="c_6 text_center">
              <div
                class="img advertise"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div>
                <a
                  :href="hrefPage"
                  target="_blank"
                  class="access--public access--help-advertise"
                >
                  Truy cập cộng đồng trợ giúp
                </a>
              </div>
              <div class="des--content">
                <div class="text">
                  Tìm hiểu thêm về cách sử dụng hệ thống qua những câu trả lời
                  trên diễn dàn.
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
      srcDefault: require("@/assets/images/home-help.png"),
      hrefPage: "https://www.facebook.com/zinbeeauto"
    };
  },
  computed: {
    popularHelp() {
      return this.$store.getters.popularHelp;
    }
  },
  async created() {
    await this.$store.dispatch("getPopularHelp");
  },
  methods: {
    async showDetailBlog(item) {
      await this.$store.dispatch("setHelpDefault", {
        right: 0,
        left: 0
      });
      await this.$store.dispatch("getBlogBySlug", item.slug);
      this.$router.push({
        name: "help_detail",
        params: { id: item.slug }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
