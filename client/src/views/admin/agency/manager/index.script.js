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
      isShowDeleteAgency: false
    };
  }
};
