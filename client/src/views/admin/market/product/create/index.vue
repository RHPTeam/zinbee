<template>
  <div class="model--wrapper create--product">
    <div class="model--content card p_3">
      <div class="form_group">
        <label for class>Chon the loai bai de dang:</label>
        <div class="mb_2 d_flex">
          <div class="mr_1 btn btn_info" @click="showOptionsPost">Post</div>
          <div class="btn btn_info" @click="showOptionsCampaign">Campaign</div>
        </div>
        <div class="py_0 post" v-if="isOptionsPost === true">
          <multiselect
            label="name"
            class="form_control p_0"
            placeholder="Chọn bài de đăng..."
          />
          <div class="post mt_2">
            <label for class="">Danh muc:</label>
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
            <label for class>Danh muc:</label>
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
        <label for class>Tieu de:</label>
        <input
          type="text"
          class="form_control"
          v-model="inforProductById.name"
        />
      </div>
      <div class="form_group d_flex align_items_center price">
        <label for class="mr_2 m_0">Gia:</label>
        <div class="d_inline_flex">
          <input
            type="number"
            class="form_control p_1"
            id
            placeholder="100.000 d"
            min="10"
            v-model="inforProductById.priceCents"
          />
          <div class="pl_3 price--info">Don vi nay se tinh bang VND</div>
        </div>
      </div>
      <div class="form_group">
        <label class>Dac diem:</label>
        <div
          v-for="(attr, index) in inforProductById.attributes"
          :key="`e-${index}`"
        >
          <div class="d_flex align_items_center mb_2">
            <div class="mr_2">
              <input
                type="text"
                class="form_control"
                placeholder="Name"
                v-model="inforProductById.attributes[index].name"
              />
            </div>
            <div class="mr_2">
              <input
                type="text"
                class="form_control"
                placeholder="Value"
                v-model="inforProductById.attributes[index].value"
              />
            </div>
          </div>
        </div>
        <div
          class="d_inline_flex mb_2 align_items_center add--att p_1"
          @click="addAttribute"
        >
          <icon-base
            icon-name="icon-plus"
            class="icon-plus"
            width="25"
            height="25"
            viewBox="0 0 60 70"
          >
            <icon-plus />
          </icon-base>
          Thêm dac diem
        </div>
      </div>
      <div class="form_group">
        <label for class>Anh dai dien:</label>
        <div class>
          <input type="file" class="form_control p_1" />
        </div>
        <div class="contain--images"></div>
      </div>
      <div class="form_group">
        <label for class>Mo ta bai viet:</label>
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
        <label for class>Noi dung khi xem thu:</label>
        <div class>
          <textarea
            rows="5"
            cols="10"
            class="form_control"
            v-model="inforProductById.content"
          ></textarea>
        </div>
      </div>
      <div class="form_group">
        <label for class>Bai viet thuoc TAG nao:</label>
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
        Update
      </div>
      <div
        class="btn btn_success"
        @click="createProduct"
        v-if="nodeUpdate === 1"
      >
        Tao moi
      </div>
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
