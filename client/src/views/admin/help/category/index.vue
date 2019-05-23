<template>
  <div class="categories">
    <div class="top d_flex align_items_center">
      <div class="categories mr_5">
        <router-link
          tag="button"
          :to="{ name: 'categories_detail' }"
          class="btn btn_light"
        >
          Thêm danh mục
        </router-link>
      </div>
    </div>
    <div class="desc">Danh sách các danh mục hiện có</div>
    <div class="body">
      <div class="item"></div>
    </div>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.categories {
  .desc {
    font-weight: 600;
  }
}
</style>
