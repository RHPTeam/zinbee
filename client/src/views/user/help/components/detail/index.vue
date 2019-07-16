<template>
  <div class="detail ct">
    <div class="r">
      <div class="sidebar c_xl_3 c_lg_3 c_md_3 c_12 pl_0 pr_0 pt_4">
        <div class="item">
          <div class="parent py_2">Quản lý tài khoản</div>
          <div class="child d_flex flex_column">
            <div class="divine mb_2 mt_2"></div>
            <div class="child--item py_2 d_flex align_items_center">
              <div class="left mr_3"></div>
              Mật khẩu
            </div>
            <div class="child--item py_2 d_flex align_items_center">
              <div class="left mr_3"></div>
              Mật khẩu
            </div>
            <div class="divine mb_2 mt_2"></div>
          </div>
        </div>
      </div>
      <div class="c_xl_9 c_lg_9 c_md_9 c_12">
        <div class="body p_3">
          <div class="post py_2">
            <div class="introduce">
              <label>Giới thiệu</label>
            </div>
            <div
              class="introduce--img"
              :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
            ></div>
            <h2 class="title">Lorem ipsum dolor sit amet, consectetur.</h2>
            <div class="desc pb_3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
              dolorem esse explicabo fugiat labore nam quos sit. Eum fuga
              perspiciatis quis veniam. Accusantium at commodi dolorem doloribus
              ducimus esse eum rem. Culpa doloremque harum impedit incidunt sint
              veniam? Eos ipsam laudantium quae quas! Adipisci commodi cumque
              nemo perspiciatis totam veniam. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Ab dolorem esse explicabo fugiat
              labore nam quos sit. Eum fuga perspiciatis quis veniam.
              Accusantium at commodi dolorem doloribus ducimus esse eum rem.
              Culpa doloremque harum impedit incidunt sint veniam? Eos ipsam
              laudantium quae quas! Adipisci commodi cumque nemo perspiciatis
              totam veniam. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Ab dolorem esse explicabo fugiat labore nam quos sit. Eum
              fuga perspiciatis quis veniam. Accusantium at commodi dolorem
              doloribus ducimus esse eum rem. Culpa doloremque harum impedit
              incidunt sint veniam? Eos ipsam laudantium quae quas! Adipisci
              commodi cumque nemo perspiciatis totam veniam.
            </div>
          </div>
          <div class="posts py_2">
            <div class="top d_flex align_items_center justify_content_between">
              <h4 class="title">Lorem ipsum dolor sit amet, consectetur.</h4>
              <div class="icon">
                <icon-base
                  icon-name="xem thêm"
                  width="20"
                  height="20"
                  viewBox="0 0 150 150"
                >
                  <icon-arrow-down />
                </icon-base>
              </div>
            </div>
            <div class="desc pb_3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              consequuntur iure iusto modi perferendis. Accusantium at, atque
              consectetur consequuntur dicta eos esse et hic impedit ipsum
              magnam magni maxime modi nam neque nesciunt omnis optio placeat
              porro praesentium provident quas recusandae reiciendis saepe
              tempore veniam voluptas voluptatibus. Error perspiciatis, sit!
            </div>
          </div>
        </div>
        <div class="footer mb_4">
          <div class="more p_3">
            <h3 class="mb_4">Bài viết phổ biến đến chủ đề này</h3>

            <div class="more--item">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
            <div class="more--item">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
            <div class="more--item">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
            <div class="more--item">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
          <h3 class="p_3">Chủ đề liên quan</h3>
          <div class="r theme px_4">
            <div
              class="c_4 card p_3 d_flex flex_column align_items_center justify_content_center"
            >
              <div
                class="theme--img"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="content">
                <h5 class="describe">Giới thiệu</h5>
                <h5 class="title mb_3">Lorem ipsum dolor sit.</h5>
                <div class="theme--desc">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab,
                  eos.
                </div>
              </div>
            </div>
            <div
              class="c_4 card p_3 d_flex flex_column align_items_center justify_content_center"
            >
              <div
                class="theme--img"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="content">
                <h5 class="describe">Giới thiệu</h5>
                <h5 class="title mb_3">Lorem ipsum dolor sit.</h5>
                <div class="theme--desc">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab,
                  eos.
                </div>
              </div>
            </div>
            <div
              class="c_4 card p_3 d_flex flex_column align_items_center justify_content_center"
            >
              <div
                class="theme--img"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="content">
                <h5 class="describe">Giới thiệu</h5>
                <h5 class="title mb_3">Lorem ipsum dolor sit.</h5>
                <div class="theme--desc">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab,
                  eos.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcDefault:
        "http://thuvienanhdep.net/wp-content/uploads/2015/11/nhung-hinh-anh-dep-de-thuong-va-dang-yeu-cua-dong-vat-trong-cuoc-song-9.jpg"
    };
  },
  computed: {
    categories() {
      return this.$store.getters.allHelpCategories;
    },
    filterCategories() {
      const slug = this.$route.params.slug;

      const listCate = this.categories.map(item => {
        item._blogHelp.map(blog => {
          if (blog.slug == slug) return blog.title;
        });
      });
      return listCate;
    }
  },
  async created() {
    await this.$store.dispatch("getAllHelpCategories");
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
