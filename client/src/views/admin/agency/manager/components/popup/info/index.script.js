export default {
  data() {
    return {
      listOfUser: []
    };
  },
  computed: {
    agency() {
      return this.$store.getters.agency;
    },
    users() {
      return this.$store.getters.allUser;
    },
    packages() {
      return this.$store.getters.packages;
    }
  },
  async created() {
    await this.$store.dispatch("getAllUserAdmin");
    await this.$store.dispatch("getAllPackage");
  },
  methods: {
    createNewAgency() {
      this.agency.customer.listOfUser = this.listOfUser;
      // console.log(this.agency);
      this.$store.dispatch("createNewAgency", this.agency);
    },
    close() {
      this.$emit("close", false);
    },
    changeDateStartAgency(value) {
      this.agency.expire.start = new Date(
        new Date(value).getFullYear(),
        new Date(value).getMonth(),
        new Date(value).getDate(),
        new Date(value).getHours(),
        new Date(value).getMinutes(),
        0
      );
    },
    changeDateEndAgency(value) {
      this.agency.expire.end = new Date(
        new Date(value).getFullYear(),
        new Date(value).getMonth(),
        new Date(value).getDate(),
        new Date(value).getHours(),
        new Date(value).getMinutes(),
        0
      );
    },
    updateStatus(val) {
      this.agency.status = val.target.checked;
    },
    selectAgency(val) {
      this.agency._account = val;
    },
    selectListOfUser(val) {
      const listUser = val.map(item => item._id);
      this.listOfUser = listUser;
    },
    selectPackage(val) {
      this.agency._package = val;
    }
  }
};
