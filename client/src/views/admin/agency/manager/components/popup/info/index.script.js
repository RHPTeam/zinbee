export default {
  prop: ["isShowInfo"],
  data() {
    return {
      listOfUser: [],
      timeDefault: new Date()
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
    async createNewAgency() {
      await this.$store.dispatch("createNewAgency", this.agency);
      await this.$store.dispatch("setAgencyDefault");
      this.close();
    },
    async updateAgency() {
      await this.$store.dispatch("updateAgency", this.agency);
      await this.$store.dispatch("setAgencyDefault");
      this.close();
    },
    close() {
      this.$emit("closePopup", false);
    },
    changeDateStartAgency(value) {
      this.agency.expire.start = new Date(value);
    },
    changeDateEndAgency(value) {
      this.agency.expire.end = new Date(value);
    },
    updateStatus(val) {
      this.agency.status = val.target.checked;
    },
    selectAgency(val) {
      this.agency._account.name = val.name;
      this.agency._account._id = val._id;
    },
    selectPackage(val) {
      this.agency._package.name = val.title;
      this.agency._package._id = val._id;
    }
  }
};
