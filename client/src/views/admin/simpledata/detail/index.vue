<template>
  <div class="detail mt_4">
    <!-- Start: Select List content simple data -->
    <div class="list mb_3" v-if="isShowResultDefault === false">
      <div class="header mb_4">
        <span class="add" @click="isShowResultDefault = true">
          Xong
        </span>
      </div>
      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row first" role="columnheader">Tiêu đề</div>
          <div class="flex-row content" role="columnheader">Nội dung</div>
          <div class="flex-row action" role="columnheader">Hành động</div>
        </div>
        <!--        <div v-if="this.$store.getters.statusLib === 'loading'">-->
        <!--          <loading-component />-->
        <!--        </div>-->
        <div>
          <item />
        </div>
      </div>
    </div>
    <!-- End: Select List content simple data -->
    <!-- Start: List content simple data -->
    <div class="body" v-if="isShowResultDefault === true">
      <div class="header mb_4">
        <span class="add mr_3" @click="comeBackFolder">Quay lại</span>
        <span class="add" @click="isShowResultDefault = false"
          >Thêm bài viết</span
        >
      </div>

      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row first" role="columnheader">Tiêu đề</div>
          <div class="flex-row content" role="columnheader">Nội dung</div>
          <div class="flex-row action" role="columnheader">Hành động</div>
        </div>
        <!--        <div v-if="this.$store.getters.statusLib === 'loading'">-->
        <!--          <loading-component />-->
        <!--        </div>-->
        <div>
          <item />
        </div>
      </div>
    </div>
    <!-- End: List content simple data -->
  </div>
</template>

<script>
import Item from "./item";
export default {
  components: {
    Item
  },
  data() {
    return {
      isShowResultDefault: true
    };
  },
  methods: {
    comeBackFolder() {
      this.$router.push({ name: "simple_data" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
