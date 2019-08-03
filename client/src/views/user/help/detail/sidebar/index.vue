<template>
  <ul>
    <li
      class="item"
      v-for="(category, index) in categories"
      :key="`c-${index}`"
    >
      <router-link
        :to="{
          name: 'help_detail',
          params: { id: category._id },
          query: { type: 'hc_global_nav' }
        }"
        @click.native="showCategory(category, index)"
      >
        {{ category.title }}
      </router-link>
      <ul
        v-if="category.children && selectedCategoryIndex === index"
        class="sub"
      >
        <li class="item" v-for="(item, i) in category.children" :key="i">
          <router-link
            :to="{
              name: 'help_detail',
              params: { id: item._id },
              query: { type: 'hc_global_nav' }
            }"
            @click.native="showChildrenCategory(item)"
          >
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["categories", "activeCategory"],
  data() {
    return {
      selectedCategoryIndex: ""
    };
  },
  methods: {
    async showCategory(category, index) {
      await this.$store.dispatch("getCurrentHelpCategory", {
        id: category._id,
        type: "hc_global_nav"
      });
      if (category.children) {
        if (this.selectedCategoryIndex === index) {
          this.selectedCategoryIndex = "";
        } else {
          this.selectedCategoryIndex = index;
        }
        await this.$store.dispatch("setHelpDetailViewActive", 1);
      } else {
        await this.$store.dispatch("setHelpDetailViewActive", 2);
      }
    },
    async showChildrenCategory(category) {
      await this.$store.dispatch("getCurrentHelpCategory", {
        id: category._id,
        type: "hc_global_nav"
      });
      await this.$store.dispatch("setHelpDetailViewActive", 2);
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  .item {
    padding: 7px 0;
  }
  .item a {
    color: #444950;
    cursor: pointer;
    display: block;
    font-size: 0.875rem;
    margin-bottom: 0.375rem;
    transition: all 0.4s ease;
    &:hover {
      color: #1c1e21;
      font-weight: 600;
      text-decoration: none;
    }
  }
  &.sub {
    .item a {
      padding-left: 2.5rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
