<template>
  <div class="search mx_0 px_5 py_3">
    <div class="input_group d_flex">
      <input type="text"
             class="form_control"
             placeholder="Tìm kiếm"
      >
      <div class="btn btn_info">
        <icon-base
          viewBox="0 0 20 20"
        >
          <icon-input-search></icon-input-search>
        </icon-base>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.search {
  font-size: .875rem;
  width: 100%;
}
</style>
