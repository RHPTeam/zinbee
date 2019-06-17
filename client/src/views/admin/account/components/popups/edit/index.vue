<template>
  <div
    class="modal--wrapper position_fixed d_flex justify_content_center align_items_center"
  >
    <div class="modal--content" v-click-outside="closeAddEdit">
      <div class="modal--header pl_4 pr_4 pt_3 pb_3">Cấu hình tài khoản</div>
      <div class="modal--body pt_3 pb_0 pl_4 pr_4" v-if="user">
        <!-- Start: User General Info -->
        <div class="user d_flex justify_content_start align_items_center mb_4">
          <div class="user--avatar mr_4">
            <div
              v-if="user.imageAvatar"
              class="avatar--content avatar--img position_relative d_block"
              :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
            ></div>
            <div
              v-else
              class="avatar--content avatar--default position_relative d_block"
            >
              <span class="position_absolute">{{
                user.name | getFirstLetter
              }}</span>
            </div>
          </div>
          <div class="user--info">
            <div class="user--info-name mb_2">{{ user.name }}</div>
            <div class="user--info-mail">{{ user.email }}</div>
          </div>
        </div>
        <!-- End: User General Info -->
        <!-- Start: User Edit -->
        <div class="edit">
          <!-- Start: Expire Date -->
          <div
            v-if="user.expireDate === undefined || user.expireDate === ''"
          ></div>
          <div
            v-else
            class="edit--time d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="Ngày hết hạn"
                class="mr_3"
                width="15.333"
                height="20"
                viewBox="0 0 15.333 20"
              >
                <icon-hourglass /> </icon-base
              >Ngày hết hạn:
            </div>
            <div class="">
              <datepicker
                class="date--input"
                placeholder="Chọn ngày gia hạn"
                role="date"
                format="DD/MM/YYYY"
                :default-value="new Date(user.expireDate)"
                v-model="user.expireDate"
                @change="changeDateSetup"
              ></datepicker>
            </div>
          </div>
          <!-- End: Expire Date -->
          <!-- Start: Status -->
          <div
            class="edit--status d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="Kích hoạt"
                class="mr_3"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active /> </icon-base
              >Kích hoạt:
            </div>
            <div class="status--radio">
              <input
                id="check-active"
                class="radio"
                type="checkbox"
                :checked="user.status"
                @change="updateStatus"
              />
              <label for="check-active"></label>
            </div>
          </div>
          <!-- End: Status -->
          <!-- Start: Accounts Qty -->
          <div
            class="edit--account d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="Số lượng"
                class="mr_3"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-infinity /> </icon-base
              >Số lượng tài khoản giới hạn:
            </div>
            <div class="account--input">
              <input type="number" v-model="user.maxAccountFb" size="10" />
            </div>
          </div>
          <!-- End: Accounts Qty -->
          <!-- Start: Account Type -->
          <div
            class="edit--type d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="Loại"
                class="mr_3"
                width="16.667"
                height="20"
                viewBox="0 0 16.667 20"
              >
                <icon-role /> </icon-base
              >Loại tài khoản:
            </div>
            <div class="type--select-level">
              {{ user._role.level }}
            </div>
          </div>
          <!-- End: Account Type -->
        </div>
        <!-- End: User Edit -->
      </div>
      <div v-else>Không có dữ liệu nhé mày</div>
      <div
        class="modal--footer d_flex justify_content_end align_items_center pl_4 pr_4 pb_4 pt_2"
      >
        <button class="btn-cancel" @click="closeAddEdit">Hủy</button>
        <button class="btn-done ml_4" @click="closeAddEdit">Xong</button>
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
