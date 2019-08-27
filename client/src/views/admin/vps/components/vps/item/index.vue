<template>
  <div class="flex-table row" role="rowgroup">
    <div class="flex-row first" role="cell">
      <div>{{ item.title }}</div>
    </div>
    <div class="flex-row first" role="cell">
      <div>{{ item.region }}</div>
    </div>
    <div class="flex-row" role="cell">
      {{ item.amountMax }}
    </div>
    <div class="flex-row" role="cell">
      <span v-if="item.userAmount && item.userAmount.length > 0">{{
        item.userAmount.length
      }}</span>
      <span v-else>Chưa có số lượng</span>
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
  props: {
    item: Object
  },
  methods: {
    editInfoDomain(val) {
      this.$store.dispatch("getDomainById", val);
      this.$emit("openPopupUpdate", true);
      this.$emit("changeStatus", true);
    },
    deleteDomain(val) {
      this.$store.dispatch("deleteDomain", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
</style>
