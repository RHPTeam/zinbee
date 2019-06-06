<template>
  <div
    class="post--action d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="action--left">
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
    <div class="action--right">
      <app-filter
        :filterList="filterShowList"
        :filterSelected="filterShowSelected"
        @updateFilterSelected="updateFilterShowSelected($event)"
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
  props: ["filterShowSelected"],
  data() {
    return {
      filterShowList: [
        { id: 25, name: "Hiển thị 25" },
        { id: 50, name: "Hiển thị 50" },
        { id: 100, name: "Hiển thị 100" }
      ],
      search: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories() {
      return this.$store.getters.categories;
    }
  },
  methods: {
    updateFilterShowSelected(val) {
      this.$emit("updateFilterShowSelected", val);
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
