<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="body">
          <div class="mt_2">
            <div class="font_weight_bold">Gói Tài Khoản</div>
            <input
              type="text"
              placeholder="Nhập tên gói tài khoản"
              class="form_control"
              v-model="detail.title"
            />
          </div>
          <div class="mt_2">
            <div class="font_weight_bold">
              Thời gian hoạt động(tính theo tháng)
            </div>
            <input
              type="number"
              placeholder="Nhập thời gian hoạt động của gói"
              class="form_control"
              v-model="detail.total"
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
            <button
              class="btn bg_primary"
              v-if="variableControl === false"
              @click="createNewPackage"
            >
              Tạo mới
            </button>
            <button
              class="btn bg_primary"
              v-if="variableControl === true"
              @click="updatePackage"
            >
              Cập nhật
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
    currentTheme: String,
    variableControl: Boolean
  },
  data() {
    return {};
  },
  computed: {
    detail() {
      return this.$store.getters.package;
    }
  },
  async created() {},
  methods: {
    close() {
      this.$emit("closePopup", false);
    },
    async createNewPackage() {
      this.$store.dispatch("createNewPackage", this.detail);
      this.close();
    },
    async updatePackage() {
      await this.$store.dispatch("updatePackage", this.detail);
      await this.$store.dispatch("setPackageDefault", {
        title: "",
        total: ""
      });
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
