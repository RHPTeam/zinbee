<template>
  <div class="wrapper--header">
    <div class="content">
      <nav class="navbar navbar-default header-area affix-top">
        <div class="d_flex align_items_center header">
          <!--Start: Logo -->
          <div class="logo mr_auto" @click="home">
            <icon-base
              icon-name="ZinBee"
              width="132.92"
              height="49.73"
              viewBox="0 0 250.446 93.703"
            >
              <icon-logo />
            </icon-base>
          </div>
          <!--Start: Logo -->

          <!-- Start: Navbar -->
          <div class="d_flex nav--menu ml_auto">
            <div
              class="items--header"
              v-for="(item, index) in itemHeader"
              :key="index"
              :class="{ active: activeIndex === index }"
              @click="activeMenu(index)"
            >
              {{ item }}
            </div>
          </div>
          <!-- End: Navbar -->
          <!-- Start: MENU - 980px -->
          <div class="menu position_relative">
            <div @click="showMenu">
              <icon-base
                icon-name="menu"
                width="20"
                height="20"
                viewBox="0 0 500 500"
              >
                <icon-menu />
              </icon-base>
            </div>
            <transition name="slide-fade">
              <div
                class="nav--menu-res position_absolute"
                v-if="menu === true"
                v-click-outside="closeMenu"
              >
                <ul>
                  <li v-for="item in itemHeader" :key="item" @click="closeMenu">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>
          <!-- End: MENU - 980px -->
        </div>
        <!-- /.container-fluid -->
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      itemHeader: [
        "Trang chủ",
        "Giới thiệu",
        "Tiện ích",
        "Bảng giá",
        "Liên hệ",
        "Đăng nhập",
        "Đăng ký"
      ],
      activeIndex: 0,
      menu: false
    };
  },
  methods: {
    activeMenu(index) {
      this.activeIndex = index;
      this.active = true;
    },
    showMenu() {
      this.menu = true;
    },
    closeMenu() {
      this.menu = false;
    },
    home() {
      setTimeout(() => {
        // const container = this.$el.querySelector("#customer");
        // container.scrollTop = container.scrollHeight;
      }, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
