<template>
  <div class="flex-table row" role="rowgroup">
    <div class="flex-row first" role="cell">
      <div>{{ item.name }}</div>
    </div>
    <div class="flex-row first" role="cell">
      <div>{{ item.status === true ? "Hoạt động" : "Không hoạt động" }}</div>
    </div>
    <div class="flex-row" role="cell">
      {{ item.uid }}
    </div>
    <div class="flex-row" role="cell">
      <div class="d_flex justify_content_center">
        <button class="btn btn_warning" @click="editInfoDomain(item._id)">
          Sửa
        </button>
        <button class="btn btn_danger ml_3" @click="deleteDomain(item._id)">
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    async editInfoDomain(val) {
      await this.$store.dispatch("getInfoPostServer", val);
      await this.$store.dispatch("setVariableControlButton", 1);
      this.$emit("openPopupEditPostServer", true);
    },
    deleteDomain(val) {
      this.$store.dispatch("deletePostServer", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
