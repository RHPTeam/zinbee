<template>
  <div class="wrapper ct">
    <div class="top mt_4">
      <div class="total">
        <span class="text--bold">{{ resultSearchTotal }}</span>
        <span> kết quả tìm kiếm với </span>
        <span class="text--key text--bold">{{ this.$route.query.key }}</span>
      </div>
    </div>
    <div class="main mb_5">
      <div class="list--group">
        <div
          class="list--group-item"
          v-for="(item, index) in resultSearch"
          :key="index"
        >
          <router-link
            class="item--title"
            :to="{
              name: 'help_detail',
              params: { id: item._id },
              query: { type: 'hc_blog' }
            }"
          >
            {{ item.title }}
          </router-link>
          <div class="item--desc">
            {{ removeHtmlTags(item.content.slice(0, 150)) + "..." }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    resultSearch() {
      return this.$store.getters.resultSearch;
    },
    resultSearchTotal() {
      return this.$store.getters.resultSearchTotal;
    }
  },
  methods: {
    removeHtmlTags(str) {
      return str.replace(/<[^>]*>?/gm, "");
    }
  }
};
</script>

<style scoped lang="scss">
.text--bold {
  font-weight: 600;
}
.top {
  border-bottom: 1px solid #e4e4e4;
  font-size: 0.95rem;
  padding: 0.375rem 0;
  .total {
    .text--key {
      font-style: italic;
    }
  }
}
.list--group {
  &-item {
    margin: 1rem 0;
    .item--title {
      color: #385898;
    }
    .item--desc {
      color: #999999;
      font-size: 0.875rem;
    }
  }
}
</style>
