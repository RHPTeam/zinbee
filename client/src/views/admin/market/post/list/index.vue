<template>
  <div class="post--wrap">
    <!-- Start: Action -->
    <app-action
      :filterCategorySelected="filterCategorySelected"
      :filterShowSelected="filterShowSelected"
      @updateFilterCategorySelected="filterCategorySelected = $event"
      @updateFilterShowSelected="updateFilterShowSelected($event)"
      @updateSearch="search = $event"
    />
    <!-- End: Action -->
    <!-- Start: Data List -->
    <app-table
      :currentPage="currentPage"
      :filterCategorySelected="filterCategorySelected"
      :filterShowSelected="filterShowSelected"
      :search="search"
    />
    <!-- End: Data List -->
    <!-- Start: pagination post-->
    <div class="mt_3">
      <app-paginate
        :currentPage="currentPage"
        :filterShowSelected="filterShowSelected"
      />
    </div>
    <!-- End: pagination post-->
  </div>
</template>

<script>
import AppAction from "../layouts/actions/posts/index";
import AppPaginate from "./paginate/index";
import AppTable from "./table/index";

export default {
  components: {
    AppAction,
    AppPaginate,
    AppTable
  },
  data() {
    return {
      currentPage: 1,
      filterCategorySelected: { id: "all", name: "Tất cả" },
      filterShowSelected: { id: 25, name: "Hiển thị 25" },
      search: ""
    };
  },
  methods: {
    updateFilterShowSelected(selected) {
      this.filterShowSelected = selected;
      this.currentPage = 1;

      const dataSender = {
        size: this.filterShowSelected.id,
        page: this.currentPage
      };

      this.$store.dispatch("getPostsByPage", dataSender);
    }
  }
};
</script>

<style lang="scss" scoped></style>
