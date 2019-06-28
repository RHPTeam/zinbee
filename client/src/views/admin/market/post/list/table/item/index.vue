<template>
  <div
    class="item--body d_flex align_items_center px_3 py_2"
    :class="item.assign === true ? 'disable' : ''"
  >
    <!-- Start: Name Column -->
    <div class="col col--name px_2">
      <router-link
        class="col col--name-text"
        :to="{ name: 'market_post_update', params: { marketPostId: item._id } }"
        @click="updatePost()"
      >
        {{ item.title.slice(0, 40) }}{{ item.title.length > 40 ? "..." : "" }}
      </router-link>
    </div>
    <!-- End: Name Column -->
    <!-- Start: Category Column -->
    <div class="col col--category px_2">
      <span
        >{{ item.content.slice(0, 70)
        }}{{ item.content.length > 70 ? "..." : "" }}</span
      >
    </div>
    <!-- End: Category Column -->
    <!-- Start: Image Column -->
    <div class="col col--image px_2">
      <div class="" v-if="item.photos === 0">Không có hình ảnh</div>
      <div class="d_flex align_items_center justify_content_start" v-else>
        <div
          class="image--wrap position_relative mr_2"
          v-for="(image, index) in item.photos.slice(0, 3)"
          :key="`img-${index}`"
        >
          <div
            class="image--bg"
            :style="{ backgroundImage: 'url(' + image + ')' }"
          >
            <img :src="image" />
          </div>
        </div>
        <div class="image--wrap position_relative" v-if="item.photos > 3">
          <div
            class="image--wrap-more d_flex align_items_center justify_content_center"
          >
            +{{ item.photos.length - 3 }}
          </div>
        </div>
      </div>
    </div>
    <!-- End: Image Column -->
    <!-- Start: Action Column -->
    <div
      class="col d_flex align_items_center justify_content_center col--action px_4 text_center"
    >
      <span class="mx_1" @click="showCreatePopup">
        <icon-base
          width="20"
          height="20"
          icon-name="post"
          viewBox="0 0 520 520"
        >
          <icon-automatic />
        </icon-base>
      </span>
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
      this.$store.dispatch("getMarketPostById", this.item._id);
      this.$router.push({
        name: "market_post_update",
        params: { marketPostId: this.item._id }
      });
    },
    showDeletePopup() {
      this.$emit("showDeletePopup", this.item);
    },
    showCreatePopup() {
      this.$emit("showCreatePopup", this.item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
