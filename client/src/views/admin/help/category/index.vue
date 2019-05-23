<template>
  <div class="categories">
    <form>
      <div class="form_group">
        <label>Tên danh mục</label>
        <input type="text" class="form_control" placeholder="Nhập tên danh mục ..." />
      </div>
      <div class="form_group">
        <label>Chọn danh mục cha</label>
        <div class="option">
          <multiselect
            label="title"
            placeholder="Chọn danh mục cha ..."
          />
        </div>
      </div>
      <div class="form_group">
        <button class="btn btn_primary form_control">
          Tạo mới
        </button>
        <button class="btn btn_primary form_control">
          Cập nhật
        </button>
      </div>
    </form>
    <div class="body">
      
    </div>
  </div>
</template>
