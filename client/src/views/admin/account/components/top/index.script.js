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
      this.searchUsers();
    },
    async searchUsers() {
      let arr;

      if (this.statusFilter === "Tất cả") {
        arr = this.users.filter(user => {
          return user.email
            .toString()
            .toLowerCase()
            .includes(this.search.toString().toLowerCase());
        });
      } else if (this.statusFilter === "Hoạt động") {
        arr = this.users.filter(user => {
          return (
            user.email
              .toString()
              .toLowerCase()
              .includes(this.search.toString().toLowerCase()) &&
            user.status === true
          );
        });
      } else if (this.statusFilter === "Đã ngừng") {
        arr = this.users.filter(user => {
          return (
            user.email
              .toString()
              .toLowerCase()
              .includes(this.search.toString().toLowerCase()) &&
            user.status === false
          );
        });
      }

      await this.$store.dispatch("getUsersFilter", arr);
      this.$store.dispatch("setFilter", 1);
    }
  },
  components: {
    ActivePopup
  }
};
