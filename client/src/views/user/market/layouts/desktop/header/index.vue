<template>
  <div
    class="header d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="ct">
      <div class="r mx_0 mb_3">
        <div
          class="c_md_6 header--left d_flex justify_content_start align_items_center px_0"
        >
          <!-- Start: Header logo -->
          <div class="logo">
            <router-link tag="div" :to="{ name: 'market_home' }">
              <div class="logo d_flex align_items_center">
                <icon-base
                  icon-name="logo"
                  width="40px"
                  height="40px"
                  viewBox="0 0 200 200"
                >
                  <icon-logo-icon-white />
                </icon-base>
                <div class="center--support ml_2">
                  Zinbee Store
                </div>
              </div>
            </router-link>
          </div>
          <!-- End: Header logo-->
        </div>
        <div
          class="c_md_6 header--right d_flex justify_content_end align_items_center px_0"
        >
          <!-- Start: Redirect to help -->
          <div class="help mr_2 ml_1" @click="redirectToHelp">
            <icon-base
              class="icon--help mt_1"
              icon-name="menu"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <icon-help />
            </icon-base>
          </div>
          <!-- End: Redirect to help -->

          <!-- Start: More Options -->
          <div class="more--options position_relative pr_2">
            <div @click="showOptionsMoreDropdown" class="more mt_2">
              <icon-base
                class="icon--application"
                :class="{ active: isShowOptionsMoreDropdown }"
                width="24px"
                height="24px"
                viewBox="0 0 512 512"
              >
                <icon-application />
              </icon-base>
            </div>
            <transition name="dropdown">
              <div
                class="position_absolute options"
                v-if="isShowOptionsMoreDropdown === true"
                v-click-outside="closeOptionsMoreDropdown"
              >
                <div class="d_flex text_center r m_0 application">
                  <div class="zin--post item c_4" @click="gotoHomePost">
                    <icon-base
                      icon-name="bell"
                      width="50px"
                      height="50px"
                      viewBox="0 0 512 512"
                    >
                      <icon-zin-post />
                    </icon-base>
                    <div class="pt_1">Zin Post</div>
                  </div>
                  <div
                    class="zin--post zin-chat item c_4"
                    @click="gotoHomeChat"
                  >
                    <icon-base
                      icon-name="bell"
                      width="50px"
                      height="50px"
                      viewBox="0 0 512 512"
                    >
                      <icon-zin-chat />
                    </icon-base>
                    <div class="pt_1">Zin Chat</div>
                  </div>
                  <div class="zin--post instagram item c_4">
                    <icon-base
                      icon-name="bell"
                      width="50px"
                      height="50px"
                      viewBox="0 0 550 550"
                    >
                      <icon-instagram />
                    </icon-base>
                    <div class="pt_1">Instagram</div>
                  </div>
                  <div class="zin--post zalo item c_4">
                    <icon-base
                      icon-name="bell"
                      width="50px"
                      height="50px"
                      viewBox="0 0 512 512"
                    >
                      <icon-zalo />
                    </icon-base>
                    <div class="pt_1">Zalo</div>
                  </div>
                </div>
                <div class="text_center view-more">Xem thêm</div>
              </div>
            </transition>
          </div>
          <!-- End: More Options -->

          <!-- Start: User Info -->
          <div
            class="profile position_relative d_flex justify_content_end align_items_center"
            @click="showProfileDropdown"
            v-click-outside="closeProfileDropdown"
          >
            <div class="profile--image">
              <div
                v-if="userMember.imageAvatar"
                class="avatar--wrap avatar--img position_relative d_block"
                :style="{
                  backgroundImage: 'url(' + userMember.imageAvatar + ')'
                }"
              ></div>
              <div
                v-else
                class="avatar--wrap avatar--default position_relative d_block"
              >
                <span class="position_absolute">
                  {{ userMember.name | getFirstLetter }}
                </span>
              </div>
            </div>
            <span class="profile--name ml_2 mr_2">{{ userMember.name }}</span>
            <div class="profile--icon">
              <icon-base
                icon-name="arrow-down"
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
                  v-if="userMember.imageAvatar"
                  class="avatar--wrap avatar--img position_relative d_block"
                  :style="{
                    backgroundImage: 'url(' + userMember.imageAvatar + ')'
                  }"
                ></div>
                <div
                  v-else
                  class="avatar--wrap avatar--default position_relative d_block"
                >
                  <span class="position_absolute">
                    {{ userMember.name | getFirstLetter }}
                  </span>
                </div>
                <div class="ml_2">
                  <h4 class="mb_0">{{ userMember.name }}</h4>
                  <p class="mb_0">{{ userMember.email }}</p>
                </div>
              </div>
              <div
                class="dropdown--item"
                @click="goToProfileSetting"
              >
                <icon-base
                  icon-name="account"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <icon-account /> </icon-base
                >Thiết lập tài khoản
              </div>
              <div class="dropdown--divider"></div>
              <a
                class="dropdown--item"
                href="javascript:void(0)"
                @click="logOut"
              >
                <icon-base
                  icon-name="logout"
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
      </div>
      <!-- Start: Header Bottom Menu -->
      <div class="header--bottom-wrapper">
        <div class="header--bottom">
          <nav>
            <div class="nav--label">
              <a
                :title="category.name"
                class="nav--label-link"
                :class="{
                  active: category._id === currentParentMarketCategory._id
                }"
                v-for="(category, index) in allMarketCategoriesTree"
                :key="index"
                @click="chooseCategory(category)"
              >
                <span>{{ category.name }}</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
      <!-- End: Header Bottom Menu -->
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "index.style";
</style>
