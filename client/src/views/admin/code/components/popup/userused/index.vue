<template>
  <div class="modal--wrapper">
    <div class="modal--dialog">
      <div class="modal--content">
        <div class="item--header d_flex align_items_center px_3 py_2">
          <div class="col col--name">Tên người dùng</div>
          <div class="col col--category status">Email</div>
          <div class="col col--category expire text_center">Số điện thoại</div>
        </div>
        <div class="py_2 text_center" v-if="user._users.length > 0">
          Chưa có người nào sử dụng mã code này!
        </div>
        <div
          v-else
          class="item--body d_flex align_items_center px_3 py_2"
          v-for="item in user._users"
          :key="item._id"
        >
          <!-- Start: Name Column -->
          <div class="col col--name d_flex align_items_center text_left px_2">
            <div
              v-if="item.imageAvatar"
              class="user--info-avatar had--avt"
              :style="{
                backgroundImage: 'url(' + item.imageAvatar + ')'
              }"
            ></div>
            <div class="pl_2">{{ item.name }}</div>
          </div>
          <!-- End: Name Column -->
          <!-- Start: Type Column -->
          <div class="col col--category">
            <span>{{ item.email }}</span>
          </div>
          <!-- End: Type Column -->
          <!-- Start: Phone Column -->
          <div class="col col--category text_center">
            <span>{{ item.phone }}</span>
          </div>
          <!-- End: Phone Column -->
        </div>
        <!-- Start: footer -->
        <div class="item--footer d_flex align_items_center px_3 my_4">
          <div class="left mr_auto" @click="closePopup">HỦY</div>
        </div>
        <!-- End: footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.infoUserUsedCode;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  },
  async created() {}
};
</script>

<style lang="scss" scoped>
// @import "./index.style";
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  bottom: 0;
  font-family: "Open Sans", sans-serif;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  .modal--dialog {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
  .modal--header {
    font-size: 1.5rem;
  }
  .modal--content {
    background-color: #2f3236;
    border-radius: 0.625rem;
    max-height: calc(100vh - 10%);
    width: 70%;
    color: #ccc;
  }
}
.item--header {
  background-color: #27292d;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #ccc;
  height: 48px;
  .col--name {
    width: 40%;
  }
  .col--category {
    width: 30%;
  }
}
.item--body {
  background: #4345498f;
  .user--info-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ffb94a;
    background-position: center;
    background-size: cover;
    font-size: 80px;
    font-weight: 800;
    color: #444444;
    overflow: hidden;
  }
  &:hover {
    background: #434549fc;
  }
  .col--name {
    width: 40%;
  }
  .col--category {
    width: 30%;
  }
}
.item--footer {
  .left {
    padding: 0.5rem 1.5rem;
    background-color: #2f3136;
    border-radius: 0.625rem;
    border: 1px solid #e4e4e4;
    cursor: pointer;
  }
}
</style>
