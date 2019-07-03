<template>
  <div class="item--body d_flex align_items_center px_3 py_2" v-if="item">
    <!-- Start: Name Column -->
    <div class="col col--name px_2" @click="showEditPopup">
      <div class="col col--name-text" v-if="item._account">
        {{ item._account.name }}
      </div>
    </div>
    <!-- End: Name Column -->
    <!-- Start: Category Column -->
    <div class="col col--category px_2">
      <span>{{ item.customer.total }}</span>
    </div>
    <!-- End: Category Column -->
    <!-- Start: Category Column -->
    <div class="col col--category px_2">
      <span>{{ item.expire.usedTime }}</span>
    </div>
    <!-- End: Category Column -->
    <!-- Start: Image Column -->
    <div class="col col--image px_2">{{ item.expire.leftTime }}</div>
    <!-- End: Image Column -->
    <!-- Start: Image Column -->
    <div class="col col--image px_2" v-if="item._package">
      {{ item._package.title }}
    </div>
    <!-- End: Image Column -->
    <!-- Start: Action Column -->
    <div
      class="col d_flex align_items_center justify_content_center col--action px_4 text_center"
    >
      <span class="mx_1" @click="showEditPopup">
        <icon-base icon-name="icon-edit" viewBox="0 0 20 20">
          <icon-edit />
        </icon-base>
      </span>
      <span class="mr_1" @click="showDeletePopup">
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
    item: Object
  },
  methods: {
    async showEditPopup() {
      await this.$emit("showCreatePopup", true);
      await this.$store.dispatch("getInfoAgency", this.item._id);
      this.$store.dispatch("setVaribleControlAgency", 1);
    },
    showDeletePopup() {
      this.$emit("showDeletePopup", this.item._id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
