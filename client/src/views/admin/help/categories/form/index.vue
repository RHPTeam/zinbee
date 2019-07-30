<template>
  <div class="container">
    <!-- Start: Top -->
    <div class="top d_flex align_items_center mb_3">
      <router-link
        class="link mr_3"
        :to="{ name: 'admin_help_categories' }"
        @click.native="resetCategory"
      >
        « Quay lại
      </router-link>
      <div class="title">
        {{ variableControl === 0 ? "Tạo mới danh mục" : "Chỉnh sửa danh mục" }}
      </div>
    </div>
    <!-- End: Top -->
    <!-- Start: Body -->
    <div class="body py_2">
      <form class="form--wrap px_4 py_3">
        <!-- Start: Title -->
        <div class="form_group">
          <label>Tên danh mục</label>
          <input
            type="text"
            class="form_control"
            placeholder="Nhập tên danh mục"
            v-model="category.title"
          />
        </div>
        <!-- End: Title -->
        <!-- Start: Label -->
        <div class="form_group">
          <label>Nhãn</label>
          <input
            type="text"
            class="form_control"
            placeholder="Nhập nhãn"
            v-model="category.label"
          />
        </div>
        <!-- End: Label -->
        <!-- Start: Icon -->
        <div class="form_group">
          <label>Biểu tượng</label>
          <div class="">
            <div class="img--preview mb_2" v-if="category.icon">
              <img :src="category.icon" alt="" height="120px" />
            </div>
            <input
              type="file"
              ref="file"
              @change="selectFile()"
              accept="image/x-png,image/gif,image/jpeg"
              class="form_control p_1"
            />
          </div>
        </div>
        <!-- End: Icon -->
        <!-- Start: Blog -->
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
        <!-- End: Blog -->
        <!-- Start: Parent Category -->
        <div class="form_group">
          <label>Chọn danh mục cha</label>
          <div class="option">
            <multiselect
              label="title"
              placeholder="Chọn danh mục cha"
              :options="categories"
              :value="category.parent"
              @input="handleCategoryParent"
            />
          </div>
        </div>
        <!-- End: Parent Category -->
        <!-- Start: Description -->
        <div class="form_group">
          <label>Mô tả</label>
          <textarea
            class="form_control"
            placeholder="Nhập mô tả"
            v-model="category.description"
          ></textarea>
        </div>
        <!-- End: Description -->
        <!-- Start: Content -->
        <div class="form_group">
          <label>Nội dung</label>
          <quill-editor
            ref="myQuillEditor"
            v-model="category.content"
            :options="editorOption"
          />
        </div>
        <!-- End: Content -->
        <!-- Start: Submit Button -->
        <div class="d_flex align_items_center mt_3">
          <button
            v-if="variableControl === 0"
            class="btn btn_success mr_3"
            @click="createCategory"
          >
            Tạo mới
          </button>
          <button
            v-if="variableControl === 1"
            class="btn btn_success mr_3"
            @click="updateCategory"
          >
            Cập nhật
          </button>
          <button class="btn btn_danger" @click.prevent="cancel">
            Hủy bỏ
          </button>
        </div>
        <!-- Start: Submit Button -->
      </form>
    </div>
    <!-- End: Body -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
