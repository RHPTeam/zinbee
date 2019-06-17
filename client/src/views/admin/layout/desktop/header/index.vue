<template>
  <div v-if="!user"></div>
  <div
    v-else
    class="header d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <!-- Start: Header Left -->
    <div class="header--left d_flex justify_content_start align_items_center">
      <div class="header--icon" @click="toogleSidebar">
        <icon-base
          icon-name="menu"
          width="20"
          height="20"
          viewBox="0 0 500 500"
        >
          <icon-menu />
        </icon-base>
      </div>
      <!-- <button
        class="header--button ml_4"
        @click="createNewPost"
        >Viết bài mới</button> -->
    </div>
    <!-- End: Header Left -->
    <!-- Start: Header Right -->
    <div class="header--right d_flex align_items_center">
      <!-- Start: Notification Groups -->
      <div class="notification--groups position_relative">
        <div
          class="btn--notification position_relative mr_3"
          @click="showNotificationDropdown"
        >
          <icon-base
            :class="[isShowNotificationDropdown ? 'active' : null]"
            icon-name="Thông báo"
            width="20px"
            height="20px"
            viewBox="0 0 512 512"
          >
            <icon-bell></icon-bell>
          </icon-base>
          <div class="notification--total position_absolute">
            <div class="text text_center">{{ notifications.length }}</div>
          </div>
        </div>
        <!-- Start: Notification Dropdown -->
        <div class="notification--dropdown position_absolute">
          <transition name="dropdown">
            <header-notification
              v-if="isShowNotificationDropdown"
              :notifications="notifications"
              @closeDropdown="isShowNotificationDropdown = $event"
            ></header-notification>
          </transition>
        </div>
        <!-- End: Notification Dropdown -->
      </div>
      <!-- End: Notification Groups -->
      <!-- Start: User Info -->
      <div
        class="profile position_relative d_flex justify_content_end align_items_center"
        @click="showProfileDropdown"
      >
        <div class="profile--image">
          <div
            v-if="user.imageAvatar"
            class="avatar--wrap avatar--img position_relative d_block"
            :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
          ></div>
          <div
            v-else
            class="avatar--wrap avatar--default position_relative d_block"
          >
            <span class="position_absolute">{{
              user.name | getFirstLetter
            }}</span>
          </div>
        </div>
        <span class="profile--name ml_2 mr_2">{{ user.name }}</span>
        <div class="profile--icon">
          <icon-base
            icon-name="Hồ sơ"
            width="10"
            height="10"
            viewBox="0 0 130 130"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <!-- Start: Dropdown Menu -->
        <div
          class="dropdown--menu dropdown--menu-right user--dd flipInY animated"
          :class="{ show: isShowProfileDropdown }"
        >
          <span class="with--arrow">
            <span class="bg-orange"></span>
          </span>
          <div
            class="d_flex align_items_center py_2 px_3 bg-orange border--custom text_white mb_2"
          >
            <div
              v-if="user.imageAvatar"
              class="avatar--wrap avatar--img position_relative d_block"
              :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
            ></div>
            <div
              v-else
              class="avatar--wrap avatar--default position_relative d_block"
            >
              <span class="position_absolute">{{
                user.name | getFirstLetter
              }}</span>
            </div>
            <div class="ml_2">
              <h4 class="mb_0">{{ user.name }}</h4>
              <p class="mb_0">{{ user.email }}</p>
            </div>
          </div>
          <div class="dropdown--divider"></div>
          <a class="dropdown--item" href="javascript:void(0)" @click="logOut">
            <icon-base
              icon-name="Đăng xuất"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-logout /> </icon-base
            >Đăng xuất
          </a>
        </div>
        <!-- End: Dropdown Menu -->
      </div>
      <!-- End: User Info -->
    </div>
    <!-- End: Header Right -->
  </div>
</template>

<script src="./index.script"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
