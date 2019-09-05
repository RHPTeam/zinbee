<template>
  <div class="p_server">
    <!-- START: HEADER POST SERVER -->
    <div class="top mb_3 d_flex align_content_center justify_content_between">
      <div></div>
      <div class="btn_new" @click="openPopupCreatePostServer">
        Tạo mới server
      </div>
    </div>
    <!-- END: HEADER POST SERVER -->

    <!-- START: CONTENT POST SERVER -->
    <div class="middle">
      <div class="content--body">
        <div class="table-container" role="table" aria-label="Destinations">
          <div class="flex-table header" role="rowgroup">
            <div class="flex-row first" role="columnheader">Tên</div>
            <div class="flex-row" role="columnheader">Trạng thái</div>
            <div class="flex-row" role="columnheader">id server</div>
            <div class="flex-row" role="columnheader">Hành động</div>
          </div>
          <div v-if="!postServers">Không có dữ liệu</div>
          <div v-else>
            <item-server
              v-for="(item, index) in postServers"
              :key="index"
              :item="item"
              @openPopupEditPostServer="isShowCreateNewPostServer = $event"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- END: CONTENT POST SERVER -->

    <!-- START: CREATE NEW POST AND EDIT INFORMATION SERVER -->
    <create-new-server
      v-if="isShowCreateNewPostServer === true"
      @closePopUp="isShowCreateNewPostServer = $event"
    />
    <!-- END: CREATE NEW POST AND EDIT INFORMATION SERVER -->
  </div>
</template>
<script>
import ItemServer from "./components/item";
import CreateNewServer from "./components/popup";
export default {
  components: {
    CreateNewServer,
    ItemServer
  },
  data() {
    return {
      isShowCreateNewPostServer: false
    };
  },
  computed: {
    postServers() {
      return this.$store.getters.postServers;
    }
  },
  created() {
    this.$store.dispatch("getPostServer");
  },
  methods: {
    openPopupCreatePostServer() {
      this.$store.dispatch("setPostServerDefault");
      this.$store.dispatch("setVariableControlButton", 0);
      this.isShowCreateNewPostServer = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
