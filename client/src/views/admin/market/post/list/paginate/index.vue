<template>
  <div class="post--info d_flex justify_content_between align_items_center">
    <div class="post--info-show">Hiển thị {{ allPosts.length }} bản ghi</div>
    <paginate
      :pageCount="postsPageSize"
      :clickHandler="goToPage"
      :prev-text="prevText"
      :next-text="nextText"
      :container-class="'pagination'"
      :page-class="'page-item'"
      @input="updateCurrentPage($event)"
    ></paginate>
  </div>
</template>

<script>
export default {
  props: ["currentPage", "filterShowSelected"],
  data() {
    return {
      nextText: "&#x203A;",
      prevText: "&#8249;"
    };
  },
  computed: {
    allPosts() {
      return this.$store.getters.allMarketPosts;
    },
    postsPage() {
      return this.$store.getters.postsPage;
    },
    postsPageSize() {
      return this.$store.getters.pageCurrent;
    }
  },
  // async created() {
  //   const dataSender = {
  //     size: this.filterShowSelected.id,
  //     page: this.currentPage
  //   };
  //
  //   await this.$store.dispatch("getPostsByPage", dataSender);
  //   await this.$store.dispatch("getAllPost");
  // },
  methods: {
    goToPage(page) {
      const dataSender = {
        size: 25,
        page: page
      };

      this.$store.dispatch("getAllMarketPosts", dataSender);
    },
    updateCurrentPage(val) {
      this.$emit("updateCurrentPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.post--info {
  font-size: 0.875rem;
  &-show {
    color: #999;
    letter-spacing: -0.2px;
  }
}
</style>
<style lang="scss">
.pagination {
  margin-bottom: 0;
  li {
    border-radius: 14px;
    height: 30px;
    font-size: 1.5rem;
    margin: 0 0.25rem;
    line-height: 24px;
    a {
      color: #666;
      outline: none;
      text-decoration: none;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    &.page-item {
      font-size: 0.875rem;
      line-height: 30px;
      text-align: center;
      transition: all 0.4s ease;
      width: 30px;

      &.disabled {
        opacity: 1;
      }
      &:hover,
      &.active {
        background-color: #ffb94a;
        a {
          color: #fff;
        }
      }
    }
    &:first-child {
      text-align: left;
      width: 20px;
    }
    &:last-child {
      margin-right: 0;
      text-align: right;
      width: 20px;
    }
  }
}
</style>
