<template>
  <div class="header d_flex align_items_center">
    <!-- start: Search -->
    <div class="mr_auto search">
      <div
        class="list--input d_flex justify_content_between align_items_center"
      >
        <span class="ml_3 mt_1">
          <icon-base
            icon-name="Tìm kiếm"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-input-search />
          </icon-base>
        </span>
        <input type="text" placeholder="Tìm kiếm" />
      </div>
    </div>
    <!-- End: Search -->
    <!-- Start: Filter -->
    <div class="ml_auto filter">
      <div
        class="btn btn--filter"
        @click="showOptionCategories"
        :data-theme="currentTheme"
        v-click-outside="closeFilterDropdown"
      >
        {{ actions[0].title }}
        <icon-base
          class="ml_1"
          icon-name="Lựa chọn"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <icon-sort-down />
        </icon-base>
        <!-- Start: Filter dropdown -->
        <div class="dropdown text_left" v-show="showFilterDropdown">
          <VuePerfectScrollbar class="scroll--control">
            <!-- <div class="dropdown--item" v-if="statusCategories === 'loading'">
          <loading-component/>
            </div>-->
            <div>
              <!-- <div class="dropdown--item" @click="getActions">Tất cả</div> -->
              <div
                class="dropdown--item"
                v-for="(item, index) in actions"
                :key="`a-${index}`"
              >
                {{ item.title }}
              </div>
            </div>
          </VuePerfectScrollbar>
        </div>
        <!-- End: Filter dropdown -->
      </div>
    </div>
    <!-- End: Filter -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilterDropdown: false,
      actions: [
        {
          title: "Tất cả"
        },
        {
          title: "Tài khoản facebook"
        },
        {
          title: "Facebook tìm kiếm"
        },
        {
          title: "Kho nội dung"
        },
        {
          title: "Nhóm và trang"
        },
        {
          title: "Đăng bài tự động"
        },
        {
          title: "Đăng ký"
        },
        {
          title: "Số người đang hoạt động"
        }
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    getActions() {},
    closeFilterDropdown() {
      this.showFilterDropdown = false;
    },
    async showOptionCategories() {
      // if ( this.showFilterDropdown === false ) {
      //   await this.$store.dispatch("getAllCategories");
      // }
      this.showFilterDropdown = !this.showFilterDropdown;
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  .list--input {
    border-radius: 10px;
    font-size: 0.875rem;
    height: 40px;
    background: #fafafa;
    width: 20rem;
    > input[type="text"] {
      background-color: transparent;
      border: 0;
      color: #666;
      height: 100%;
      outline: none;
      width: calc(100% - 48px);
      padding-right: 15px;
      &::placeholder {
        color: #666;
      }
    }
    svg {
      color: #999;
    }
  }
  // Filter
  .btn--filter {
    border-radius: 0.5rem;
    font-size: inherit;
    // height: 40px;
    // line-height: 40px;
    padding: 0.525rem 0.625rem;
    position: relative;
    &:active,
    &:focus {
      box-shadow: none;
      outline: 0;
    }
    .dropdown {
      border: 0;
      border-radius: 0.5rem;
      padding: 0.375rem 0;
      position: absolute;
      top: calc(100% + 3px);
      right: 0;
      min-width: 13rem;
      width: auto;
      z-index: 999;
      &--item {
        padding: 0.525rem 0.625rem;
        border-bottom: 1px solid #cccccc4f;
        &:last-child {
          border: 0;
        }
      }
      .scroll--control {
        max-height: 200px;
      }
    }
    svg {
      stroke-width: 5;
      vertical-align: middle;
      vertical-align: -webkit-baseline-middle;
    }
  }
}

/*  Theme color */
.header {
  .btn--filter[data-theme="light"] {
    background-color: #fff;
    .dropdown {
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      color: #444;
      &--item {
        &:hover {
          background-color: #ffb94a;
          color: #fff;
        }
      }
    }
    svg {
      color: #ccc;
    }
  }
  .btn--filter[data-theme="dark"] {
    background-color: #27292d;
    color: #f7f7f7;
    .dropdown {
      background-color: #27292d;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
      color: #f7f7f7;
      &--item {
        &:hover {
          background-color: #ffb94a;
          color: #fff;
        }
      }
    }
    svg {
      color: #999;
    }
  }
}
</style>
