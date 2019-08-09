<template>
  <div class="items update py_3 mb_3">
    <div class="content pl_3">
      <div class="user item">
        <!-- Start: Info User -->
        <div class="header avt d_flex align_items_center mb_2">
          <div class="avatar pr_2">
            <!-- <img :src="item.userInfo.thumbSrc" alt="avatar" width="30px" height="30px" /> -->
          </div>
          <span class="col col--name-text pr_2">Name User</span>
          <div class="id--user">#1234</div>
        </div>
        <!-- End: Info User -->
        <!-- Start: Info Main -->
        <div class="main d_flex align_items_center mb_2">
          <div class="icon pr_2">
            <!-- <span>
              <icon-base icon-name="Tài khoản Facebook" width="23" height="23" viewBox="0 0 24 24">
                <icon-account />
              </icon-base>
            </span>-->
            <!-- <span>
              <icon-base icon-name="Facebook tìm kiếm" width="25" height="25" viewBox="0 0 24 24">
                <icon-input-search />
              </icon-base>
            </span>-->
            <!-- <span>
              <icon-base icon-name="Kho nội dung" width="20" height="20" viewBox="0 0 540 540">
                <icon-post />
              </icon-base>
            </span>-->
            <!-- <span>
              <icon-base
                icon-name="icon-autoreply"
                class="icon--info"
                width="25"
                height="25"
                viewBox="0 0 25 15"
              >
                <icon-friend />
              </icon-base>
            </span>-->
            <span>
              <icon-base
                icon-name="Chiến dịch"
                width="23"
                height="23"
                viewBox="0 0 24 24"
              >
                <icon-broadcast />
              </icon-base>
            </span>
          </div>
          <div class="content">
            <!-- Start: Account Facebook -->
            <!-- <div class="account--fb">
              Cập nhật tài khoản
              <b>HiHi</b>
            </div>-->

            <!-- Start: Post -->
            <!-- <div class="post">
              Cập nhật bài viết
              <b>HaHa</b>
            </div>-->

            <!-- <div class="category">
              Cập nhật danh mục <span class="pr_1">nâng cao</span>
              <b>Danh mục 1</b>
            </div>-->

            <!-- Start: PostGroup -->
            <div class="postgroup" @click="showInfoPostgroup">
              Cập nhật nhóm <b>Nhóm 1</b> với:
              <div><b>1</b> TCN, <b>2</b> Fanpage, <b>3</b> Group</div>
            </div>

            <!-- Start: Camapgin -->
            <!-- <div class="campaign">
              Cập nhật tên chiến dịch từ <b>Chiến dịch 1</b> thành <b>Chiến dịch 2</b>
            </div>-->

            <!-- <div class="event">
              Cập nhật tên sự kiện từ <b>Event 1</b> thành <b>Event 2</b> trong chiến dịch <b>Chiến dịch 1</b>
            </div>-->
            <!-- <div class="event" @click="showInfoUpdateEvent">
              Cập nhật sự kiện
              <b>Event 1</b> trong chiến dịch
              <b>Chiến dịch 1</b> với:
              <ul class="content mb_0">
                <li>
                  Thời gian: Ngày
                  <b>01/01/2018</b> at
                  <b>10:10</b> delay
                  <b>5</b> phút
                </li>
                <li>
                  Đăng từ
                  <span>danh mục: <b>Danh mục 1</b></span>
                  <span>
                    kho nội dung:
                    <b>7 bài viết</b>
                  </span>
                </li>
                <li>
                  Nội dung nâng cao:
                  <b>Mở bài</b>,
                  <b>Kết bài</b>
                </li>
                <li>
                  Nơi đăng:
                  <b>1</b> TCN,
                  <b>2</b> Page,
                  <b>3</b> Group
                </li>
              </ul>
            </div> -->
          </div>
        </div>
        <!-- End: Info Main -->
        <!-- Start: Info footer -->
        <div class="footer d_flex align_items_center">
          <div class="id--post">Id: 6789</div>
          <div class="dots mx_2"></div>
          <div class="day">
            <span>Ngày: 01/01/2018</span>
            <span class="pl_1">at 10:11</span>
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
    showInfoPostgroup() {
      this.$emit("showInfoPostgroup", true);
    },
    showInfoUpdateEvent() {
      this.$emit("showInfoUpdateEvent", true);
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
/*Transition popup*/
.popup-enter-active,
.popup-leave-active {
  transition: opacity 1s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
