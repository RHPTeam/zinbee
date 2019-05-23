<template>
  <div class="content">
    <div v-if="!postLibraries"></div>
    <div v-else class="content--body">
      <div>
        <div class="form_group">
          <label>Nội dung</label>
          <!--          <div v-if="postLibraries.content === undefined">-->
          <!--            <div class="py_3 px_2" v-if="showOptionUpdateContent === false" @click="showOptionUpdateContent = true">Bài viết chưa có nội dung</div>-->
          <!--            <div v-if="showOptionUpdateContent === true">-->
          <!--              <contenteditable-->
          <!--                tag="div"-->
          <!--                class="description px_3 py_2"-->
          <!--                :contenteditable="true"-->
          <!--                :noHTML="false"-->
          <!--                v-model="content"-->
          <!--                placeholder="Cập nhật nội dung bài viết"-->
          <!--              />-->
          <!--            </div>-->
          <!--          </div>-->
          <div>
            <contenteditable
              tag="div"
              class="description px_3 py_2"
              :contenteditable="true"
              :noHTML="false"
              v-model="postLibraries.content"
              placeholder="Cập nhật nội dung bài viết"
            />
          </div>
        </div>
        <div
          v-if="
            postLibraries.attachments && postLibraries.attachments.length > 0
          "
          class="gallery-wrap"
        >
          <vue-perfect-scrollbar class="gallery d_flex align_items_center">
            <div
              v-for="(item, index) in postLibraries.attachments"
              :key="`i-${index}`"
            >
              <div class="item position_relative">
                <img :src="item.link" />
                <div
                  class="icon--delete d_flex align_items_center justify_content_center position_absolute"
                  @click="deleteItemAttachments(item._id)"
                >
                  <icon-base
                    class="ic--remove"
                    icon-name="remove"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                  >
                    <icon-remove />
                  </icon-base>
                </div>
              </div>
            </div>
          </vue-perfect-scrollbar>
        </div>
        <div v-else></div>
        <form
          class="form_group"
          role="create-post"
          enctype="multipart/form-data"
          @submit.prevent="sendFile"
        >
          <label>Hình ảnh</label>
          <div class="action">
            <input
              type="file"
              ref="file"
              @change="selectFile(postLibraries._id)"
              accept="image/x-png,image/gif,image/jpeg"
              multiple
            />
          </div>
        </form>
        <div class="form_group">
          <button class="btn btn_success" @click="updatePostLibraries">
            Lưu bài viết
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowAlert: false,
      showOptionUpdateContent: false,
      files: "",
      content: ""
    };
  },
  computed: {
    postLibraries() {
      if (
        Object.entries(this.$store.getters.postLibraries).length === 0 &&
        this.$store.getters.postLibraries.constructor === Object
      )
        return;
      return this.$store.getters.postLibraries;
    }
  },
  watch: {
    "postLibraries.content"() {
      const dataSender = {
        postId: this.$route.params.id,
        content: this.postLibraries
      };
      this.$store.dispatch("updatePostLibraries", dataSender);
    }
  },
  methods: {
    deleteItemAttachments(val) {
      const objSender = {
        postId: this.$route.params.id,
        attachmentId: val
      };
      this.$store.dispatch("deleteItemAttachmentLibraries", objSender);
    },
    updatePostLibraries() {
      const dataSender = {
        postId: this.$route.params.id,
        content: this.postLibraries
      };
      this.$store.dispatch("updatePostLibraries", dataSender);
      // this.content = "";
      // this.files = "";
      this.$router.push("/admin/post-libraries");
    },
    // Select file images
    selectFile(id) {
      this.file = this.$refs.file.files;
      this.sendFile(id);
    },
    // Update file images to post
    sendFile() {
      const formData = new FormData();
      Array.from(this.file).forEach(f => {
        formData.append("attachments", f);
      });
      const objSender = {
        id: this.$route.params.id,
        formData: formData
      };
      this.$store.dispatch("updateAttachmentPostLibraries", objSender);
    }
  }
};
</script>

<style lang="scss" scoped>
.content--body {
  div[contenteditable="true"]:empty::before {
    content: attr(placeholder);
  }
  .description {
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    min-height: 100px;
    &:hover,
    &:active,
    &:focus,
    &:visited {
      box-shadow: none;
      outline: 0;
    }
  }
}
.gallery {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  .item {
    cursor: pointer;
    margin: 0 0.25rem;
    height: 100px;
    width: 100px;
    &:hover,
    &:focus,
    &:active,
    &:visited {
      > .icon--delete {
        opacity: 1;
        transition: opacity 0.5s;
      }
    }
    img {
      border-radius: 10px;
      height: 100%;
      width: 100%;
    }
    .icon--delete {
      border-radius: 50%;
      background-color: #fafafa;
      opacity: 0;
      width: 25px;
      height: 25px;
      top: 0;
      right: 0;
      z-index: 99;
      svg {
        margin-bottom: 2px;
      }
    }
  }
}
</style>
