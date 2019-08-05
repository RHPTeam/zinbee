<template>
  <div class="wrapper ct">
    <div class="data--empty" v-if="resultSearch.length === 0">
      <div class="title">
        Rất tiếc, chúng tôi không tìm thấy kết quả nào trong Trung tâm trợ giúp
        cho <span class="key">{{ this.$route.query.key }}</span>
      </div>
      <div class="tips">
        <div class="tips--title mb_3">Những mẹo sau có thể giúp bạn</div>
        <ul class="list--group">
          <li class="list--group-item">Thử kiểu đánh vần khác.</li>
          <li class="list--group-item">Thử ít từ hơn</li>
          <li class="list--group-item">Thử từ khóa khác</li>
          <li class="list--group-item">Thử tìm kiếm tổng quát hơn.</li>
        </ul>
      </div>
    </div>
    <div class="container" v-else>
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
.data--empty {
  .title {
    border-bottom: 1px solid #e4e4e4;
    color: #999;
    font-size: 18px;
    margin-bottom: 24px;
    padding: 24px 0;
    .key {
      font-weight: 600;
    }
  }
  .list--group {
    color: #999999;
    &-item {
      margin: 0;
    }
  }
  .tips {
    &--title {
      color: #999999;
    }
  }
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
