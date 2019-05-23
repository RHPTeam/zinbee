<template>
  <div class="popular--blog">
    <div class="card card_body">
      <label for>Blog Help</label>
      <multiselect
        label="title"
        placeholder="Lựa chọn Blog"
        :options="allBlog"
        multiple
        @input="chooseBlogHelp"
        v-model="help.popular_blog"
      />
      <label for class="err--popular" v-if="isShowErrorBlog === true"
        >Can't choose over 5 blog</label
      >
      <label for class="mt_2">Categories Help</label>
      <multiselect
        label="title"
        placeholder="Lựa chọn Categories"
        :options="allCategories"
        multiple
        @input="categoryPopular"
        v-model="help.popular_section"
      />
      <label for class="err--popular" v-if="isShowErrorCategory === true"
        >Can't choose over 4 category</label
      >
      <button class="btn btn_info mt_2" @click="updateQuestions">Update</button>
    </div>
    <div class="card card_body mt_3">
      <label for>List Popular Help</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: "",
      isShowErrorBlog: false,
      isShowErrorCategory: false
    };
  },
  computed: {
    allBlog() {
      return this.$store.getters.getAllBlog;
    },
    allCategories() {
      return this.$store.getters.getCateAdmin;
    },
    help() {
      return this.$store.getters.help;
    }
  },
  methods: {
    async updateQuestions() {
      await this.$store.dispatch("updatePopularHelp", this.help);
    },
    //
    categoryPopular(value) {
      if (value.length > 4) {
        this.isShowErrorCategory = true;
      } else {
        this.isShowErrorCategory = false;
      }
      this.$store.dispatch("setHelp", {
        key: "popular_section",
        value: value
      });
    },
    //
    chooseBlogHelp(value) {
      if (value.length > 5) {
        this.isShowErrorBlog = true;
      } else {
        this.isShowErrorBlog = false;
      }

      this.$store.dispatch("setHelp", {
        key: "popular_blog",
        value: value
      });
    }
  },
  async created() {
    await this.$store.dispatch("getAllBlogAdmin");
    await this.$store.dispatch("getAllCategoriesAdmin");
    this.$store.dispatch("getHelp");
  }
};
</script>

<style lang="scss" scoped>
.err--popular {
  font-size: 14px;
  color: #d42828;
}
</style>
