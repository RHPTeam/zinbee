<template>
  <div class="modal--wrapper filter--product mb_3">
    <div class="modal--content">
      <div class="select d_flex">
        <div
          class="items"
          :class="isActiveBestSeller === true ? 'active' : ''"
          @click="productsByBestSell"
        >
          Bán chạy nhất
        </div>
        <div
          class="items"
          @click="productsNewest"
          :class="isActiveNewest === true ? 'active' : ''"
        >
          Mới nhất
        </div>
        <!-- <button class="items">Trending</button> -->
        <div
          class="items"
          :class="isActivePrice === true ? 'active' : ''"
          @click="showDropdownPrice"
          v-click-outside="closeDropdownPrice"
        >
          <div>Giá bán</div>
          <ul v-if="isShowDropdownPrice === true">
            <li class="item--price" @click="productsByPriceGrow">Tăng</li>
            <li class="item--price" @click="productsByPriceLose">Giảm</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDropdownPrice: false,
      isActiveBestSeller: false,
      isActiveNewest: false,
      isActivePrice: false
    };
  },
  computed: {
    productsInCategory() {
      return this.$store.getters.productsByCategory;
    }
  },
  methods: {
    showDropdownPrice() {
      this.isActiveFilter = true;
      this.isShowDropdownPrice = true;
    },
    closeDropdownPrice() {
      this.isShowDropdownPrice = false;
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
    compareNewest(a, b) {
      const genreA = new Date(a.updatedAt);
      const genreB = new Date(b.updatedAt);

      let comparison = 0;
      if (genreA > genreB) {
        comparison = 1;
      } else if (genreA < genreB) {
        comparison = -1;
      }
      return comparison;
    },
    productsByBestSell() {
      this.isActiveBestSeller = true;
      this.isActiveNewest = false;
      this.isActivePrice = false;
      this.productsInCategory.sort(this.compareNumberOfSales).reverse();
    },
    productsByPriceGrow() {
      this.isActiveBestSeller = false;
      this.isActiveNewest = false;
      this.isShowDropdownPrice = false;
      this.isActivePrice = true;
      this.productsInCategory.sort(this.comparePrice);
    },
    productsByPriceLose() {
      this.isActiveBestSeller = false;
      this.isActiveNewest = false;
      this.isActivePrice = true;
      this.isShowDropdownPrice = false;
      this.productsInCategory.sort(this.comparePrice).reverse();
    },
    productsNewest() {
      this.isActiveBestSeller = false;
      this.isActiveNewest = true;
      this.isActivePrice = false;
      this.productsInCategory.sort(this.compareNewest);
    }
  },
  created() {
    // if(this.$route.params.subCategory.length > 0){
    //   this.$store.dispatch(
    //     "getProductsByCategory",
    //     this.$route.params.subCategory
    //   );
    // } else {
    //   return;
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
