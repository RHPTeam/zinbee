<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="body">
          <h4>Bạn có chắc chắn muốn xóa đại lý này không ?</h4>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <div class="ml_auto d_flex">
            <button class="btn bg_danger mr_2" @click="close">
              Hủy bỏ
            </button>
            <button class="btn bg_primary" @click="deleteAgency">
              Xóa
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
    agencyId: String
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    async deleteAgency() {
      await this.$store.dispatch("deleteAgency", this.agencyId);
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
</style>
