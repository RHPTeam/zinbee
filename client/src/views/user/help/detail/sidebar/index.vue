<template>
  <ul>
    <li
      class="item"
      v-for="(category, index) in categories"
      :key="`c-${index}`"
    >
      <router-link
        :class="activeHelpCategory.parent === category._id ? 'active' : null"
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
            :class="activeHelpCategory.children === item._id ? 'active' : null"
            :to="{
              name: 'help_detail',
              params: { id: item._id },
              query: { type: 'hc_global_nav' }
            }"
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
  computed: {
    activeHelpCategory() {
      return this.$store.getters.activeHelpCategory;
    }
  },
  methods: {
    async showCategory(category, index) {
      if (
        (category._blogHelp.length === 0 && category.children === undefined) ||
        (category._blogHelp.length === 0 && category.children !== undefined)
      ) {
        if (this.selectedCategoryIndex === index) {
          this.selectedCategoryIndex = "";
        } else {
          this.selectedCategoryIndex = index;
        }
      }
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
    &.active {
      color: #1c1e21;
      font-weight: 600;
      text-decoration: none;
    }
    &:hover {
      color: #1c1e21;
      font-weight: 600;
      text-decoration: none;
    }
  }
  &.sub {
    .item a {
      padding-left: 2.5rem;
      &.active {
        color: #1c1e21;
        font-weight: 600;
        text-decoration: none;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
