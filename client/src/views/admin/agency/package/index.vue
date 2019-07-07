<template>
  <div class="package">
    <div class="r">
      <div
        class="c_lg_3 c_xl_3 c_md_6 mb_3"
        v-if="this.$store.getters.packageStatus === 'loading'"
      >
        <div class="card d_flex flex_column align_items_center px_3 py_5">
          <loading-component />
        </div>
      </div>
      <div
        class="c_lg_3 c_xl_3 c_md_6 mb_3 position_relative"
        v-for="(item, index) in packages"
        :key="index"
      >
        <div
          class="card d_flex flex_column align_items_center position_relative px_3 py_4"
          @click="showInfoPackage(item._id)"
        >
          <div class="icon mb_2">
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="30"
              height="30"
              viewBox="0 0 481 481"
            >
              <icon-folder />
            </icon-base>
          </div>
          <div class="desc text_left">Gói {{ item.title }}</div>
          <div class="desc text_left">Thời gian {{ item.total }} tháng</div>
        </div>

        <div
          class="above d_flex align_items_center position_absolute"
          @click="isShowDeletePopup = true"
        >
          <icon-base
            class="icon--remove"
            icon-name="plus"
            width="24"
            height="24"
            viewBox="0 0 20 20"
          >
            <icon-remove />
          </icon-base>
        </div>

        <!--        *********** POPUP *************-->
        <transition name="popup">
          <delete-package
            v-if="isShowDeletePopup === true"
            :item="item._id"
            @close="isShowDeletePopup = $event"
          ></delete-package>
        </transition>
      </div>

      <div class="c_lg_3 c_xl_3 c_md_6 mb_3">
        <div
          class="card d_flex flex_column align_items_center px_3 py_4"
          @click="createPackage"
        >
          <div class="icon mb_2">
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="30"
              height="30"
              viewBox="0 0 66 66"
            >
              <icon-plus />
            </icon-base>
          </div>
          <div class="desc">Tạo thư mục mới</div>
          <div class="desc"><span :style="{ opacity: 0 }">i</span></div>
        </div>
      </div>
    </div>
    <!-- Start: Popup create package-->
    <create-package
      v-if="isShowCreate === true"
      :variableControl="variableControl"
      @closePopup="isShowCreate = $event"
    />
    <!-- End: Popup create package-->
  </div>
</template>

<script>
import CreatePackage from "./components/popup/create";
import DeletePackage from "./components/popup/delete";
export default {
  components: {
    CreatePackage,
    DeletePackage
  },
  data() {
    return {
      isShowCreate: false,
      isShowDeletePopup: false,
      variableControl: false
    };
  },
  computed: {
    packages() {
      return this.$store.getters.packages;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPackage");
  },
  methods: {
    async createPackage() {
      await this.$store.dispatch("setPackageDefault", {
        title: "",
        total: ""
      });
      this.isShowCreate = true;
    },
    async showInfoPackage(val) {
      await this.$store.dispatch("getPackageById", val);
      this.variableControl = true;
      this.isShowCreate = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.package {
  .c_md_6 {
    &:hover,
    &:active,
    &:visited,
    &:focus {
      > .above {
        opacity: 1;
      }
    }
    .above {
      cursor: pointer;
      top: 0.5rem;
      right: 1rem;
      z-index: 9;
      opacity: 0;
    }
  }
  .card {
    cursor: pointer;
    border-radius: 1rem;
  }
}
</style>
