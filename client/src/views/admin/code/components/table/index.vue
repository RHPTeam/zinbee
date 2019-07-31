<template>
  <div class="main">
    <div class="item--header d_flex align_items_center px_3 py_2">
      <div class="col col--name">Mã code</div>
      <div class="col col--category expire">Ngày hết hạn</div>
      <div class="col col--category status">Trạng thái</div>
      <div class="col col--category number--account activated">
        Số lượng tài khoản
      </div>
      <div class="col col--action">Hành động</div>
    </div>
    <div>
      <div class="text_center my_2">Không có dữ liệu</div>
      <!-- <app-item
        v-for="(member, index) in agency"
        :key="index"
        :member="member"
        @openEdit="openPopupEditInfoMember($event)"
      /> -->
    </div>
  </div>
</template>

<script>
// import AppItem from "./item";
export default {
  components: {
    // AppItem
  }
};
</script>

<style lang="scss" scoped>
// @import "./index.style";
.item--header {
  background-color: #27292d;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #ccc;
  height: 48px;
  .col--name {
    width: 25%;
  }
  .col--category {
    width: 20%;
  }
  .col--action {
    width: 15%;
    text-align: center;
  }
}
</style>
