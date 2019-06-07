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
          v-model="marketPost.title"
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
            v-model="marketPost.content"
            placeholder="Cập nhật nội dung bài viết"
          />
        </div>
      </div>
      <!-- End: Content -->
      <!-- Start: Image -->
      <div class="item mb_4">
        <span>Hình ảnh</span>
        <image-gallery
          :photos="marketPost.photos"
          @updatePhotos="updatePhotos($event)"
          @removePhoto="marketPost.photos = $event"
        ></image-gallery>
      </div>
      <!-- End: Image -->
      <div class="item" @click="updatePost">
        <button class="btn btn_info">Cập nhật</button>
      </div>
    </div>
  </div>
</template>

<script>
import ImageGallery from "../create/images";

export default {
  components: {
    ImageGallery
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    marketPost() {
      return this.$store.getters.marketPost;
    }
  },
  async created() {
    const marketPostId = this.$route.params.marketPostId;
    await this.$store.dispatch("getMarketPostById", marketPostId);
  },
  methods: {
    async updatePost() {
      await this.$store.dispatch("updateMarketPost", this.marketPost);
      // redirect to post list
      this.$router.push({ name: "market_post" });
    },
    updatePhotos(photos) {
      photos.forEach(item => {
        this.marketPost.photos.push(item);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
