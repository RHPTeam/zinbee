<template>
  <div class="wrapper" :data-theme="currentTheme">
    <div class="grid">
      <!-- Start: Grid Header -->
      <div class="grid--header d_flex align_items_center mb_1">
        <div class="d_flex align_items_center">
          <input
            type="checkbox"
            class="grid--header-checkall checkbox"
            name
            value
            v-model="selectAll"
          />
          <div
            class="grid--header-remove ml_3"
            @click="openDeleteDialog"
            v-if="selected.length > 0"
          >
            <icon-base
              icon-name="remove"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <icon-remove />
            </icon-base>
          </div>
        </div>
        <div class="grid--header-select ml_3">
          Đã chọn
          <span class="font_weight_bold">{{ selected.length }}</span> tài khoản
        </div>
      </div>
      <!-- End: Grid Header -->
      <!-- Start: Grid Content -->
      <div class="grid--content">
        <div class="ct_f p_0">
          <!-- Start: User Data -->
          <div class="r" v-if="users.length > 0">
            <div class="c_md_3 mt_4" v-for="user in users" :key="user._id">
              <div class="user">
                <!-- Start: Checkbox -->
                <div class="user--action d_flex">
                  <input
                    type="checkbox"
                    class="checkbox"
                    name
                    v-model="selected"
                    :value="user._id"
                  />
                </div>
                <!-- End: Checkbox -->
                <!-- Start: Status -->
                <div
                  class="d_flex justify_content_center align_items_center text_center"
                >
                  <div class="user--name">{{ user.name }}</div>
                  <div
                    class="user--status ml_2"
                    :class="[user.status === true ? 'user--active' : '']"
                  >
                    <icon-base
                      icon-name="check-active"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <icon-check-active />
                    </icon-base>
                  </div>
                </div>
                <!-- End: Status -->
                <!-- Start: Email -->
                <div class="user--mail text_center">{{ user.email }}</div>
                <!-- End: Email -->
                <!-- Start: Phone -->
                <div class="user--phone mb_3 text_center">{{ user.phone }}</div>
                <!-- End: Phone -->
                <!-- Start: Avatar -->
                <div
                  class="user--avatar mt_2 mb_3 d_flex justify_content_center"
                >
                  <div
                    v-if="user.imageAvatar"
                    class="avatar--content avatar--img position_relative d_block"
                    :style="{
                      backgroundImage: 'url(' + user.imageAvatar + ')'
                    }"
                    @click="openPopupInfo(user._id)"
                  ></div>
                  <div
                    v-else
                    class="avatar--content avatar--default position_relative d_block"
                    @click="openPopupInfo(user._id)"
                  >
                    <span class="position_absolute">{{
                      user.name | getFirstLetter
                    }}</span>
                  </div>
                </div>
                <!-- End: Avatar -->
                <!-- Start: ExpireDate & Limited Accounts -->
                <div
                  class="d_flex justify_content_between align_items_center data--wrap"
                >
                  <div class="user--data">
                    <div class="user--data-desc">Ngày hết hạn</div>
                    <div class="user--data-number mt_1 mb_1">
                      {{ user.expireDate | formatDate }}
                    </div>
                  </div>
                  <div class="user--data">
                    <div class="user--data-desc">Giới hạn</div>
                    <div class="user--data-number mt_1 mb_1">
                      {{ user.maxAccountFb }} tài khoản
                    </div>
                  </div>
                </div>
                <!-- End: ExpireDate & Limited Accounts -->
                <!-- Start: Edit Btn -->
                <div class="user--edit text_center">
                  <div class="btn--edit" @click="openPopupEdit(user._id)">
                    <span class="mr_2">Chỉnh sửa</span>
                    <icon-base
                      icon-name="edit"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                    >
                      <icon-edit />
                    </icon-base>
                  </div>
                </div>
                <!-- End: Edit Btn -->
              </div>
            </div>
          </div>
          <!-- Start: User Data -->
          <!-- Start: Empty Data -->
          <div class="data--empty text_center pt_4" v-else>
            Không có dữ liệu.
          </div>
          <!-- End: Empty Data -->
        </div>
      </div>
      <!-- End: Grid Content -->
    </div>

    <!-- ************** POPUP ************** -->
    <transition name="popup">
      <edit-popup
        v-if="showEdit === true"
        @closeAddEdit="showEdit = $event"
      ></edit-popup>
    </transition>
    <transition name="popup">
      <info-popup
        v-if="showInfo === true"
        @closeAddInfo="showInfo = $event"
        @openAddEdit="showEdit = $event"
        @userSelectEdit="userSelectEdit = $event"
      ></info-popup>
    </transition>
    <transition name="popup">
      <delete-popup
        v-if="showDeleteDialog === true && selected.length > 0"
        :selectedUIDs="selected"
        @closeDialog="showDeleteDialog = $event"
      ></delete-popup>
    </transition>
    <transition name="fade">
      <div
        v-if="showInfo === true || showEdit === true"
        class="backdrop position_fixed"
      ></div>
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
