<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="body">
          <div class="r">
            <div class="c_6">
              <input
                type="text"
                class="form_control"
                placeholder="Nhập tên thư mục"
                v-model="campaign.title"
              />
            </div>
            <div class="c_6">
              <div class="total">
                <input
                  type="number"
                  class="form_control"
                  placeholder="Nhập số ngày hoạt động của chiến dịch"
                  v-model="campaign.totalDay"
                />
              </div>
            </div>
          </div>
          <div class="post mt_3">
            <div class="table-container" role="table" aria-label="Destinations">
              <div class="flex-table header" role="rowgroup">
                <div class="flex-row first" role="columnheader">Tiêu đề</div>
                <div class="flex-row content" role="columnheader">Nội dung</div>
                <div class="flex-row action" role="columnheader">Hành động</div>
              </div>
              <div
                v-if="posts && posts.length === 0"
                class="d_flex align_items_center justify_content_center no--post py_3"
              >
                Chưa có bài viết nào
              </div>
              <div v-else v-for="(post, index) in posts" :key="`p-${index}`">
                <item
                  :item="post"
                  @pushPostToCampaign="pushToCampaign($event)"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <div class="ml_auto d_flex">
            <button class="btn bg_danger mr_2" @click="close">
              Hủy bỏ
            </button>
            <button class="btn bg_primary" @click="createNewFolder">
              Tạo mới
            </button>
          </div>
        </div>
        <!-- End: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./item";
export default {
  components: {
    Item
  },
  props: {
    currentTheme: String
  },
  data() {
    return {
      postList: []
    };
  },
  computed: {
    posts() {
      return this.$store.getters.allMarketPosts;
    },
    campaign() {
      return this.$store.getters.campaignDetail;
    }
  },
  async created() {
    await this.$store.dispatch("setCampaignDefault");
  },
  methods: {
    close() {
      this.$emit("closePopup", false);
    },
    async createNewFolder() {
      this.campaign.postCustom = [...new Set(this.postList)];
      await this.$store.dispatch("createCampaign", this.campaign);
      this.close();
    },
    pushToCampaign(val) {
      this.postList.push(val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
