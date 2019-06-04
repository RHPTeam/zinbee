<template>
  <div class="flex-table row" role="rowgroup">
    <div class="flex-row first" role="cell">
      <div>item.title }}</div>
    </div>
    <div class="flex-row content" role="cell">
      <div>item.region }}</div>
    </div>
    <div class="flex-row action" role="cell">
      <div class="d_flex justify_content_center">
        <button class="btn btn_warning">
          Sửa
        </button>
        <button class="btn btn_danger ml_3">
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../index.style";
</style>
