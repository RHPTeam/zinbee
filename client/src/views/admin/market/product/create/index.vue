<template>
  <div class="model--wrapper create--product">
    <div class="model--content card p_3">
      <div class="form_group">
        <label for class>Chọn loại sản phẩm</label>
        <div class="mb_2 d_flex">
          <div class="mr_1 btn btn_info" @click="showOptionsPost">Post</div>
          <div class="btn btn_info" @click="showOptionsCampaign">Campaign</div>
        </div>
        <div class="py_0 post" v-if="isOptionsPost === true">
          <multiselect
            label="name"
            class="form_control p_0"
            :options="allMarketPostOptions"
            placeholder="Chọn bài viết mẫu..."
            @input="setProductContent($event)"
          />
          <div class="post mt_2">
            <label for class="">Danh mục</label>
            <div class="form_control py_0">
              <multiselect
                label="name"
                placeholder="Chọn danh mục đăng bài..."
                :options="categories"
                v-model="categories.name"
              />
            </div>
          </div>
        </div>
        <div class="py_0 campaign" v-if="isOptionsCapaign === true">
          <multiselect
            label="name"
            class="form_control p_0"
            placeholder="Chọn chien dich de đăng..."
          />
          <div class="campaign mt_2">
            <label for class>Danh mục</label>
            <div class="py_0">
              <multiselect
                label="name"
                placeholder="Chọn danh mục đăng bài..."
              />
            </div>
          </div>
        </div>
      </div>
      <div class="form_group title">
        <label for class>Tiêu đề</label>
        <input
          type="text"
          class="form_control"
          v-model="inforProductById.name"
        />
      </div>
      <div class="form_group d_flex align_items_center price">
        <label for class="mr_2 m_0">Đơn giá</label>
        <div class="d_inline_flex">
          <input
            type="number"
            class="form_control p_1"
            id
            placeholder="100.000 d"
            min="10"
            v-model="inforProductById.priceCents"
          />
          <div class="pl_3 price--info">VNĐ</div>
        </div>
      </div>
      <div class="form_group">
        <label class>Đặc điểm</label>
        <div class="d_flex align_items_center mb_2">
          <div class="mr_2">
            <input
              type="text"
              class="form_control"
              placeholder="Name"
              v-model="inforProductById.attributes[0].name"
            />
          </div>
          <div class="mr_2">
            <input
              type="text"
              class="form_control"
              placeholder="Value"
              v-model="inforProductById.attributes[0].value"
            />
          </div>
        </div>
        <div class="d_inline_flex mb_2 align_items_center add--att p_1">
          <icon-base
            icon-name="icon-plus"
            class="icon-plus"
            width="25"
            height="25"
            viewBox="0 0 60 70"
          >
            <icon-plus />
          </icon-base>
          Thêm đặc điểm
        </div>
      </div>
      <div class="form_group">
        <label for class>Ảnh đại diện</label>
        <div class="img--preview" v-if="inforProductById.previews">
          <img :src="inforProductById.previews.thumbnail" alt="">
        </div>
        <div class>
          <input
            type="file"
            ref="file"
            @change="selectFile()"
            accept="image/x-png,image/gif,image/jpeg"
            class="form_control p_1"/>
        </div>
        <div class="contain--images"></div>
      </div>
      <div class="form_group">
        <label for class>Mô tả</label>
        <div class>
          <textarea
            rows="5"
            cols="10"
            class="form_control"
            v-model="inforProductById.description"
          ></textarea>
        </div>
      </div>
      <div class="form_group">
        <label for class>Nội dung xem trước</label>
        <div class>
          <textarea
            rows="5"
            cols="10"
            class="form_control"
            v-model="inforProductById.summary"
          ></textarea>
        </div>
      </div>
      <div class="form_group">
        <label for class>Thẻ</label>
        <div class="">
          <taggle
            class="taggle form_control"
            placeholder="nhap chu va enter de tao"
            v-model="inforProductById.tags"
          />
        </div>
      </div>
      <div
        class="btn btn_warning"
        @click="updateProduct"
        v-if="nodeUpdate === 0"
      >
        Cập nhật
      </div>
      <div
        class="btn btn_success"
        @click="createProduct"
        v-if="nodeUpdate === 1"
      >
        Tạo mới
      </div>
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
