<template>
  <div class="categories position_relative" :data-theme="currentTheme">
    <div class="top d_flex align_items_center mb_4">
      <router-link tag="label" class="link" :to="{ name: 'admin_help'}">
        Quay lại
      </router-link>
      <label class="link" @click="isShowPopupCategories = true">
        Tạo mới
      </label>
    </div>
    <div class="desc mb_3">Danh sách các danh mục hiện có</div>
    <div class="body px_3 py_2">
      <div v-if="!allCategories"></div>
      <div v-else class="item mb_1" v-for="(item, index) in allCategories" :key="`c-${index}`">
        <!--Start: categories dont parent-->
        <div class="d_flex align_items_center justify_content_between">
          <div class="left">{{ item.title }}</div>
          <div class="right d_flex align_items_center">
            <div class="icon mr_2" @click="showInfoCategories(item._id)">
              <icon-base
                class="icon--arrow-left"
                icon-name="arrow"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <icon-edit></icon-edit>
              </icon-base>
            </div>
            <div class="icon" @click="deleteCategories(item._id)">
              <icon-base
                class="icon--arrow-left"
                icon-name="arrow"
                width="24"
                height="24"
                viewBox="0 0 18 18"
              >
                <icon-remove></icon-remove>
              </icon-base>
            </div>
          </div>
        </div>
        <!--End: categories dont parent-->
        <!--Start: categories have parent-->
<!--        <div v-if="item.parent === undefined || item.parent === ''"></div>-->
<!--        <div v-else>-->
<!--          <div class="children d_flex align_items_center pl_3" v-for="(child, index) in item.parent" :key="`i-${index}`">-->
<!--            {{child.title}}-->
<!--          </div>-->
<!--        </div>-->
        <!--End: categories have parent-->
      </div>
    </div>
    <!--Start: Popup new and update categories-->
    <popup-categories
      v-if="isShowPopupCategories === true"
      @close="isShowPopupCategories = $event"
      @backDefault="isDefault = $event"
      :currentTheme="currentTheme"
      :isDefault="isDefault"
    />
    <!--Start: Popup new and update categories-->
  </div>
</template>
<script>
import PopupCategories from "./action";
export default {
  components: {
    PopupCategories
  },
  data() {
    return {
      isShowPopupCategories: false,
      isDefault: true
    };
  },
  computed: {
    allCategories() {
      return this.$store.getters.allCategories;
    },
    currentTheme(){
      return this.$store.getters.themeName;
    }
  },
  methods: {
    showInfoCategories(val) {
      this.$store.dispatch("getCategoriesById", val);
      this.isShowPopupCategories = true;
      this.isDefault = false;
    },
    deleteCategories(val) {
      this.$store.dispatch("deleteCategories", val);
    }
  },
};
</script>
<style lang="scss" scoped>
.categories {
  .top {
    .link {
      border: 1px solid #e4e4e4;
      border-radius: 0.625rem;
      color: #444444;
      cursor: pointer;
      margin-right: 1rem;
      padding: 0.5rem 1rem;
      &:hover,
      &:active,
      &:visited,
      &:focus {
        text-decoration: none;
        border-color: #ffb94a;
        transition: all 0.5s ease;
      }
    }
  }
  .desc {
    font-weight: 600;
  }
  .body {
    border: 1px solid #e4e4e4;
    border-radius: .625rem;
    .item {
      border-bottom: 1px solid #e4e4e4;
      cursor: pointer;
    }
  }
}
</style>
