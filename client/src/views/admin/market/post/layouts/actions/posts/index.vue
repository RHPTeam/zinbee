<template>
  <div
    class="post--action d_flex align_items_center"
    :data-theme="currentTheme"
  >
    <div class="action--left c_lg_4 pl_0">
      <div
        class="post--search d_flex justify_content_between align_items_center"
      >
        <span class="ml_3 mt_1">
          <icon-base
            icon-name="input-search"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-input-search />
          </icon-base>
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm bài viết"
          v-model="search"
          @keydown.enter="updateSearch()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["filterShowSelected"],
  data() {
    return {
      filterShowList: [
        { id: 25, name: "Hiển thị 25" },
        { id: 50, name: "Hiển thị 50" },
        { id: 100, name: "Hiển thị 100" }
      ],
      search: "",
      pageCurrent: 1,
      sizeDefault: 25
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    search(value) {
      if (value.length === 0) {
        const dataSender = {
          size: this.sizeDefault,
          page: this.pageCurrent
        };
        this.$store.dispatch("getAllMarketPosts", dataSender);
      }
    }
  },
  methods: {
    updateFilterShowSelected(val) {
      this.$emit("updateFilterShowSelected", val);
    },
    updateSearch() {
      const dataSender = {
        keyword: this.search,
        size: this.sizeDefault,
        page: this.pageCurrent
      };
      this.$store.dispatch("searchPostMarketByKey", dataSender);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
