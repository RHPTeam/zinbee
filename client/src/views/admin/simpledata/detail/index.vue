<template>
  <div class="detail mt_4">
    <!-- Start: Select List content simple data -->
    <div class="list mb_3" v-if="isShowResultDefault === false">
      <div class="header mb_4">
        <span class="add" @click="comeBackToCategoryDetail">
          Xong
        </span>
      </div>

      <h3 class="py_3">
        Chọn bài viết cho danh mục {{ infoCateDefault.title }}
      </h3>

      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row first" role="columnheader">Tiêu đề</div>
          <div class="flex-row content" role="columnheader">Nội dung</div>
          <div class="flex-row action" role="columnheader">Hành động</div>
        </div>
        <div v-if="!allPost">
          <loading-component />
        </div>
        <div v-else v-for="(item, index) in allPost" :key="`i-${index}`">
          <item :item="item" :infoCateDefault="infoCateDefault.postList" />
        </div>
      </div>
      <post-paginate />
    </div>
    <!-- End: Select List content simple data -->
    <!-- Start: List content simple data -->
    <div class="body" v-if="isShowResultDefault === true">
      <div class="header mb_4">
        <span class="add mr_3" @click="comeBackFolder">Quay lại</span>
        <span class="add" @click="isShowResultDefault = false"
          >Thêm bài viết</span
        >
      </div>
      <div class="name">
        <input
          type="text"
          placeholder="Tên thư mục"
          v-model="infoCateDefault.title"
          @keydown.enter="updateTitleCategories"
        />
      </div>
      <h3 class="py_3">
        Danh sách bài viết trong danh mục
      </h3>
      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row first" role="columnheader">Tiêu đề</div>
          <div class="flex-row content" role="columnheader">Nội dung</div>
          <div class="flex-row action" role="columnheader">Hành động</div>
        </div>
        <div
          v-if="
            infoCateDefault.postList && infoCateDefault.postList.length === 0
          "
          class="d_flex align_items_center justify_content_center no--post py_3"
        >
          Chưa có bài viết nào
        </div>
        <div
          v-else
          v-for="(post, index) in infoCateDefault.postList"
          :key="`p-${index}`"
        >
          <item-cate :post="post" />
        </div>
      </div>
    </div>
    <!-- End: List content simple data -->
  </div>
</template>

<script>
import Item from "./components/item";
import ItemCate from "./components/itemcate";
import PostPaginate from "./components/paginate";
export default {
  components: {
    Item,
    ItemCate,
    PostPaginate
  },
  data() {
    return {
      isShowResultDefault: true
    };
  },
  computed: {
    infoCateDefault() {
      if (this.$store.getters.infoCateDefault === undefined) return;
      return this.$store.getters.infoCateDefault;
    },
    allPost() {
      return this.$store.getters.allMarketPosts;
    },
    listPost() {
      return this.$store.getters.listPost;
    }
  },
  methods: {
    comeBackFolder() {
      this.$router.push({ name: "simple_data" });
    },
    async comeBackToCategoryDetail() {
      this.isShowResultDefault = true;
    },
    updateTitleCategories() {
      this.$store.dispatch("updateTitleCategoryDefault", this.infoCateDefault);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
