import CookieFunction from "@/utils/functions/cookie";
export default {
  data() {
    return {
      statusCollapse: false,
      isShowProfileDropdown: false,
      isShowNotificationDropdown: false,
      isShowOptionsMoreDropdown: false
    };
  },
  computed: {
    userMember() {
      if (this.$store.getters.userInfo === undefined) {
        return;
      }
      return this.$store.getters.userInfoMember;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      this.statusCollapse = this.$store.getters.collapseMenu;
    },
    allAccountFb() {
      return this.$store.getters.accountsFB;
    },
    allMarketCategoriesTree() {
      return this.$store.getters.allMarketCategoriesTree;
    },
    currentParentMarketCategory() {
      return this.$store.getters.currentParentMarketCategory;
    }
  },
  async created() {
    await this.$store.dispatch("getUserInfoMember");
    await this.$store.dispatch("getAllMarketCategoriesTree");
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      window.location.href = `${process.env.VUE_APP_PARENT_URL}/#/redirect`;
    },
    chooseCategory(category) {
      this.$store.dispatch("currentParentMarketCategory", category);
    },
    toogleSidebar() {
      this.statusCollapse = !this.statusCollapse;
      this.$store.dispatch("changeMenu", this.statusCollapse);
    },
    showNotificationDropdown() {
      this.isShowProfileDropdown = false;
      this.isShowNotificationDropdown = !this.isShowNotificationDropdown;
    },
    showProfileDropdown() {
      this.isShowProfileDropdown = !this.isShowProfileDropdown;
      this.isShowNotificationDropdown = false;
    },
    closeProfileDropdown() {
      this.isShowProfileDropdown = false;
    },
    closeNotificationDropdown() {
      this.isShowNotificationDropdown = false;
    },
    closeDropdownUser() {
      this.showdropdown = false;
    },
    redirectToHelp() {
      const routeData = this.$router.resolve({ name: "help" });

      window.open(routeData.href, "_blank");
    },
    showOptionsMoreDropdown() {
      this.isShowOptionsMoreDropdown = true;
    },
    closeOptionsMoreDropdown() {
      this.isShowOptionsMoreDropdown = false;
    },
    gotoHomePost() {
      if (this.allAccountFb.length === 0) {
        const routeData = this.$router.resolve({ name: "post_fbaccount" });

        window.open(routeData.href, "_blank");
      } else {
        const routeData = this.$router.resolve("/post");

        window.open(routeData.href, "_blank");
      }
      this.isShowOptionsMoreDropdown = false;
    },
    gotoHomeChat() {
      if (this.allAccountFb.length === 0) {
        const routeData = this.$router.resolve({ name: "facebook" });

        window.open(routeData.href, "_blank");
      } else {
        const routeData = this.$router.resolve({ name: "scripts" });

        window.open(routeData.href, "_blank");
      }
      this.isShowOptionsMoreDropdown = false;
    },
    goToProfileSetting() {
      window.location.href = `${CookieFunction.getCookie("_sub").replace(
        "/welcome",
        ""
      )}/post/account`;
    }
  },
  filters: {
    getFirstLetter(string) {
      if (string === undefined) {
        return;
      }
      return string.charAt(0).toUpperCase();
    }
  }
};
