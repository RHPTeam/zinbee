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
          placeholder="Tìm kiếm"
          v-model="search"
          @input="updateSearch()"
        />
      </div>
    </div>
    <div class="d_flex action--right c_lg_8 pr_0">
      <app-filter
        class="mr_2"
        :filterList="filterShowList"
        :filterSelected="filterShowSelected"
        @updateFilterSelected="updateFilterShowSelected($event)"
      />
      <app-filter
        :filterList="filterCategoriesList"
        :filterSelected="filterCategorySelected"
        @updateFilterSelected="updateFilterCategorySelected($event)"
      />
    </div>
  </div>
</template>

<script>
import AppFilter from "../../filter/index";

export default {
  components: {
    AppFilter
  },
  props: ["filterCategorySelected", "filterShowSelected"],
  data() {
    return {
      filterShowList: [
        { id: 25, name: "Hiển thị 25" },
        { id: 50, name: "Hiển thị 50" },
        { id: 100, name: "Hiển thị 100" }
      ],
      filterCategoriesList: [{ id: "all", name: "Tất cả" }],
      search: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allCategories() {
      return this.$store.getters.allCategories;
    }
  },
  async created() {
    await this.$store.dispatch("getAllCategories");
    await this.allCategories.forEach(item => {
      const data = {
        id: item._id,
        name: item.title
      };

      this.filterCategoriesList.push(data);
    });
  },
  methods: {
    updateFilterShowSelected(val) {
      this.$emit("updateFilterShowSelected", val);
    },
    updateFilterCategorySelected(val) {
      this.$emit("updateFilterCategorySelected", val);
    },
    updateSearch() {
      this.$emit("updateSearch", this.search);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
