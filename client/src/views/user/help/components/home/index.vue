<template>
  <div class="home">
    <div class="top">
      <div class="ct">
        <div class="r pd">
          <div class="left c_xl_6 c_lg_6 c_md_6 c_12">
            <h3 class="mb_3">Có thể bạn chưa biết ?</h3>
            <ul
              class="blog"
              v-if="
                popularHelp.popular_blog && popularHelp.popular_blog.length > 0
              "
            >
              <li
                v-for="(item, index) in popularHelp.popular_blog"
                :key="`c-${index}`"
                @click="showInfoBlog(item)"
              >
                <a
                  class="d_inline_block"
                  :href="`/#/help/${item.slug}`"
                  @click="showInfoBlog(item)"
                  >{{ item.title }}</a
                >
              </li>
            </ul>
            <div v-else>Chưa có bài viết nào</div>
          </div>
          <div
            class="right c_xl_6 c_lg_6 c_md_6 c_12"
            :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
          ></div>
        </div>
      </div>
    </div>
    <div class="ct">
      <!-- Start: Top Subject -->
      <div class="popular--topics pd">
        <h3 class="mb_4">Chủ đề phổ biến</h3>
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
      <div
        class="search--other pd d_flex flex_column justify_content_center align_items_center"
      >
        <h3 class="text_center mb_3">Bạn tìm kiếm điều khác?</h3>
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
      srcDefault: require("@/assets/images/home-help.png")
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
    showInfoBlog(val) {
      this.$store.dispatch("getBlogBySlug", val.slug);
      this.$router.push({
        name: "help_detail",
        params: { slug: val.slug }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
