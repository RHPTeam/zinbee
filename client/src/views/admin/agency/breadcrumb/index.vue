<template>
  <div
    class="bread--crumb text_left d_flex justify_content_start align_items_end px_2 py_3"
  >
    <div class="title mr_3">
      {{ breadTitle }}
    </div>
    <div class="desc">
      {{ breadDesc }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["breadTitle", "breadDesc"]
};
</script>
<style lang="scss" scoped>
.bread--crumb {
  margin-top: 25px;
  margin-bottom: 25px;
  .title {
    font-size: 30px;
    font-weight: 600;
  }
  .desc {
    font-size: 14px;
    font-weight: normal;
    margin-left: 16px;
    margin-bottom: 5px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .bread--crumb {
    display: flex !important;
    flex-direction: column !important;
    text-align: left !important;
    .title {
      width: 100%;
    }
    .desc {
      width: 100%;
    }
  }
}
</style>
