<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title text_left">Kích hoạt tài khoản</div>
        </div>
        <div class="modal--body my_3">
          <div class="alert alert_danger" v-if="activeAccountError !== ''">
            {{ activeAccountError }}
          </div>
          <div class="desc">
            Kích hoạt tài khoản nâng cao bằng mã kích hoạt. Vui lòng nhập đúng
            mã kích hoạt và thời gian gia hạn cho các tài khoản cần kích hoạt
          </div>
          <div class="content mt_3">
            <div class="form_group">
              <label><b>Áp dụng với mã kích hoạt:</b></label>
              <input
                class="modal--body-input"
                placeholder="Nhập mã kích hoạt"
                type="text"
                v-model="user.presenter"
              />
            </div>
            <div class="form_group">
              <label><b>Ngày gia hạn:</b></label>
              <div>
                <date-picker
                  class="date--input"
                  placeholder="Chọn ngày gia hạn"
                  role="date"
                  format="DD/MM/YYYY"
                  v-model="user.expireDate"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--skip" @click="closePopup()">HỦY</button>
          <button class="btn--submit" @click="activeAccount()">
            KÍCH HOẠT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        presenter: "",
        expireDate: new Date()
      }
    };
  },
  computed: {
    activeAccountError() {
      return this.$store.getters.activeAccountError;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async activeAccount() {
      await this.$store.dispatch("activeAccount", this.user);

      if (this.activeAccountError === "") {
        this.$emit("close", false);
        this.$emit("updateStatusFilter", "Tất cả");
      }
    },
    closePopup() {
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
