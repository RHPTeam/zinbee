<template>
  <div>
    <div class="title">{{ category.title }}</div>
    <div class="list--group">
      <div
        class="list--group-item"
        v-for="(item, index) in category._blogHelp"
        :key="index"
      >
        <div
          class="header d_flex align_items_center justify_content_between"
          @click="showBlogContent(index)"
        >
          <div class="item--title">{{ item.title }}</div>
          <div class="item--icon">
            <icon-base
              class="icon--arrow-down"
              icon-name="Xem thêm"
              width="16"
              height="16"
              viewBox="0 0 150 150"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
        </div>
        <transition name="slide">
          <div
            class="item--content mt_3"
            v-if="selectedBlogIndex === index"
            v-html="item.content"
          ></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"],
  data() {
    return {
      selectedBlogIndex: ""
    };
  },
  methods: {
    showBlogContent(index) {
      if (this.selectedBlogIndex === index) {
        this.selectedBlogIndex = "";
      } else {
        this.selectedBlogIndex = index;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  color: #1c1e21;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.list--group {
  &-item {
    border-bottom: 1px solid #e4e4e4;
    padding: 0.625rem 0;
    &:last-child {
      border-bottom: 0;
    }
    .header {
      cursor: pointer;
      &:hover {
        .item--title {
          text-decoration: underline;
        }
      }
    }
    .item--title {
      color: #3b5998;
      font-size: 1.125rem;
    }
    .item--icon {
      .icon--arrow-down {
        color: #cfcfcf;
        cursor: pointer;
        stroke: #cfcfcf;
        stroke-width: 10;
        vertical-align: middle;
      }
    }
    .item--content {
      transform-origin: top;
      font-size: 1.125rem;
      /deep/ img {
        max-width: 100%;
      }
      /deep/ p {
        line-height: 2;
      }
      /deep/ ul {
        li {
          margin: 1rem 0;
        }
      }
    }
  }
}

/* Transition */
.slide-enter-active {
  transition: all 0.2s ease;
}
.slide-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>
