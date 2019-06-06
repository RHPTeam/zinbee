<template>
  <div
    class="post--navigation d_flex align_items_center mb_4"
    :data-theme="currentTheme"
  >
    <!-- Start: Navigation Left -->
    <div class="btn--create mr_3" @click="createPost">Viết bài mới</div>
    <router-link
      class="mr_2"
      tag="button"
      :to="{ name: 'market_post' }"
      active-class="active"
      exact
    >
      Tất cả bài viết
    </router-link>
    <!-- End: Navigation Left -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    newPost() {
      return this.$store.getters.newPost;
    }
  },
  methods: {
    async createPost() {
      this.$router.push({ name: "market_post_create" });
    }
  }
};
</script>

<style lang="scss" scoped>
.post--navigation {
  .nav--left {
    height: 40px;
    > button {
      background-color: transparent;
      border: 0;
      border-radius: 0.625rem;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 600;
      height: 100%;
      outline: none;
      padding: 0 0.5rem;
      transition: all 0.4s ease;
    }
    .btn--create {
      background-color: #ffb94a;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      padding: 0 0.75rem;
      transition: all 0.4s ease;
      &:hover {
        background-color: #ff9e4a;
      }
    }
    .divider {
      height: 16px;
      width: 2px;
    }
  }
  .nav--right {
    .icon--info {
      cursor: pointer;
      transition: all 0.4s ease;
    }
  }
}

/* Theme Color */
.post--navigation[data-theme="light"] {
  .nav--left {
    button {
      color: #999999;
      &:hover,
      &.active {
        color: #ffb94a;
      }
    }
    .divider {
      background-color: #ccc;
    }
  }
  .nav--right {
    .icon--info {
      color: #999;
      &:hover {
        color: #444;
      }
    }
  }
}

.post--navigation[data-theme="dark"] {
  .nav--right {
    button {
      color: #999999;
      &:hover,
      &.active {
        color: #ffb94a;
      }
    }
    .divider {
      background-color: #666;
    }
  }
}
</style>
