import ConvertUnicode from "@/utils/functions/string.js";
import DeletePopup from "@/components/popups/delete";
import ItemPost from "./item/index";

export default {
  components: {
    DeletePopup,
    ItemPost
  },
  props: [
    "currentPage",
    "filterCategorySelected",
    "filterShowSelected",
    "search"
  ],
  data() {
    return {
      isShowDeletePopup: false,
      isShowPostNowPopup: false,
      isSort: [
        {
          name: "title",
          asc: false,
          desc: false
        }
      ],
      postSelected: {},
      targetDataDelete: {}
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allPost() {
      return this.$store.getters.postsPage;
    },
    filterAllPost() {
      if (this.filterCategorySelected.id === "all") {
        return this.allPost.filter(post => {
          return post.title
            .toString()
            .toLowerCase()
            .includes(this.search.toString().toLowerCase());
        });
      }
      return this.allPost.filter(post => {
        const checkedArr = post._categories.filter(category => {
          return category._id === this.filterCategorySelected.id;
        });

        return (
          post.title
            .toString()
            .toLowerCase()
            .includes(this.search.toString().toLowerCase()) &&
          checkedArr.length !== 0
        );
      });
    }
  },
  async created() {
    const dataSender = {
      size: this.filterShowSelected.id,
      page: this.currentPage
    };

    await this.$store.dispatch("getPostsByPage", dataSender);
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
      this.targetDataDelete = {
        id: post._id,
        page: this.currentPage,
        size: this.filterShowSelected.id
      };
      this.isShowDeletePopup = true;
    },
    showPostNowPopup(post) {
      this.postSelected = post;
      this.isShowPostNowPopup = true;
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
