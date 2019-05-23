<template>
  <div class="main--admin-help text_left px_4 py_4" :data-theme="currentTheme">
    <div>
      <div class="main--title mb_4 font_weight_bold">Help</div>
      <div class="main--content p_4">
        <div class="d_inline_flex mb_2">
          <router-link
            class="mr_3 popular p_2 mr_2"
            tag="button"
            :to="{ name: 'popular_create' }"
            active-class="active"
            exact
            >Popular Blog</router-link
          >
          <router-link
            class="mr_3 catagory p_2 mr_2"
            tag="button"
            :to="{ name: 'catagory' }"
            active-class="active"
            exact
          >
            Danh mục
          </router-link>
          <router-link
            class="mr_3 post p_2 mr_2"
            tag="button"
            :to="{ name: 'help_blogs' }"
            active-class="active"
            exact
          >
            Bài viết
          </router-link>
        </div>
        <div>
          <router-view :key="$route.path" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  created() {
    this.$store.dispatch("getAllCategoriesAdmin");
  }
};
</script>

<style scoped lang="scss">
.catagory,
.post,
.popular {
  border: 1px solid #00c853;
  background: none;
  color: #666;
  font-weight: bold;
  cursor: pointer;
  &:hover,
  &.active {
    background: #00c853;
    color: #fff;
  }
}
</style>
