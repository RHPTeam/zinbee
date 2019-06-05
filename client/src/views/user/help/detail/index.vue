<template>
  <div class="ct mt_0 mb_5">
    <div class="wrap--name-expect">
      <div class="r m_0">
        <!-- Start: Left Navigation -->
        <div class="c_3 list--problem px_0 pt_5">
          <nav class="navigation">
            <ul>
              <li class="navigation--item">Đăng nhập và mật khẩu</li>
              <li class="navigation--item">Trang cá nhân và cài đặt của bạn</li>
              <li class="navigation--item">Tên trên Facebook</li>
              <li class="navigation--item">
                Giữ an toàn cho tài khoản của bạn
              </li>
              <li class="navigation--item">Thông báo</li>
            </ul>
          </nav>
        </div>
        <!-- End: Left Navigation -->
        <!-- Start: Content -->
        <div class="c_9 content px_4 pt_5">
          <!-- Start: Blog Detail  -->
          <div class="blog--detail">
            <h2 class="title--question">{{ blogDetail.title }}</h2>
            <div class="text" v-html="blogDetail.content">
              {{ blogDetail.content }}
            </div>
          </div>
          <!-- End: Blog Detail  -->
          <!-- Start: Useful Info-->
          <div class="infor--useful">
            <p>Thông tin này có hữu ích không?</p>
            <label for="">
              <input type="radio" name="useful" />
              Có
            </label>
            <label for="">
              <input type="radio" name="useful" />
              Không
            </label>
          </div>
          <!-- End: Useful Info -->
          <!-- Start: Related Blog -->
          <div class="post--correlative">
            <h4>Bài viết có liên quan</h4>
            <nav>
              <ul>
                <li>
                  <a href="">Tên khác nào được phép dùng trên Facebook?</a>
                </li>
                <li>
                  <a href=""
                    >Tại sao tôi không thể đổi tên của mình trên Facebook?</a
                  >
                </li>
                <li>
                  <a href=""
                    >Làm cách nào để yêu cầu dữ liệu từ tài khoản chưa đủ tuổi
                    của con tôi?</a
                  >
                </li>
                <li>
                  <a href=""
                    >Tôi đang trong quá trình đổi tên. Tôi nên sử dụng tên nào
                    trên Facebook?</a
                  >
                </li>
                <li>
                  <a href=""
                    >Đề xuất Những người bạn có thể biết xuất phát từ đâu?</a
                  >
                </li>
              </ul>
            </nav>
          </div>
          <!-- End: Related Blog -->
        </div>
        <!-- End: Content -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    blogDetail() {
      return this.$store.getters.blog;
    },
    blogHelpError() {
      return this.$store.getters.blogHelpError;
    }
  },
  async created() {
    const blogId = this.$route.params.blogId;
    await this.$store.dispatch("getBlogById", blogId);
    // if ( this.blogHelpError === 500 ) {
    //   this.$router.push( { name: "error404" } );
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
