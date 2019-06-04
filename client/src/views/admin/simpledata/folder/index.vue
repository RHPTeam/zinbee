<template>
  <div class="simple position_relative" :data-theme="currentTheme">
    <bread-crumb :breadTitle="breadTitle" :breadDesc="breadDesc" />
    <div class="body">
      <div class="r">
        <div class="c_3 mb_3">
          <div
            class="card d_flex flex_column align_items_center position_relative px_3 py_5"
            @click="showInfoFolder"
          >
            <div class="icon mb_2">
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="50"
                height="50"
                viewBox="0 0 481 481"
              >
                <icon-folder />
              </icon-base>
            </div>
            <div class="desc">Tên folder</div>
            <div class="above position_absolute" @click="isShowDeletePopup = true">
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
          </div>
        </div>

        <div class="c_3 mb_3">
          <div
            class="card d_flex flex_column align_items_center px_3 py_5"
            @click="isShowCreateGroup = true"
          >
            <div class="icon mb_2">
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="50"
                height="50"
                viewBox="0 0 66 66"
              >
                <icon-plus />
              </icon-base>
            </div>
            <div class="desc">Tạo thư mục mới</div>
          </div>
        </div>
      </div>
    </div>
    <!--*********** POPUP *************-->
    <transition name="popup">
      <create-folder-popup
        v-if="isShowCreateGroup === true"
        :data-theme="currentTheme"
        @closePopup="isShowCreateGroup = $event"
      ></create-folder-popup>
      <delete-folder-popup
        v-if="isShowDeletePopup === true"
        :data-theme="currentTheme"
        @close="isShowDeletePopup = $event"
      ></delete-folder-popup>
    </transition>
  </div>
</template>

<script>
import BreadCrumb from "../breadcrumb/index";
import CreateFolderPopup from "../popup/create/index";
import DeleteFolderPopup from "../popup/delete/index";
export default {
  components: {
    BreadCrumb,
    CreateFolderPopup,
    DeleteFolderPopup
  },
  data() {
    return {
      breadTitle: "Dữ liệu mẫu",
      breadDesc: "dữ liệu mẫu giúp bạn làm một cái gì gì đó dễ dàng hơn",
      isShowCreateGroup: false,
      isShowDeletePopup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    showInfoFolder() {
      this.$router.push({name: "simple_edit"});
    }
  },
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
