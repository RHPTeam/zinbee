<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
    <!--<div class="col col--checkbox px_2">
      <label class="detail--checkbox mb_0">
        <input type="checkbox" checked />
      </label>
    </div>-->
    <!-- Start: Name Column -->
    <div class="col col--name px_2">
      <div class="col col--name-text" @click="updatePost()">
        {{ item.title }}
      </div>
    </div>
    <!-- End: Name Column -->
    <!-- Start: Category Column -->
    <div class="col col--category px_2">
      <span v-for="(category, index) in item._categories" :key="`c-${index}`">
        {{
          category.title + [index === item._categories.length - 1 ? "" : ", "]
        }}
      </span>
    </div>
    <!-- End: Category Column -->
    <!-- Start: Image Column -->
    <div class="col col--image px_2">
      <div class="" v-if="item.attachments.length === 0">Không có hình ảnh</div>
      <div class="d_flex align_items_center justify_content_start" v-else>
        <div
          class="image--wrap position_relative mr_2"
          v-for="(image, index) in item.attachments.slice(0, 3)"
          :key="`img-${index}`"
        >
          <div
            class="image--bg"
            v-if="image.typeAttachment === 1"
            :style="{ backgroundImage: 'url(' + image.link + ')' }"
          >
            <img :src="image.link" />
          </div>
        </div>
        <div
          class="image--wrap position_relative"
          v-if="item.attachments.length > 3"
        >
          <div
            class="image--wrap-more d_flex align_items_center justify_content_center"
          >
            +{{ item.attachments.length - 3 }}
          </div>
        </div>
      </div>
    </div>
    <!-- End: Image Column -->
    <!-- Start: Action Column -->
    <div
      class="col d_flex align_items_center justify_content_center col--action px_4 text_center"
    >
      <span class="mx_1" @click="updatePost">
        <icon-base icon-name="icon-edit" viewBox="0 0 20 20">
          <icon-edit />
        </icon-base>
      </span>
      <span class="mr_1" @click="showDeletePopup()">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </span>
      <span class="mx_1" @click="showPostNowPopup">
        <icon-base icon-name="icon-edit" viewBox="0 0 18 18">
          <icon-info />
        </icon-base>
      </span>
    </div>
    <!-- End: Action Column -->
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    updatePost() {
      this.$store.dispatch("getPostById", this.item._id);
      this.$router.push({
        name: "post_update_post",
        params: { id: this.item._id }
      });
    },
    showDeletePopup() {
      this.$emit("showDeletePopup", this.item);
    },
    showPostNowPopup() {
      this.$emit("showPostNowPopup", this.item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
