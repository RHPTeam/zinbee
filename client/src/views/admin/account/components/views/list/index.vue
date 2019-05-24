<template>
  <div class="wrapper">
    <div class="list">
      <div class="list--content pb_2">
        <div
          class="d_flex justify_content_start align_items_center list--title pb_2 mb_2"
        >
          <div class="list--item item--checkbox">
            <input type="checkbox" class="checkbox" v-model="selectAll" />
          </div>
          <div class="list--item item--name">Tên</div>
          <div class="list--item item--mail">Email</div>
          <div class="list--item item--time text_center">
            Điện thoại
          </div>
          <div class="list--item item--account text_center">
            Giới hạn tài khoản
          </div>
          <div class="list--item item--status text_center">Status</div>
          <div class="list--item item--action text_right"></div>
        </div>
        <div v-if="users.length > 0">
          <div
            class="d_flex justify_content_start align_items_center pt_1 pb_1 mt_2"
            v-for="user in users"
            :key="user._id"
          >
            <div class="list--item item--checkbox">
              <input
                type="checkbox"
                class="checkbox"
                v-model="selected"
                :value="user._id"
              />
            </div>
            <div class="list--item item--name" @click="openPopupInfo(user)">
              <span>{{ user.name }}</span>
            </div>
            <div class="list--item item--mail">{{ user.email }}</div>
            <div class="list--item item--time text_center">
              {{ user.phone }}
            </div>
            <div class="list--item item--account text_center">
              {{ user.maxAccountFb }}
            </div>
            <div class="list--item item--status text_center">
              <div
                class="item--status-tag"
                :class="[user.status === true ? 'enable' : '']"
              >
                <span v-if="user.status">Hoạt động</span>
                <span v-else>Đã ngừng</span>
              </div>
            </div>
            <div class="list--item item--action text_right pr_2">
              <div class="icon--edit" @click="openPopupEdit(user)">
                <icon-base
                  icon-name="edit-info"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <icon-edit-info />
                </icon-base>
              </div>
            </div>
          </div>
        </div>
        <div class="data--empty text_center py_3" v-else>
          Không có dữ liệu.
        </div>
      </div>
    </div>

    <!-- ************** POPUP ************** -->
    <transition name="popup">
      <edit-popup
        v-if="showEdit === true"
        :user="userSelectEdit"
        @closeAddEdit="showEdit = $event"
      ></edit-popup>
    </transition>
    <transition name="popup">
      <info-popup
        v-if="showInfo === true"
        :user="userSelectInfo"
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
