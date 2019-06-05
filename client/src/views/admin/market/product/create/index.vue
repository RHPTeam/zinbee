<template>
  <div class="model--wrapper create--product">
    <div class="model--content card p_3">
      <div class="form_group">
        <label for="" class="">Chon the loai bai de dang:</label>
        <div class="mb_2 d_flex">
          <div class="mr_1 btn btn_info" @click="showOptionsPost">Post</div>
          <div class="btn btn_info" @click="showOptionsCampaign">Campaign</div>
        </div>
        <div class="form_control py_0 post" v-if="isOptionsPost === true">
          <multiselect label="name" placeholder="Chọn bài de đăng..." />
        </div>
        <div
          class="form_control py_0 campaign"
          v-if="isOptionsCapaign === true"
        >
          <multiselect label="name" placeholder="Chọn bài de đăng..." />
        </div>
      </div>
      <div class="form_group title">
        <label for="" class="">Tieu de:</label>
        <input type="text" class="form_control" v-model="titleProduct" />
      </div>
      <div class="form_group category">
        <label for="" class="">Danh muc:</label>
        <div class="form_control py_0">
          <multiselect label="name" placeholder="Chọn danh mục đăng bài..." />
        </div>
      </div>
      <div class="form_group d_flex align_items_center price">
        <label for="" class="mr_2 m_0">Gia:</label>
        <div class="d_inline_flex">
          <input
            type="number"
            class="form_control p_1"
            id=""
            placeholder="100.000 d"
            min="10"
          />
          <div class="pl_3 price--info">Don vi nay se tinh bang VND</div>
        </div>
      </div>
      <div class="form_group">
        <label class="">Dac diem:</label>
        <div class="r">
          <div class="c">
            <input type="text" class="form_control" placeholder="Key" />
          </div>
          <div class="c">
            <input type="text" class="form_control" placeholder="Value" />
          </div>
        </div>
      </div>
      <div class="form_group">
        <label for="" class="">Anh dai dien:</label>
        <div class="">
          <input type="file" class="form_control p_1" />
        </div>
        <div class="contain--images"></div>
      </div>
      <div class="form_group">
        <label for="" class="">Noi dung khi xem thu:</label>
        <div class="">
          <textarea
            name=""
            id=""
            rows="5"
            cols="10"
            class="form_control"
          ></textarea>
        </div>
      </div>
      <div class="form_group">
        <label for="" class="">Bai viet thuoc TAG nao:</label>
        <div class="">
          <taggle class="taggle" placeholder="hoa hau" />
        </div>
      </div>
      <div class="btn btn_success" @click="createProduct">Tao moi</div>
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
