<template>
  <div class="section p_3" :data-theme="currentTheme">
    <div class="section--body ct_0">
      <!-- Start: Name -->
      <div class="item mb_4">
        <span>Tên bài viết</span>
        <input
          type="text"
          class="item--input mt_2"
          placeholder="Nhập tên bài viết"
          v-model="postMarket.title"
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

      <!-- Start: Content -->
      <div class="item mb_4">
        <span>Nội dung</span>
        <div class="wrap mt_2">
          <contenteditable
            tag="div"
            class="contenteditable"
            contenteditable
            v-model="postMarket.content"
            placeholder="Cập nhật nội dung bài viết"
          />
        </div>
      </div>
      <!-- End: Content -->
      <!-- Start: Image -->
      <div class="item mb_4">
        <span>Hình ảnh</span>
        <image-gallery
          :photos="postMarket.photos"
          @updatePhotos="updatePhotos($event)"
          @removePhoto="postMarket.photos = $event"
        ></image-gallery>
      </div>
      <!-- End: Image -->
      <div class="d_flex align_items_center">
        <button
          v-if="this.$store.getters.variableControl === 0"
          class="btn btn_info mr_3"
          @click="createPost"
        >
          Lưu
        </button>
        <div
          v-if="this.$store.getters.variableControl === 2"
          class="d_flex align_items_center"
        >
          <button class="btn btn_info mr_3">Cập nhật</button>
          <button class="btn btn_info">Lưu vào market</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageGallery from "./images";

export default {
  components: {
    ImageGallery
  },
  data() {
    return {
      file: ""
    };
  },
  computed: {
    categories() {
      // let arrCategoriesChildren = [];
      // const categories = this.$store.getters.allCategory;
      // categories.map(item => {
      //   if (item.level === 1) {
      //     arrCategoriesChildren.push(item);
      //   }
      // });
      // return arrCategoriesChildren;
      return this.$store.getters.allCategory;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    postMarket() {
      return this.$store.getters.postMarket;
    },
    product() {
      return this.$store.getters.product;
    }
  },
  async created() {
    const status = this.$store.getters.marketControlStatus;
    if (status === 0) {
      await this.$store.dispatch("setPostDefaultMarket");
      await this.$store.dispatch("getProductDefault");
    }
    await this.$store.dispatch("getcategories");
  },
  methods: {
    async createPost() {
      //create post simple
      await this.$store.dispatch("createMarketPost", this.postMarket);
      //create post product market
      const postId = this.$store.getters.marketPost;
      if (postId) {
        this.product.content = postId;
      }
      this.product.name = this.postMarket.title;
      this.product.typeProduct = 0;
      this.product.description = this.postMarket.content.slice(0, 50);
      this.product.summary = this.postMarket.content.slice(0, 460);

      await this.$store.dispatch("createProduct", this.product);
      // reset post
      await this.$store.dispatch("setPostDefaultMarket");
      await this.$store.dispatch("getProductDefault");
      // redirect to post list
      this.$router.push({ name: "market_post" });
    },
    updatePhotos(photos) {
      photos.forEach(item => {
        this.postMarket.photos.push(item);
      });
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
