<template>
  <div class="action">
    <div
      class="back d_flex align_items_center py_2 px_2 mb_5"
      @click="backListCategories"
    >
      <div class="icon mr_3">
        <icon-base
          class="icon--arrow-left"
          icon-name="arrow"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <icon-arrow-left></icon-arrow-left>
        </icon-base>
      </div>
      <div>
        Danh sách danh mục
      </div>
    </div>
    <form class="py_3 px_5">
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
<script>
export default {
  methods: {
    backListCategories() {
      this.$router.push("/admin/help/categories");
    }
  }
};
</script>
<style lang="scss" scoped>
.action {
  color: #444444;
  .back {
    background-color: #fafafa;
    border-radius: .625rem;
    cursor: pointer;
    width: 50%;
  }
  form {
    border: 1px solid #e4e4e4;
    border-radius: .625rem;
    label {
      font-weight: 600;
      color: #cccccc;
    }
  }
  .option {
    border: 1px solid #e4e4e4;
    border-radius: 0.625rem;
  }
}
</style>
