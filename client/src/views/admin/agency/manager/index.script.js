import ItemAgency from "./components/item";
import DeleteAgency from "./components/popup/delete";
import InfoAgency from "./components/popup/info";
export default {
  components: {
    ItemAgency,
    DeleteAgency,
    InfoAgency
  },
  data() {
    return {
      isShowInfo: false,
      isShowDeleteAgency: false,
      agencyId: ""
    };
  },
  computed: {
    agencies() {
      return this.$store.getters.agencies;
    }
  },
  async created() {
    await this.$store.dispatch("getAllAgency");
  },
  methods: {
    async createAgency() {
      await this.$store.dispatch("setAgencyDefault");
      this.isShowInfo = true;
    },
    showCreatePopup(val) {
      this.isShowInfo = val;
    },
    showDeletePopup(val) {
      this.agencyId = val;
      this.isShowDeleteAgency = true;
    }
  }
};
