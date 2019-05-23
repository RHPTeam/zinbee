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
      return this.$store.getters.users;
    },
    usersFilter() {
      return this.$store.getters.usersFilter;
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
    searchUsers() {
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

      this.$store.dispatch("getUsersFilter", arr);
    }
  },
  components: {
    ActivePopup
  }
};
