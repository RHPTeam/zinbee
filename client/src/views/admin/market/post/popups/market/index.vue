<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title">Thêm bài viết vào market</div>
        </div>
        <div class="modal--body my_3">
          <div class="section--body">
            <!-- Start: Name -->
            <div class="item mb_4">
              <span>Tên bài viết</span>
              <input
                type="text"
                class="item--input mt_2"
                placeholder="Nhập tên bài viết"
                v-model="product.name"
              />
            </div>
            <!-- End: Name -->

            <!-- Start: Categrories and Price -->
            <div class="enhance d_flex align_items_center">
              <div class="item mb_4 pr_2">
                <span>Danh mục bài viết</span>
                <div class="cate mt_2">
                  <multiselect
                    label="name"
                    placeholder="Chọn danh mục đăng bài..."
                    :options="categories"
                    :value="convertCategoryPost(product._category)"
                    @input="updateProductCategory"
                  />
                </div>
              </div>
              <div class="item mb_4 pl_2">
                <span>Đơn giá</span>
                <input
                  type="number"
                  class="item--input mt_2"
                  placeholder="Nhập đơn giá bài viết"
                  v-model="product.priceCents"
                />
              </div>
            </div>
            <!-- End:  Categrories and Price -->

            <!-- Start: Attribute and Property -->
            <div class="item mb_4">
              <span>Đặc điểm</span>
              <div
                class="enhance d_flex align_items_center position_relative pr_4"
                v-for="(att, index) in product.attributes"
                :key="index"
              >
                <div class="item pr_3">
                  <input
                    type="text"
                    class="item--input mt_2"
                    placeholder="Nhập tên"
                    v-model="att.name"
                  />
                </div>
                <div class="item">
                  <input
                    type="text"
                    class="item--input mt_2"
                    placeholder="Nhập giá trị"
                    v-model="att.value"
                  />
                </div>
                <div
                  class="icon--remove position_absolute"
                  @click="deleteAttribute(index)"
                >
                  <icon-base
                    icon-name="remove"
                    class="icon--remove"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                  >
                    <icon-remove />
                  </icon-base>
                </div>
              </div>

              <div
                class="add--attribute d_inline_flex mt_3 align_items_center p_2"
                @click="addAtttibute"
              >
                <icon-base
                  icon-name="icon-plus"
                  class="icon-plus mr_2"
                  width="25"
                  height="25"
                  viewBox="0 0 60 70"
                >
                  <icon-plus />
                </icon-base>
                Thêm đặc điểm
              </div>
            </div>
            <!-- End: Attribute and Property -->

            <!-- Start: tag -->
            <div class="item mb_4">
              <span>Thẻ</span>
              <div class="mt_2">
                <taggle
                  class="taggle form_control"
                  placeholder="Nhập từ khóa và enter để kết thúc"
                  v-model="product.tags"
                />
              </div>
            </div>
            <!-- End: tag -->

            <!-- Start: image -->
            <div class="form_group">
              <label for class>Ảnh đại diện</label>
              <div class="img--preview mb_2" v-if="product.previews">
                <img :src="product.previews.thumbnail" alt="" height="120px" />
              </div>
              <div class>
                <input
                  type="file"
                  ref="file"
                  @change="selectFile()"
                  accept="image/x-png,image/gif,image/jpeg"
                  class="form_control p_1"
                />
              </div>
              <div class="contain--images"></div>
            </div>
            <!-- End: image -->
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--submit" @click="closePopup()">
            HỦY
          </button>
          <button class="btn--skip" @click="createProduct()">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      deleteConfirm: false,
      deleteText: ""
    };
  },
  computed: {
    categories() {
      return this.$store.getters.allCategory;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    product() {
      return this.$store.getters.product;
    }
  },
  async created() {
    const status = this.$store.getters.marketControlStatus;
    if (status === 0) {
      await this.$store.dispatch("getProductDefault");
    }
    await this.$store.dispatch("getcategories");
  },
  methods: {
    closePopup() {
      this.$emit("close", false);
    },
    async createProduct() {
      this.product.content = this.post._id;
      this.product.typeProduct = 0;
      this.product.description = this.post.content.slice(0, 50);
      this.product.summary = this.post.content.slice(0, 260);

      await this.$store.dispatch("createProduct", this.product);
      // reset post
      await this.$store.dispatch("getProductDefault");

      this.closePopup();
    },
    selectFile() {
      this.file = this.$refs.file.files;
      this.sendFile();

      // reset ref
      const input = this.$refs.file;
      input.type = "text";
      input.type = "file";
    },
    async sendFile() {
      const formData = new FormData();
      Array.from(this.file).forEach(file => {
        formData.append("photos", file);
      });

      await this.$store.dispatch("uploadMarketPostPhotos", formData);
      const dataEmit = await this.$store.getters.marketPostPhotosUpload;
      this.product.previews.thumbnail = dataEmit[0];
    },
    convertCategoryPost(category) {
      let dataCategory = {
        _id: "",
        name: ""
      };
      this.categories.map(item => {
        if (item._id === category) {
          dataCategory._id = item._id;
          dataCategory.name = item.name;
        }
      });
      return dataCategory;
    },
    updateProductCategory(value) {
      this.product._category = value._id;
    },
    addAtttibute() {
      this.$store.dispatch("createAttribute");
    },
    deleteAttribute(index) {
      this.$store.dispatch("deleteAttribute", index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
