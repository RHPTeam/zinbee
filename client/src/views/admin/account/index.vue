<template>
  <div class="account text_left px_4 py_4" :data-theme="currentTheme">
    <div class="account--title mb_4">Quản lý tài khoản</div>
    <div class="account--content card card_body p_4">
      <div
        class="alert alert_success"
        v-if="$store.getters.status === 'success'"
      >
        Kích hoạt tài khoản với mã kích hoạt thành công!
      </div>
      <app-top :isGrid="isGrid" @changeLayout="isGrid = $event" />
      <div v-if="isGrid" class="account--grid">
        <app-grid-view />
      </div>
      <div v-else class="list--content">
        <app-list-view />
      </div>
      <app-paginate />
    </div>
  </div>
</template>
<script>
import AppTop from "./components/top/index";
import AppGridView from "./components/views/grid/index";
import AppListView from "./components/views/list/index";
import AppPaginate from "./components/paginate/index";

export default {
  components: {
    AppTop,
    AppGridView,
    AppListView,
    AppPaginate
  },
  data() {
    return {
      isGrid: true
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  async created() {
    await this.$store.dispatch("getAllAccountAdmin");

    const data = this.$store.getters.users;

    await this.$store.dispatch("getUsersFilter", data);
  }
};
</script>

<style scoped lang="scss">
.account {
  .account--title {
    font-size: 1.125rem;
    font-weight: bold;
  }
  .account--content {
    border: 0;
    border-radius: 8px;
  }
}

/* Theme Color */
.account[data-theme="light"] {
  .account--title {
    color: #666;
  }
  .account--content {
    background-color: #fff;
  }
}
.account[data-theme="dark"] {
  .account--title {
    color: #ccc;
  }
  .account--content {
    background-color: #27292d;
  }
}
</style>
