<template>
  <div class="blog--help-admin" :data-theme="currentTheme">
    <router-link
      class="mb_2 create--new btn btn_warning"
      tag="button"
      :to="{ name: 'create_blog' }"
      active-class="active"
      exact
      >Create new Blog</router-link
    >
    <div class="card card_body list--blog">
      <div class="mb_2">List Blog</div>
      <div class="list">
        <div class="card_group ml_2">
          <table class="table--list">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th></th>
            </tr>
            <tr v-for="(blog, index) in allBlogAdmin" :key="index">
              <td>{{ blog.title }}</td>
              <td>{{ blog._helpCategory.title }}</td>
              <td class="text_center">
                <button
                  class="btn btn_warning my_2 mr_2"
                  @click="updateBlogHelpAdmin(blog._id)"
                >
                  Update
                </button>
                <button
                  class="btn btn_danger my_2"
                  @click="deleteBlogHelp(blog._id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </table>
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
    allBlogAdmin() {
      return this.$store.getters.getAllBlog;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  created() {
    this.$store.dispatch("getAllBlogAdmin");
  },
  methods: {
    updateBlogHelpAdmin(id) {
      this.$store.dispatch("getIdBlogHelpAdmin", id);
      this.$router.push({
        name: "update_blog",
        params: { id: id }
      });
    },
    deleteBlogHelp(id) {
      this.$store.dispatch("deleteBlogById", id);
    }
  }
};
</script>

<style scoped lang="scss">
.create--new {
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
}
.table--list {
  width: 100%;
  th,
  td,
  tr {
    width: 25%;
    border: 1px solid #ccc;
    padding-left: 10px;
  }
  th {
    text-align: center;
    padding-left: 0;
  }
}
.blog--help-admin[data-theme="dark"] {
  .list--blog {
    background: #27292d;
  }
}
</style>
