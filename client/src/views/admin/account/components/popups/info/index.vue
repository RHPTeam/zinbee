<template>
  <div
    class="modal--wrapper position_fixed d_flex justify_content_center align_items_center"
  >
    <div class="modal--content" v-click-outside="closeAddInfo">
      <div v-if="user">
        <div
          class="modal--header pl_4 pr_4 pt_3 pb_3 d_flex justify_content_between align_items_center"
        >
          <div class="user d_flex justify_content_start align_items_center">
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
              <div class="d_flex justify_content_start align_items_center">
                <div class="user--info-name">{{ user.name }}</div>
                <div class="user--info-status ml_2">
                  <icon-base
                    icon-name="check-active"
                    class="mr_2"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <icon-check-active />
                  </icon-base>
                </div>
              </div>
              <div class="user--info-time">
                Ngày hết hạn: {{ user.expireDate | formatDate }}
              </div>
              <div class="user--info-time">
                Mã kích hoạt: {{ user.presenter }}
              </div>
            </div>
          </div>
          <div class="d_flex justify_content_end align_items_center">
            <div class="icon--edit mr_4" @click="openAddEdit">
              <icon-base
                icon-name="edit-info"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <icon-edit-info />
              </icon-base>
            </div>
            <div class="icon--close" @click="closeAddInfo">
              <icon-base
                icon-name="close"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <icon-close />
              </icon-base>
            </div>
          </div>
        </div>
        <div class="modal--body pt_3 pb_5 pl_4 pr_4">
          <div class="info--detail">
            <div class="info--desc">Chi tiết</div>
            <div class="ml_3">
              <div class="info--mail mt_4">
                <span class="mr_4">
                  <icon-base
                    icon-name="mail"
                    class="mr_2"
                    width="20"
                    height="14.286"
                    viewBox="0 0 20 14.286"
                  >
                    <icon-mail />
                  </icon-base>
                </span>
                {{ user.email }}
              </div>
              <div class="info--phone mt_4">
                <span class="mr_4">
                  <icon-base
                    icon-name="phone-info"
                    class="mr_2"
                    width="20"
                    height="19.987"
                    viewBox="0 0 20 19.987"
                  >
                    <icon-phone-info />
                  </icon-base>
                </span>
                {{ user.phone }}
              </div>
              <div class="info--rule mt_4">
                <span class="mr_4">
                  <icon-base
                    icon-name="role"
                    class="mr_2"
                    width="16.667"
                    height="20"
                    viewBox="0 0 16.667 20"
                  >
                    <icon-role />
                  </icon-base>
                </span>
                {{ user._role.level }}
              </div>
              <div class="info--history mt_4">
                Đã thêm 1/{{ user.maxAccountFb }} tài
                khoản Facebook
              </div>
<!--              {{ user._accountfb.length }}-->
            </div>
          </div>
        </div>
      </div>
      <div v-else>Không có dữ liệu để hiển thị</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  filters: {
    formatDate(d) {
      const newDate = new Date(d),
        year = newDate.getFullYear(),
        month = String(newDate.getMonth() + 1).padStart(2, 0),
        date = String(newDate.getDate()).padStart(2, 0);

      return `${date}/${month}/${year}`;
    },
    getFirstLetter(string) {
      return string.charAt(0).toUpperCase();
    }
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    closeAddInfo() {
      this.$emit("closeAddInfo", false);
    },
    openAddEdit() {
      this.closeAddInfo();
      this.$emit("openAddEdit", true);
      this.$emit("userSelectEdit", this.user);
    }
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
