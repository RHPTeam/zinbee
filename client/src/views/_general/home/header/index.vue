<template>
  <div
    class="wrapper--header"
    :class="changeBackgroundHeader === 2 ? 'active' : ''"
  >
    <div class="content">
      <nav class="navbar navbar-default header-area affix-top ct">
        <div class="d_flex align_items_center header">
          <!--Start: Logo -->
          <router-link class="logo mr_auto d_none d_md_block" to="/">
            <icon-base
              icon-name="ZinBee"
              width="100"
              height="49.73"
              viewBox="0 0 250.446 93.703"
            >
              <icon-logo />
            </icon-base>
          </router-link>
          <router-link class="logo mr_auto d_block d_md_none" to="/">
            <icon-base
              icon-name="ZinBee"
              width="60"
              height="50"
              viewBox="0 0 100 100"
            >
              <icon-logo-short />
            </icon-base>
          </router-link>
          <!--Start: Logo -->

          <!-- Start: Navbar -->
          <div class="d_flex nav--menu ml_auto">
            <!-- <div
              class="items--header"
              v-for="(item, index) in itemHeader"
              :key="index"
              :class="{ active: activeIndex === index }"
              @click="activeMenu(index)"
            >
              {{ item }}
            </div>-->
            <nav>
              <ul class="d_flex nav--menu">
                <!--<li class="items&#45;&#45;header">Trang chủ</li>
                <li class="items&#45;&#45;header">Giới thiệu</li>
                <li class="items&#45;&#45;header">Tiện ích</li>
                <li class="items&#45;&#45;header">Bảng giá</li>
                <li class="items&#45;&#45;header">Liên hệ</li>-->
                <li class="items--header" @click="goToSignIn">Đăng nhập</li>
                <li
                  class="items--header try ml_2"
                  v-if="changeBackgroundHeader === 2"
                  @click="goToSignUp"
                >
                  Trải nghiệm ngay
                </li>
              </ul>
            </nav>
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
              <ul
                class="nav--menu-res position_absolute"
                v-if="menu === true"
                v-click-outside="closeMenu"
              >
                <!--<li class="items&#45;&#45;header">
                  <a href="#">Trang chủ</a>
                </li>
                <li class="items&#45;&#45;header">
                  <a href="#">Giới thiệu</a>
                </li>
                <li class="items&#45;&#45;header">
                  <a href="#">Tiện ích</a>
                </li>
                <li class="items&#45;&#45;header">
                  <a href="#">Bảng giá</a>
                </li>
                <li class="items&#45;&#45;header">
                  <a href="#">Liên hệ</a>
                </li>-->
                <li class="items--header" @click="goToSignIn">
                  <a href="#">Đăng nhập</a>
                </li>
                <li class="items--header" @click="goToSignUp">
                  <a href="#">Trải nghiệm ngay</a>
                </li>
              </ul>
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
    goToSignIn() {
      // const routeSignIn = this.$router.resolve({ name: "user_signin" });

      // window.open(routeSignIn.href, "_blank");
      this.menu = false;
      this.$router.push({ name: "user_signin" });
    },
    goToSignUp() {
      // const routeSignUp = this.$router.resolve({ name: "user_signup" });

      // window.open(routeSignUp.href, "_blank");
      this.menu = false;
      this.$router.push({ name: "user_signup" });
    }
  },
  computed: {
    changeBackgroundHeader() {
      return this.$store.getters.backgroundHeader;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
