<template>
  <div class="items copy py_3 mb_3">
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
              <icon-base
                icon-name="Tài khoản Facebook"
                width="23"
                height="23"
                viewBox="0 0 24 24"
              >
                <icon-account />
              </icon-base>
            </span>
            <!-- <span>
              <icon-base icon-name="Facebook tìm kiếm" width="25" height="25" viewBox="0 0 24 24">
                <icon-input-search />
              </icon-base>
            </span>
            <span>
              <icon-base icon-name="Kho nội dung" width="20" height="20" viewBox="0 0 540 540">
                <icon-post />
              </icon-base>
            </span>
            <span>
              <icon-base
                icon-name="icon-autoreply"
                class="icon--info"
                width="25"
                height="25"
                viewBox="0 0 25 15"
              >
                <icon-friend />
              </icon-base>
            </span>
            <span>
              <icon-base icon-name="Chiến dịch" width="23" height="23" viewBox="0 0 24 24">
                <icon-broadcast />
              </icon-base>
            </span>-->
          </div>
          <div class="content">
            <!-- Category default -->
            <!-- <div class="category">
              Sao chép danh mục <b>Danh mục 1</b>
            </div> -->
            <!-- campaign default -->
            <div class="campaign">
              Sao chép chiến dịch <b>Chiến dịch mẫu 1</b>
            </div>
          </div>
        </div>
        <!-- End: Info Main -->
        <!-- Start: Info footer -->
        <div class="footer d_flex align_items_center">
          <div class="id--post">Id: 6789</div>
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
export default {};
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
</style>
