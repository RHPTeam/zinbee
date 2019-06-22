<template>
  <div class="detail mt_4">
    <!-- Start: Select List content simple data -->
    <!-- End: Select List content simple data -->
    <!-- Start: List content simple data -->
    <div class="body">
      <div class="header mb_4">
        <span class="add mr_3" @click="comeBackFolder">Quay lại</span>
      </div>
      <div class="name">
        <input
          type="text"
          placeholder="Tên thư mục"
          v-model="campaign.title"
          @keydown.enter="updateTitleCampaign"
        />
      </div>
      <h3 class="py_3">Danh sách bài viết trong {{ campaign.title }}</h3>
      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row first" role="columnheader">Tiêu đề</div>
          <div class="flex-row content" role="columnheader">Nội dung</div>
          <div class="flex-row action" role="columnheader">Hành động</div>
        </div>
        <div
          v-if="campaign.postList && campaign.postList.length === 0"
          class="d_flex align_items_center justify_content_center no--post py_3"
        >
          Chưa có bài viết nào
        </div>
        <div
          v-else
          v-for="(post, index) in campaign.postList"
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
import ItemCate from "./itemcate";
export default {
  components: {
    ItemCate
  },
  data() {
    return {
      isShowResultDefault: true
    };
  },
  computed: {
    campaign() {
      if (this.$store.getters.infoCateDefault === undefined) return;
      return this.$store.getters.campaign;
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
      this.$router.push({ name: "campaigns" });
    },
    comeBackToCampaign() {
      this.isShowResultDefault = true;
    },
    updateTitleCampaign() {
      this.$store.dispatch("updateTitleCampaign", this.campaign);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
