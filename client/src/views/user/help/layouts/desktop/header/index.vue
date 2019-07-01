<template>
  <div class="content--header-help">
    <div class="ct">
      <div class="r mx_0 mb_3">
        <!-- Start header logo help   -->
        <div class="c_md_3">
          <div class="logo d_flex align_items_center">
            <icon-base
              icon-name="logo"
              width="40px"
              height="40px"
              viewBox="0 0 200 200"
            >
              <icon-logo-icon-white />
            </icon-base>
            <div class="center--support ml_2" @click="goToHelpHome">
              Trung tâm trợ giúp
            </div>
          </div>
        </div>
        <!-- End header logo help   -->
        <!-- Start search help   -->
        <div class="c_md_6">
          <div class="wrap--search">
            <div class="search">
              <icon-base
                icon-name="search"
                width="26"
                height="24"
                viewBox="0 0 24 24"
              >
                <icon-input-search />
              </icon-base>
              <input
                type="text"
                placeholder="Chào ABC, chúng tôi có thể giúp gì cho bạn?"
                v-model="keyword"
                @keydown.enter="searchQuestion"
              />
            </div>
          </div>
        </div>
        <!-- End search help   -->
        <!-- Start back facebook   -->
        <div class="c_md_3 d_flex align_items_center">
          <div class="content--back">
            <div class="icon">
              <icon-base
                icon-name="back"
                width="25"
                height="22"
                viewBox="0 0 25 25"
              >
                <icon-logout />
              </icon-base>
            </div>
            <router-link to="/">
              <div class="text">
                Quay lại Zinbee
              </div>
            </router-link>
          </div>
        </div>
        <!-- End back facebook   -->
      </div>

      <!-- Start: Navigation help-->
      <div class="wrap--nav">
        <nav>
          <ul class="menu--help d_inline_flex">
            <!-- Start: Home -->
            <li class="menu--help-item flex_fill item--active">
              <a href="">Trang chủ</a>
            </li>
            <!-- End: Home -->
            <!-- Start: Menu Items Loop -->
            <li
              class="menu--help-item flex_fill"
              v-for="(category, index) in allHelpCategories.slice(0, 5)"
              :key="index"
            >
              {{ category.title }}
              <ul
                class="dropdown--menu"
                v-if="category.children && category.children.length > 0"
              >
                <li
                  class="dropdown--menu-item"
                  v-for="(categoryChild, cindex) in category.children"
                  :key="cindex"
                  @click="showInfoCategory(categoryChild, category._id)"
                >
                  <a>{{ categoryChild.title }}</a>
                </li>
              </ul>
            </li>
            <!-- End: Menu Items Loop -->
            <!-- Start: Mail -->
            <li class="menu--help-item flex_fill" @click="openEmail">
              <a :href="`https://mail.google.com`" target="_blank">
                <div class="mail--help d_flex">
                  <div class="icon--envelope mr_1">
                    <icon-base
                      icon-name="mail"
                      width="22"
                      height="20"
                      viewBox="0 0 22 22"
                    >
                      <icon-envelope />
                    </icon-base>
                  </div>
                  <div>Hộp thư hỗ trợ</div>
                </div>
              </a>
            </li>
            <!-- End: Mail -->
          </ul>
        </nav>
      </div>
      <!-- End: Navigation help-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hrefDefault: "mailto:khangle0608@gmail.com",
      keyword: "",
      sizeDefault: 25,
      pageDefault: 1
    };
  },
  computed: {
    allHelpCategories() {
      return this.$store.getters.allHelpCategoriesChild;
    },
    navigationCategories() {
      return this.allHelpCategories.filter(category => {
        return category.level === 0;
      });
    }
  },
  async created() {
    await this.$store.dispatch("getAllCategoriesChildren");
  },
  methods: {
    childrenOfCategory(id) {
      return this.allHelpCategories.filter(category => {
        return category.parent === id;
      });
    },
    goToHelpHome() {
      this.$router.push({ name: "help" });
    },
    async showInfoCategory(val, cateId) {
      await this.$store.dispatch("setHelpDefault", {
        right: 1,
        left: 1
      });
      await this.$store.dispatch("getHelpCategoryById", val._id);
      await this.$store.dispatch("getAllCategoriesChildren");
      await this.$store.dispatch("setHelpCategoryChildrenLevel", val);
      this.$router.replace({
        name: "help_detail",
        params: { id: val._id },
        query: { cateId: val._id, parenId: cateId }
      });
    },
    openEmail() {
      window.location.assign("mailto: kythuatchatbee@gmail.com");
    },
    async searchQuestion() {
      const dataSender = {
        keyword: this.keyword,
        size: this.sizeDefault,
        page: this.pageDefault
      };
      await this.$store.dispatch("searchBlog", dataSender);
      await this.$store.dispatch("setKeySearch", this.keyword);
      this.$router.push({ name: "help_result_search" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
