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
          v-model="post.title"
        />
      </div>
      <!-- End: Name -->
      <!-- Start: Content -->
      <div class="item mb_4">
        <span>Nội dung</span>
        <div class="wrap mt_2">
          <contenteditable
            tag="div"
            class="contenteditable"
            contenteditable
            v-model="post.content"
            placeholder="Cập nhật nội dung bài viết"
          />
        </div>
      </div>
      <!-- End: Content -->
      <!-- Start: Image -->
      <div class="item mb_4">
        <span>Hình ảnh</span>
        <image-gallery
          :photos="post.photos"
          @updatePhotos="updatePhotos($event)"
          @removePhoto="post.photos = $event"
        ></image-gallery>
      </div>
      <!-- End: Image -->
      <div class="item" @click="createPost">
        <button class="btn btn_info">Lưu</button>
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
      post: {
        title: "",
        content: "",
        photos: []
      }
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async createPost() {
      await this.$store.dispatch("createMarketPost", this.post);
      // reset post
      this.post.title = "";
      this.post.content = "";
      this.post.photos = [];
      // redirect to post list
      this.$router.push({ name: "market_post" });
    },
    updatePhotos(photos) {
      photos.forEach(item => {
        this.post.photos.push(item);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
