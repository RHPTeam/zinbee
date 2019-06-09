<template>
  <div class="modal--wrapper filter--product mb_3">
    <div class="modal--content">
      <div class="select d_flex">
        <div class="items active" @click="productsByBestSell">Best sellers</div>
        <div class="items">Newest</div>
        <!-- <button class="items">Trending</button> -->
        <div class="items">
          <div @click="showDropdownPrice">Price</div>
          <ul v-if="isShowDropdownPrice">
            <li class="item--price" @click="productsByPriceGrow">Tăng</li>
            <li class="item--price" @click="productsByPriceLose">Giảm</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div>{{ productsInCategory }}</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDropdownPrice: false
    };
  },
  computed: {
    productsInCategory() {
      return this.$store.getters.productsByCategory;
    }
  },
  methods: {
    showDropdownPrice() {
      this.isShowDropdownPrice = true;
    },
    comparePrice(a, b) {
      const genreA = parseInt(a.priceCents);
      const genreB = parseInt(b.priceCents);

      let comparison = 0;
      if (genreA > genreB) {
        comparison = 1;
      } else if (genreA < genreB) {
        comparison = -1;
      }
      return comparison;
    },
    compareNumberOfSales(a, b) {
      const genreA = parseInt(a.numberOfSales);
      const genreB = parseInt(b.numberOfSales);

      let comparison = 0;
      if (genreA > genreB) {
        comparison = 1;
      } else if (genreA < genreB) {
        comparison = -1;
      }
      return comparison;
    },
    productsByBestSell() {
      this.productsInCategory.sort(this.compareNumberOfSales).reverse();
    },
    productsByPriceGrow() {
      this.productsInCategory.sort(this.comparePrice);
      this.isShowDropdownPrice = false;
    },
    productsByPriceLose() {
      this.productsInCategory.sort(this.comparePrice).reverse();
      this.isShowDropdownPrice = false;
    }
  },
  created() {
    // this.$store.dispatch("getProductsByCategory");
    this.$store.dispatch(
      "getProductsByCategory",
      this.$route.params.subCategory
    );
    // if(this.$route.params.subCategory.length > 0){

    // } else {
    //   return;
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
