<template>
  <div class="items fail py_3 mb_3">
    <div class="content pl_3">
      <div class="user item">
        <!-- Start: Info User -->
        <div class="header avt d_flex align_items_center mb_2">
          <div class="avatar pr_2">
            <!-- <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px" /> -->
          </div>
          <span class="col col--name-text pr_3">Name User</span>
          <div class="id--user">#1234</div>
        </div>
        <!-- End: Info User -->
        <!-- Start: Info Main -->
        <div class="main d_flex align_items_center mb_2">
          <div class="icon pr_2">
            <span>
              <icon-base icon-name="Chiến dịch" width="23" height="23" viewBox="0 0 24 24">
                <icon-broadcast />
              </icon-base>
            </span>
          </div>
          <div class="content">
            <!-- Success -->
            <!-- <div class="item--success">
              Đăng thành công trong chiến dịch
              <b>Chiến dịch 1</b> với bài viết
              <b>
                <div>Bài viết 00</div>
              </b>
            </div> -->
            <!-- Fail -->
            <div class="item--success d_flex align_items_center" @click="showPopupInfoPostEvent">
              Đăng thất bại trong chiến dịch
              <b>Chiến dịch 1</b> với bài viết
              <b>
                <div>Bài viết 00</div>
              </b>
            </div>
          </div>
        </div>
        <!-- End: Info Main -->
        <!-- Start: Info footer -->
        <div class="footer d_flex align_items_center">
          <div class="id--post">Id: id_post</div>
          <div class="dots mx_2"></div>
          <div class="day">
            <span>Ngày: 01/01/2018</span>
            <span class="pl_1">at 10:10</span>
          </div>
        </div>
        <!-- End: Info footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showPopupInfoPostEvent() {
      this.$emit("showPopupInfoPostEvent", true);
    }
  }
};
</script>

<style scoped lang="scss">
.items {
  background: #fafafa;
  font-size: 0.9315rem;
  .avt {
    width: 100%;
    overflow: hidden;

    .avatar .img {
      border-radius: 50%;
    }

    &-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90%;
    }
  }
  .footer {
    .dots {
      height: 5px;
      width: 5px;
      border-radius: 50%;
      background: red;
    }
  }
}
b {
  padding: 0 5px;
}
</style>