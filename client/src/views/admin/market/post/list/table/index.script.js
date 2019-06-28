import ConvertUnicode from "@/utils/functions/string";
import DeletePopup from "../../popups/delete";
import ItemPost from "./item/index";
import ProductMarket from "../../popups/market";

export default {
  components: {
    DeletePopup,
    ItemPost,
    ProductMarket
  },
  props: ["currentPage", "filterShowSelected", "search"],
  data() {
    return {
      isShowDeletePopup: false,
      isShowCreateProductPopup: false,
      isSort: [
        {
          name: "title",
          asc: false,
          desc: false
        }
      ],
      postSelected: {}
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allMarketPosts() {
      return this.$store.getters.allMarketPosts;
    }
  },
  async created() {
    const res = this.$store.getters.allMarketPosts;
    if (res.length === 0) {
      const dataSender = {
        size: 25,
        page: 1
      };
      await this.$store.dispatch("getAllMarketPosts", dataSender);
    }
    // this.$router.replace( {
    //   name: "market_post",
    //   query: {
    //     size: 25,
    //     page: 1
    //   }
    // } );
  },
  methods: {
    activeCurrentSort(i, type) {
      this.isSort.forEach((item, index) => {
        if (index === i) {
          if (type === "asc") {
            item.asc = true;
            item.desc = false;
          } else {
            item.asc = false;
            item.desc = true;
          }
        } else {
          item.asc = false;
          item.desc = false;
        }
      });
    },
    showDeletePopup(post) {
      this.postSelected = post;
      this.isShowDeletePopup = true;
    },
    showCreatePopup(value) {
      this.postSelected = value;
      this.isShowCreateProductPopup = true;
    },
    sortPostsByProperty(sortSelected, index) {
      const attr = sortSelected.name;

      // Sort Ascending
      if (sortSelected.asc === false) {
        this.allPost.sort((a, b) => {
          let valA = ConvertUnicode.convertUnicode(
              String(a[attr]).toUpperCase()
            ),
            valB = ConvertUnicode.convertUnicode(String(b[attr]).toUpperCase());

          if (valA < valB) {
            return -1;
          }
          if (valA > valB) {
            return 1;
          }
          return 0;
        });
        this.activeCurrentSort(index, "asc");
      } else if (sortSelected.desc === false) {
        // Sort Descending
        this.allPost.sort((a, b) => {
          let valA = ConvertUnicode.convertUnicode(
              String(a[attr]).toUpperCase()
            ),
            valB = ConvertUnicode.convertUnicode(String(b[attr]).toUpperCase());

          if (valA > valB) {
            return -1;
          }
          if (valA < valB) {
            return 1;
          }
          return 0;
        });
        this.activeCurrentSort(index, "desc");
      }
    }
  }
};
