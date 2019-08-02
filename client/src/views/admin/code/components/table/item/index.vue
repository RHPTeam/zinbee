<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
    <!-- Start: Name Column -->
    <div class="col col--name px_2">
      <div class="col col--name-text">{{ code.code }}</div>
    </div>
    <!-- End: Name Column -->
    <!-- Start: Type Column -->
    <div class="col col--category px_2 activated">
      <span>
        {{ code.typeExpire }}
      </span>
    </div>
    <!-- End: Type Column -->
    <!-- Start: Phone Column -->
    <div class="col col--category px_2" @click="showPopupUserUsed">
      <span>{{ code.numberOfUser }} / {{ code.maxUser }}</span>
    </div>
    <!-- End: Phone Column -->
    <!-- Start: Email Column -->
    <div class="col col--category px_2 text_center">
      <span>{{ formatDate(code.expireDate) }}</span>
    </div>
    <!-- End: Email Column -->

    <!-- Start: Action Column -->
    <div
      class="col d_flex align_items_center justify_content_center col--action px_4 text_center"
    >
      <div class="mr_2" @click="showPopupDelete">
        <icon-base
          width="20"
          height="20"
          viewBox="0 0 15 15"
          icon-name="Xóa"
          class="icon--remove"
        >
          <icon-remove />
        </icon-base>
      </div>
      <div @click="showPopupUpdate">
        <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20" class="icon--edit">
          <icon-edit />
        </icon-base>
      </div>
    </div>
    <!-- End: Action Column -->
  </div>
</template>

<script>
export default {
  props: ["code"],
  methods: {
    formatDate(d) {
      const dateTime = new Date(d),
        date = String(dateTime.getDate()).padStart(2, "0"),
        month = String(dateTime.getMonth() + 1).padStart(2, "0"),
        year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    showPopupUpdate() {
      this.$emit("showPopupUpdate", this.code);
    },
    showPopupDelete() {
      this.$emit("showPopupDelete", this.code);
    },
    showPopupUserUsed() {
      this.$emit("showPopupUserUsed", this.code);
    }
  }
};
</script>

<style lang="scss" scoped>
.item--body {
  background: #e7e7e7;
  color: #333;
  transition: 0.4s all ease;
  &:hover {
    background: #d1d1d1;
  }
  .col--name {
    width: 40%;
  }
  .col--category {
    width: 20%;
  }
  .col--action {
    width: 20%;
    text-align: center;
    .icon--remove:hover {
      color: red;
      cursor: pointer;
    }
    .icon--edit:hover {
      color: #ffb94a;
      cursor: pointer;
    }
  }
}
</style>
