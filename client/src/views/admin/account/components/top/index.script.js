import ActivePopup from "../popups/active";

export default {
  props: ["isGrid"],
  data() {
    return {
      search: "",
      isActivePopup: false,
      isShowStatusFilter: false,
      statusOptions: ["Tất cả", "Hoạt động", "Đã ngừng"],
      statusFilter: "Tất cả"
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    users() {
      return this.$store.getters.allUser;
    },
    usersFilter() {
      return this.$store.getters.usersFilter;
    }
  },
  watch: {
    search(value) {
      if (value.length === 0) {
        this.$store.dispatch("getAllUserAdmin");
      }
    }
  },
  methods: {
    changeLayout() {
      this.$emit("changeLayout", !this.isGrid);
    },
    showStatusFilter() {
      this.isShowStatusFilter = !this.isShowStatusFilter;
    },
    filterByStatus(val) {
      this.statusFilter = val;
      if (this.statusFilter === "Tất cả") {
        this.$store.dispatch("getAllUserAdmin");
      } else if (this.statusFilter === "Hoạt động") {
        this.$store.dispatch("getUserWork");
      } else if (this.statusFilter === "Đã ngừng") {
        this.$store.dispatch("getUserDontWork");
      }
    },
    async searchUsers() {
      await this.$store.dispatch("setFilter", 1);
      this.$store.dispatch("searchUserByKey", this.search);
    }
  },
  components: {
    ActivePopup
  }
};
