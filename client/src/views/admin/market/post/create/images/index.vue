<template>
  <VuePerfectScrollbar
    class="gallery justify_content_start align_items_center flex_wrap m_n1"
    :data-theme="currentTheme"
  >
    <div
      class="gallery--block position_relative m_1"
      v-for="(photo, index) in photos"
      :key="index"
    >
      <div class="block--img">
        <img :src="photo" alt />
      </div>
      <div
        class="block--bg position_absolute d_flex align_items_center justify_content_center"
        @click="deleteImageAttachmentPost(index)"
      >
        <icon-base
          class="icon--remove"
          icon-name="remove"
          width="20px"
          heigh="20px"
          viewBox="0 0 16 16"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>
    <div class="gallery--block position_relative m_1">
      <label
        for="file-upload"
        class="gallery--block-add d_flex align_items_center justify_content_center"
      >
        <icon-base
          class="icon--add"
          icon-name="plus"
          width="30"
          height="30"
          viewBox="0 0 60 60"
        >
          <icon-plus />
        </icon-base>
      </label>
      <form enctype="multipart/form-data" @submit.prevent="sendFile">
        <input
          id="file-upload"
          hidden
          type="file"
          ref="file"
          @change="selectFile()"
          accept="image/x-png,image/gif,image/jpeg"
          multiple
        />
      </form>
    </div>
  </VuePerfectScrollbar>
</template>
<script>
export default {
  props: ["photos"],
  data() {
    return {
      file: "",
      imageDefault: require("@/assets/images/upload/bee-default.jpg")
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    deleteImageAttachmentPost(id) {
      const arr = this.photos.filter((photo, index) => {
        return index !== id;
      });
      this.$emit("removePhoto", arr);
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
      const dataEmit = this.$store.getters.marketPostPhotosUpload;
      this.$emit("updatePhotos", dataEmit);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
</style>
