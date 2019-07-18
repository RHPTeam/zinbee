<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="action">
          <span class="back d_flex align_items_center py_3 px_3" @click="close">
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
          </span>
          <form class="py_3 px_3">
            <div class="form_group">
              <label>Tên danh mục</label>
              <input
                type="text"
                class="form_control"
                placeholder="Nhập tên danh mục ..."
                v-model="category.title"
              />
            </div>

            <div class="form_group">
              <label>Chọn bài viết</label>
              <div class="option">
                <multiselect
                  label="title"
                  multiple
                  placeholder="Chọn bài viết"
                  :options="blogList"
                  :value="category._blogHelp"
                  @input="handleBlogList"
                />
              </div>
            </div>

            <div class="form_group">
              <label>Chọn danh mục cha</label>
              <div class="option">
                <multiselect
                  label="title"
                  placeholder="Chọn danh mục cha ..."
                  :options="categories"
                  :value="category.parent"
                  @input="handleCategoryParent"
                />
              </div>
            </div>
            <div class="form_group">
              <button
                v-if="variableControl === 0"
                class="btn btn_primary form_control"
                @click="createCategory"
              >
                Tạo mới
              </button>
              <button
                v-if="variableControl === 1"
                class="btn btn_primary form_control"
                @click="updateCategory"
              >
                Cập nhật
              </button>
              <button
                class="btn btn_danger form_control mt_3"
                @click.prevent="close"
              >
                Hủy bỏ
              </button>
            </div>
          </form>
        </div>
        <!-- End: Modal Body -->
      </div>
    </div>
  </div>
</template>
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "index.style";
</style>
