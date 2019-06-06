<template>
  <div class="">
    <VuePerfectScrollbar
      class="gallery justify_content_start align_items_center flex_wrap m_n1"
      :data-theme="currentTheme"
    >
      <div
        class="gallery--block position_relative m_1"
        v-for="(item, index) in attachments"
        :key="index"
      >
        <div class="block--img">
          <img :src="item.link" alt />
        </div>
        <div
          class="block--bg position_absolute d_flex align_items_center justify_content_center"
          @click="deleteImageAttachmentPost(item._id)"
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
  </div>
</template>
<script>
export default {
  props: ["attachments"],
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
    deleteImageAttachmentPost(val) {
      const dataSender = {
        postId: this.$route.params.id,
        attachmentId: val
      };
      this.$store.dispatch("deleteAttachmentPost", dataSender);
    },
    selectFile() {
      this.file = this.$refs.file.files;
      this.sendFile();

      // reset ref
      const input = this.$refs.file;
      input.type = "text";
      input.type = "file";
    },
    sendFile() {
      const formData = new FormData();
      Array.from(this.file).forEach(f => {
        formData.append("attachments", f);
      });
      this.$emit("updateAttachments", formData);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
</style>
