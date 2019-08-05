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
        @click.native="showCategory(category)"
      >
        {{ category.title }}
      </router-link>
      <ul
        v-if="category.children && selectedCategoryId === category._id"
        class="sub"
      >
        <div class="line line--top"></div>
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
        <div class="line line--bottom"></div>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["categories", "activeCategory", "selectedCategoryId"],
  computed: {
    activeHelpCategory() {
      return this.$store.getters.activeHelpCategory;
    }
  },
  methods: {
    async showCategory(category) {
      if (
        (category._blogHelp.length === 0 && category.children === undefined) ||
        (category._blogHelp.length === 0 && category.children !== undefined)
      ) {
        if (this.selectedCategoryId === category._id) {
          this.$emit("updateSelectedCategoryId", "");
        } else {
          this.$emit("updateSelectedCategoryId", category._id);
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
    padding: 0.25rem 0;
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
    .line {
      border-top: 1px solid #e4e4e4;
      height: 12px;
      width: 120px;
      &--top {
        margin-top: 16px;
      }
      &--bottom {
        margin-top: 8px;
      }
    }
    .item a {
      padding-left: 1rem;
      transition: all 0.4s ease;
      &.active {
        color: #444;
        font-weight: 600;
        text-decoration: none;
        &:before {
          background-color: #999;
        }
      }
      &:before {
        background-color: #e4e4e4;
        content: "";
        height: 11px;
        left: 0;
        margin-top: 4px;
        position: absolute;
        transition: all 0.4s ease;
        width: 2px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
