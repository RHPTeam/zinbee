<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3">
        <!-- Start: Modal Body -->
        <div class="body">
          <div class="name mt_2">
            <div class="font_weight_bold">Chọn đại lý</div>
            <div class="agency--select">
              <multiselect
                label="name"
                v-model="agency._account"
                :options="users"
                @input="selectAgency"
              />
            </div>
          </div>

          <div
            class="time d_flex align_items_center justify_content_between mt_2"
          >
            <div class="left">
              <div class="font_weight_bold">Thời gian bắt đầu</div>
              <div class="mt_1">
                <date-picker
                  role="date"
                  format="DD/MM/YYYY"
                  :default-value="timeDefault"
                  v-model="agency.expire.start"
                  @change="changeDateStartAgency"
                ></date-picker>
              </div>
            </div>
            <div class="right">
              <div class="font_weight_bold">Thời gian hết hạn</div>
              <div class="mt_1">
                <date-picker
                  role="date"
                  format="DD/MM/YYYY"
                  :default-value="new Date(agency.expire.end)"
                  v-model="agency.expire.end"
                  @change="changeDateEndAgency"
                ></date-picker>
              </div>
            </div>
          </div>

          <div
            class="time d_flex align_items_center justify_content_between mt_2"
          >
            <div class="left">
              <div class="font_weight_bold mb_1">Thời gian đã sử dụng</div>
              <input
                readonly
                type="number"
                class="form_control"
                placeholder="Thời thời đã sử dụng"
                v-model="agency.expire.usedTime"
              />
            </div>
            <div class="right">
              <div class="font_weight_bold mb_1">Thời gian còn lại</div>
              <input
                readonly
                type="number"
                class="form_control"
                placeholder="Thời thời còn lại"
                v-model="agency.expire.leftTime"
              />
            </div>
          </div>

          <div
            class="other d_flex align_items_center justify_content_between mt_2"
          >
            <div class="left">
              <div class="font_weight_bold mb_1">Trạng thái</div>
              <div class="status--radio">
                <input
                  id="check-active"
                  class="radio"
                  type="checkbox"
                  :checked="agency.status"
                  @change="updateStatus"
                />
                <label for="check-active"></label>
              </div>
            </div>
            <div class="right">
              <div class="font_weight_bold">Gói tài khoản</div>
              <div class="agency--select">
                <multiselect
                  label="title"
                  v-model="agency._package"
                  :options="packages"
                  @input="selectPackage"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <div class="ml_auto d_flex">
            <button class="btn bg_danger mr_2" @click="close">
              Hủy bỏ
            </button>
            <button
              class="btn bg_primary"
              v-if="this.$store.getters.variableControlAgency === 0"
              @click="createNewAgency"
            >
              Tạo mới
            </button>
            <button
              class="btn bg_primary"
              v-if="this.$store.getters.variableControlAgency === 1"
              @click="updateAgency"
            >
              Cập nhật
            </button>
          </div>
        </div>
        <!-- End: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "../index.style";
</style>
