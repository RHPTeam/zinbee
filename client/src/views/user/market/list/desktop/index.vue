<template>
  <div class="list--wrapper">
    <div class="r mx_0 top--search mb_3">
      <app-search />
    </div>
    <div class="top ct r m_auto">
      <div class="c_md_3 pl_0">
        <div
          class="filter--menu d_flex align_items_center"
          @click="changeFilterSidebarList"
        >
          <div v-if="showMarketListSidebar === true" class="close--sidebar">
            x
          </div>
          <div class="icon pr_1" v-else>
            <div class="icon--menu">
              <svg
                fill="currentColor"
                preserveAspectRatio="xMidYMid meet"
                height="18"
                width="18"
                viewBox="0 0 18 18"
                class="_2CX5O"
                style="vertical-align:middle;margin-top: -4px"
              >
                <g class="QDdL6" fill="#333333">
                  <rect x="0" y="3" width="18" height="2"></rect>
                </g>
                <g class="_3Os_n" fill="#333333">
                  <rect x="0" y="8" width="18" height="2"></rect>
                </g>
                <g class="_1xGcT" fill="#333333">
                  <rect x="0" y="13" width="18" height="2"></rect>
                </g>
                <g class="_36iK0">
                  <g>
                    <circle fill="#333333" cx="4.5" cy="4" r="2.2"></circle>
                    <circle fill="#FFFFFF" cx="4.5" cy="4" r="0.8"></circle>
                  </g>
                </g>
                <g class="_1A3u9">
                  <g>
                    <circle fill="#333333" cx="13.5" cy="9" r="2.2"></circle>
                    <circle fill="#FFFFFF" cx="13.5" cy="9" r="0.8"></circle>
                  </g>
                </g>
                <g class="_3Fxu-">
                  <g>
                    <circle fill="#333333" cx="9" cy="14" r="2.2"></circle>
                    <circle fill="#FFFFFF" cx="9" cy="14" r="0.8"></circle>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <span class="name--filter">Bộ lọc</span>
          <!-- <span class="name--filter">&amp; Refine</span> -->
        </div>
      </div>
      <div class="c_md_9 pr_0">
        <!-- Start: Filter Product -->
        <filter-product />
        <!-- End: Filter Product -->
      </div>
    </div>
    <div class="ct r m_auto px_3">
      <!-- Sidebar -->
      <div
        class="pl_0"
        :class="showMarketListSidebar ? 'c_md_3' : 'sidebar--active'"
      >
        <!-- Start: App Sidebar-->
        <app-sidebar v-if="showMarketListSidebar === true"></app-sidebar>
        <!-- End: App Sidebar -->
      </div>
      <!-- Main: Product -->
      <div class="px_0" :class="showMarketListSidebar ? 'c_md_9' : 'c_md_12'">
        <!-- Start: App Data-->
        <router-view></router-view>
        <!-- End: App Data -->
      </div>
    </div>
  </div>
</template>

<script>
import AppSearch from "./search";
import AppSidebar from "./sidebar";
import FilterProduct from "./filter";

export default {
  components: {
    AppSearch,
    AppSidebar,
    FilterProduct
  },
  data() {
    return {
      isShowFilter: false
    };
  },
  computed: {
    showMarketListSidebar() {
      return this.$store.getters.showMarketListSidebar;
    }
  },
  methods: {
    changeFilterSidebarList() {
      this.$store.dispatch("changeMarketListSidebar");
    }
  }
};
</script>

<style scoped lang="scss">
.top--search {
  border-bottom: 1px solid #e1e8ed;
}
.sidebar--active {
  display: none;
}
.close--sidebar {
  color: #999;
  font-weight: bold;
  font-size: 17px;
  margin-top: -4px;
  margin-right: 3px;
}
.icon--menu {
  svg {
    max-width: 12px;
  }
}
.selected-filters {
  .selected {
    cursor: pointer;
    .name {
      text-decoration: underline;
    }
    &:last-child {
      .name {
        text-decoration: none;
      }
      .cut {
        display: none;
      }
    }
  }
  .clear {
    color: hsl(0, 0%, 20%);
    font-size: 12px;
    margin: 0 8px;
    text-decoration: underline;
    cursor: pointer;
  }
}
.icon--close {
  font-weight: bold;
}
.left--sidebar {
  font-size: 0.875rem;
}
.filter--menu {
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, segoe ui, avenir next, avenir,
    helvetica neue, helvetica, ubuntu, roboto, noto, arial, sans-serif;
  font-size: 14px;
  transition: all 0.2s ease-in;
  box-shadow: 1px 1px 3px -1px hsl(0, 0%, 90%);
  background-color: transparent;
  border: none;
  padding: 8px 8px 8px 0;
  color: hsl(0, 0%, 40%);
  box-shadow: none;
  width: 160px;
}
.name--filter {
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, segoe ui, avenir next, avenir,
    helvetica neue, helvetica, ubuntu, roboto, noto, arial, sans-serif;
  color: hsl(0, 0%, 20%);
  -webkit-font-smoothing: subpixel-antialiased;
  font-weight: 600;
}
</style>
