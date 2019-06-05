<template>
  <div class="modal--wrapper">
    <div class="modal--content">
      <div class="create mb_3">
        <router-link
          :to="{ name: 'product_create' }"
          class="categories text_left btn btn_primary"
          >Tao moi</router-link
        >
      </div>
    </div>
    <div class="list--product">
      <h3>Danh sach san pham</h3>
      <div class="card p_3">
        <div class="table">
          <div class="d_flex header--title">
            <div class="kind--of p_2">The loai bai dang</div>
            <div class="category--title p_2">Danh muc</div>
            <div class="tag--title p_2">Thuoc tag</div>
            <div class="price--title p_2">Price</div>
          </div>
          <div class="d_flex content">
            <div class="kind--of--item p_2">
              The loai bai dang >The loai bai dang >The loai bai dang
            </div>
            <div class="category--item p_2">Danh muc</div>
            <div class="tag--item p_2">Thuoc tag</div>
            <div class="price--item p_2">Price</div>
          </div>
          <div class="d_flex content">
            <div class="kind--of--item p_2">
              The loai bai dang >The loai bai dang >The loai bai dang
            </div>
            <div class="category--item p_2">Danh muc</div>
            <div class="tag--item p_2">Thuoc tag</div>
            <div class="price--item p_2">Price</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
