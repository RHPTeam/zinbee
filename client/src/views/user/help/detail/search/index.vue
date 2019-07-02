<template>
  <div class="search ct">
    <div class="r">
      <div class="c_3 sidebar">
        <div class="list">
          <div class="cate py_2">Tài khoản</div>
          <div class="cate py_2">Tài khoản</div>
          <div class="cate py_2">Tài khoản</div>
          <div class="cate py_2">Tài khoản</div>
        </div>
      </div>
      <div class="c_9 body">
        <div class="top d_flex align_items_center pt_4">
          <div class="tab active mr_3 pb_4">69 bài viết</div>
          <div class="tab pb_4">0câu trả lời từ cộng đồng</div>
        </div>
        <div class="wrap py_4">
          <div class="text_center" v-if="blogs && blogs.length === 0">
            Không có dữ liệu
          </div>
          <div v-else>
            <div v-if="this.$store.getters.blogHelpStatus === 'loading'">
              <loading-component />
            </div>
            <div
              class="item"
              v-else
              v-for="(blog, index) in blogs"
              :key="index"
            >
              <div class="title">
                {{ blog.title }}
              </div>
              <div class="desc" v-if="blog.content && blog.content.length > 0">
                <span v-html="blog.content.slice(0, 150)"></span>
                <span>...</span>
                <a href="">Xem thêm</a>
              </div>
            </div>
          </div>
          <!-- Start: Paginate help-->
          <paginate :currentPage="currentPage" />
          <!-- End: Paginate help-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from "../paginate";
export default {
  components: {
    Paginate
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    blogs() {
      return this.$store.getters.resultSearch;
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  .sidebar {
    color: #444444;
    cursor: pointer;
  }
  .body {
    .top {
      border-bottom: 1px solid #e4e4e4;
      .tab {
        cursor: pointer;
        font-weight: 700;
        opacity: 0.5;
      }
      .active {
        border-bottom: 2px solid #0c5460;
        opacity: 1;
      }
    }
    .wrap {
      .title {
        font-weight: 700;
      }
    }
  }
}
</style>
