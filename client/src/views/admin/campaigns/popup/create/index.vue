<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="body">
          <h4 class="">Tạo thư mục mới</h4>
          <input
            type="text"
            class="form_control"
            placeholder="Nhập tên thư mục"
            v-model="campaign.title"
          />
          <div class="total mt_3">
            <input
              type="number"
              class="form_control"
              placeholder="Nhập số ngày hoạt động của chiến dịch"
              v-model="campaign.totalDay"
            />
          </div>
          <div class="post mt_3">
            <multiselect
              multiple
              label="title"
              :options="post"
              v-model="postList"
              @input="updatePostToCampaign"
            />
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
export default {
  props: {
    currentTheme: String
  },
  data() {
    return {
      postList: []
    };
  },
  computed: {
    post() {
      return this.$store.getters.allMarketPosts;
    },
    campaign() {
      return this.$store.getters.campaignDetail;
    },
    listPost() {
      return this.$store.getters.listPost;
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
      this.campaign.postList = this.postList;
      await this.$store.dispatch("createCampaign", this.campaign);
      this.close();
    },
    updatePostToCampaign(val) {
      // const arr = val.map(item => item._id);
      // console.log(arr);
      this.postList = val;
      // this.$store.dispatch("setPostToCampaign", contentId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
