<template>
  <div class="modal--wrapper">
    <div class="modal--content">
      <div class="create mb_3 text_left btn btn--active " @click="goToCreate">
        Tạo mới
      </div>
    </div>
    <!-- List product -->
    <div class="list--product">
      <h3>Danh sach san pham</h3>
      <div class="card p_3">
        <div class="table">
          <!-- Header Table -->
          <div class="d_flex header--title">
            <div class="kind--of p_2">The loai bai dang</div>
            <div class="category--title p_2">Danh muc</div>
            <div class="tag--title p_2">Thuoc tag</div>
            <div class="price--title p_2">Price</div>
            <div class="price--title p_2">Nguoi tao</div>
            <div></div>
          </div>
          <!-- Header Content -->
          <div v-if="products && products.length > 0">
            <div
              class="d_flex content"
              v-for="(product, index) in products"
              :key="index"
            >
              <div class="kind--of--item p_2" v-if="product.name && product.name.length > 0">{{ product.name }}</div>
              <div class="category--item p_2" v-if="product._category && product._category.length > 0">{{ product._category.name }}</div>
              <div class="tag--item p_2">
              <span v-for="(tag, index) in product.tags" :key="`a-${index}`"
              >{{ tag
                }}{{ index === product.tags.length - 1 ? "" : ", " }}</span
              >
              </div>
              <div class="price--item p_2" v-if="product.priceCents && product.priceCents.length > 0">{{ product.priceCents }}</div>
              <div class="price--item p_2" v-if="product._creator && product._creator.length > 0">{{ product._creator.name }}</div>
              <div class="action p_2 d_flex">
                <div class="btn btn_primary mr_1" @click="goToUpdate(product)">
                  Update
                </div>
                <div class="btn btn_danger" @click="deleteProduct(product._id)">
                  Delete
                </div>
              </div>
            </div>
          </div>
          <div class="p_2 text_center" v-else>
            Không có sản phẩm nào
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
