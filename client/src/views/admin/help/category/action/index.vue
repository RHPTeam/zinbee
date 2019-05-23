<template>
  <div class="action">
    <div class="categories mr_5">
      <router-link tag="a" :to="{ name: 'admin_categories' }">
        Danh sách danh mục
      </router-link>
    </div>
    <form>
      <div class="form_group">
        <label>Tên danh mục</label>
        <input
          type="text"
          class="form_control"
          placeholder="Nhập tên danh mục ..."
        />
      </div>
      <div class="form_group">
        <label>Chọn danh mục cha</label>
        <div class="option">
          <multiselect label="title" placeholder="Chọn danh mục cha ..." />
        </div>
      </div>
      <div class="form_group">
        <button class="btn btn_primary form_control">
          Tạo mới
        </button>
        <button class="btn btn_primary form_control d_none">
          Cập nhật
        </button>
      </div>
    </form>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.action {
  .option {
    border: 1px solid #e4e4e4;
    border-radius: 0.625rem;
  }
}
</style>
