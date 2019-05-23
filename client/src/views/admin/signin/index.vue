<template>
  <div class="wrap">
    <div class="info d_flex align_items_center justify_content_center p_3 mt_5">
      <form>
        <h3>Đăng nhập vào hệ thống Admin</h3>
        <div class="form_group">
          <label>Tên đăng nhập</label>
          <input type="text" class="form_control" />
        </div>

        <div class="form_group">
          <label>Mật khẩu</label>
          <input type="text" class="form_control" />
        </div>
        <button class="btn btn_info form_control">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">

</script>
<style lang="scss" scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  .info {
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    margin: auto;
    width: 500px;
  }
}
</style>
