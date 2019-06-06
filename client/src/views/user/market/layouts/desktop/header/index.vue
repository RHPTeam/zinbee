<template>
  <div
    class="header d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="ct">
      <div class="r mx_0 mb_3">
        <div
          class="c_md_6 header--left d_flex justify_content_start align_items_center "
        >
          <!-- Start: Header logo -->
          <div class="logo">
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
          </div>
          <!-- End: Header logo-->
        </div>
        <div
          class="c_md_6 header--right d_flex justify_content_end align_items_center"
        >
          <!-- Start: Redirect to help -->
          <div class="help mr_2 ml_1" @click="redirectToHelp">
            <icon-base
              icon-name="menu"
              width="25"
              height="25"
              viewBox="0 0 25 25"
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
              <router-link
                class="dropdown--item"
                :to="{ name: 'post_account' }"
              >
                <icon-base
                  icon-name="account"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <icon-account /> </icon-base
                >Thiết lập tài khoản
              </router-link>
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
      <div class="header--bottom-wrapper">
        <div class="header--bottom">
          <nav>
            <div class="nav--label">
              <a title="Bài viết mẫu" class="active nav--label-link"
                ><span>Bài viết mẫu</span></a
              >
              <a title="Chiến dịch mẫu" class="nav--label-link"
                ><span>Chiến dịch mẫu</span></a
              >
              <a title="Ảnh trending" class="nav--label-link"
                ><span>Ảnh trending</span></a
              >
              <a title="Khác" class="nav--label-link"><span>Khác</span></a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "index.style";
</style>
