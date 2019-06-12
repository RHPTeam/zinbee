<template>
  <div class="modal--wrapper">
    <div class="modal--content">
      <!-- Start: create -->
      <div class="create mb_3">
        <h3>Tao danh muc moi</h3>
        <!-- create -->
        <form action class="card card_body" v-if="isCreateCategory === true">
          <div class="form_group">
            <label for class>Ten tieu de</label>
            <input
              type="text"
              class="form_control"
              placeholder="Tieu de ..."
              v-model="nameCategory"
            />
          </div>
          <div class="form_group">
            <label for class>Danh muc cha</label>
            <multiselect
              label="name"
              placeholder="Chọn danh mục cha ..."
              :options="categories"
              v-model="parent"
              :value="parent.name"
            />
          </div>
          <div class="btn btn_success" @click="create">Tao moi</div>
        </form>
        <!-- update -->
        <form action class="card card_body" v-if="isUpdateCategory === true">
          <div class="form_group">
            <label for class>Ten tiet de</label>
            <input
              type="text"
              class="form_control"
              placeholder="Tieu de ..."
              v-model="categoryUpdate.name"
            />
          </div>
          <div class="form_group">
            <label for class>Danh muc cha</label>
            <multiselect
              label="name"
              placeholder="Chọn danh mục cha ..."
              :options="categories"
              :value="nameParent"
              @input="updateParentCategory"
            />
          </div>
          <div class="btn btn_success" @click="updateCategory">Update</div>
        </form>
      </div>
      <!-- End: create -->
      <!-- Start: List -->
      <div class="list">
        <h3>Danh sach danh muc</h3>
        <div class="card card_body">
          <div class="content">
            <!-- Start: title -->
            <div class="item--list-header d_flex align_items_center">
              <div class="title p_2">Tiêu đề</div>
              <div class="cate--parent p_2">Danh muc cha</div>
              <div class="creator p_2">Nguoi tao</div>
              <div class="updator p_2">Nguoi update</div>
              <div class="action p_2"></div>
            </div>
            <!-- End: title -->
            <!-- Start: Item list -->
            <div
              class="item--list-content d_flex align_items_center"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div class="title p_2">{{ category.name }}</div>
              <div class="cate--parent p_2">
                <div v-if="category.parent.length > 0">
                  {{ getNameParent(category.parent) }}
                </div>
                <div v-else>None</div>
              </div>
              <div class="creator p_2">{{ category._creator.name }}</div>
              <div class="updator p_2" v-if="category._editor === undefined">
                Chua co nguoi update
              </div>
              <div class="updator p_2" v-else>{{ category._editor.name }}</div>
              <div class="d_flex px_2 action">
                <div class="btn btn_info mr_1" @click="actionUpdate(category)">
                  Sua
                </div>
                <div class="btn btn_danger" @click="deleteCategory(category)">
                  Xoa
                </div>
              </div>
            </div>
            <div v-if="categories.length === 0" class="text_center p_2">
              Khong co noi dung
            </div>
            <!-- End: Item list -->
          </div>
        </div>
      </div>
      <!-- Start: List -->
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style lang="scss" scoped>
@import "./index.style.scss";
</style>
