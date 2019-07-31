<template>
  <div class="navigation mb_3">
    <div class="create" @click="openPopupCreate">Tạo mã kích hoạt</div>
  </div>
</template>

<script>
export default {
  methods: {
    openPopupCreate() {
      this.$emit("openPopupCreate", true);
    }
  }
};
</script>

<style scoped lang="scss">
.navigation {
  .create {
    background-color: #ffb94a;
    border-radius: 0.5rem;
    color: #fff;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    padding: 0 0.75rem;
    transition: all 0.4s ease;
    &:hover {
      background-color: #ff9e4a;
    }
  }
}
</style>
