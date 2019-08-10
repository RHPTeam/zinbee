<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content" v-click-outside="close">
        <!-- Start: Modal Body -->
        <VuePerfectScrollbar class="wrap">
          <div class="body mb_2 px_4 py_3">
            <div v-if="!domainInfo"></div>
            <form v-else>
              <div class="form_group">
                <label>Tên Domain</label>
                <input
                  type="text"
                  placeholder="Nhập tên domain ..."
                  class="form_control"
                  v-model="domainInfo.title"
                />
              </div>

              <div class="info">
                <div class="title py_2">Thông tin cấu hình</div>

                <div class="d_flex align_items_center justify_content_between">
                  <div class="square form_group">
                    <label>Thông tin Domain Server</label>
                    <input
                      type="text"
                      placeholder="Nhập thông tin domain ..."
                      class="form_control"
                      v-model="domainInfo.info.domainServer"
                    />
                  </div>

                  <div class="square form_group">
                    <label>Thông tin IP</label>
                    <input
                      type="text"
                      placeholder="Nhập thông tin ip ..."
                      class="form_control"
                      v-model="domainInfo.info.ip"
                    />
                  </div>
                </div>

                <div class="d_flex align_items_center justify_content_between">
                  <div class="form_group">
                    <label>Thông tin Domain Client Request</label>
                    <input
                      type="text"
                      placeholder="Nhập thông tin domain ..."
                      class="form_control"
                      v-model="domainInfo.info.domain"
                    />
                  </div>
                </div>

                <div class="d_flex align_items_center justify_content_between">
                  <div class="square form_group">
                    <label>Local Port</label>
                    <input
                      type="text"
                      placeholder="Nhập thông tin local ..."
                      class="form_control"
                      v-model="domainInfo.info.clientPort"
                    />
                  </div>

                  <div class="square form_group">
                    <label>Server Port</label>
                    <input
                      type="text"
                      placeholder="Nhập thông tin server ..."
                      class="form_control"
                      v-model="domainInfo.info.serverPort"
                    />
                  </div>
                </div>

                <div class="d_flex align_items_center justify_content_between">
                  <div class="square form_group">
                    <label>Thông tin CPU</label>
                    <input
                      type="text"
                      placeholder="Nhập thông tin cpu ..."
                      class="form_control"
                      v-model="domainInfo.info.cpu"
                    />
                  </div>

                  <div class="square form_group">
                    <label>Thông tin RAM</label>
                    <input
                      type="text"
                      placeholder="Nhập thông tin ram ..."
                      class="form_control"
                      v-model="domainInfo.info.ram"
                    />
                  </div>
                </div>

                <div class="d_flex align_items_center justify_content_between">
                  <div class="square form_group">
                    <label>Thông tin Card</label>
                    <input
                      type="text"
                      placeholder="Nhập thông tin card ..."
                      class="form_control"
                      v-model="domainInfo.info.card"
                    />
                  </div>

                  <div class="square form_group">
                    <div class="title">Hết hạn</div>
                    <date-picker
                      class="mt_2"
                      v-model="domainInfo.info.expire"
                    />
                  </div>
                </div>

                <div class="d_flex align_items_center justify_content_between">
                  <div class="square form_group">
                    <label>Thông tin nhà cung cấp</label>
                    <input
                      type="text"
                      placeholder="Nhập tên nhà cung cấp ..."
                      class="form_control"
                      v-model="domainInfo.info.supplier.name"
                    />
                  </div>

                  <div class="square form_group">
                    <label></label>
                    <input
                      type="text"
                      placeholder="Thông tin website nhà cung cấp ..."
                      class="form_control"
                      v-model="domainInfo.info.supplier.url"
                    />
                  </div>
                </div>
              </div>

              <div class="form_group">
                <label>Cụm máy chủ</label>
                <select class="form_control" v-model="domainInfo.region">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>

              <div
                class="form_group"
                v-if="domainInfo.userAmount && domainInfo.userAmount.length > 0"
              >
                <label
                  >Số lượng người dùng hiện tại :
                  {{ domainInfo.userAmount.length }}</label
                >
              </div>
              <div v-else></div>

              <div class="form_group">
                <label>Số lượng người dùng lớn nhất</label>
                <input
                  type="text"
                  placeholder="Nhập số lượng người dùng max ..."
                  class="form_control"
                  v-model="domainInfo.amountMax"
                />
              </div>

              <div class="form_group">
                <label>Trạng thái hoạt động</label>
                <select class="form_control" v-model="domainInfo.status">
                  <option>true</option>
                  <option>false</option>
                </select>
              </div>
            </form>
            <div class="form_group">
              <button
                v-if="status === false"
                class="form_control"
                @click="createNewDomain"
              >
                Tạo mới
              </button>
              <button
                v-if="status === true"
                class="form_control"
                @click="updateDomain"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </VuePerfectScrollbar>
        <!-- End: Modal Body -->
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    currentTheme: String,
    status: Boolean
  },
  data() {
    return {};
  },
  computed: {
    domainInfo() {
      return this.$store.getters.domainInfo;
    }
  },
  methods: {
    close() {
      this.$emit("closePopUpAddNewDomain", false);
    },
    createNewDomain() {
      this.$store.dispatch("createNewDomain", this.domainInfo);
      this.close();
    },
    updateDomain() {
      this.$store.dispatch("updateDomain", this.domainInfo);
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
