<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content" v-click-outside="close">
        <!-- Start: Modal Body -->
        <VuePerfectScrollbar class="wrap">
          <div class="body mb_2 px_4 py_3">
            <form action="" method="post">
              <div class="form_group">
                <label>Tên server</label>
                <input
                  type="text"
                  class="form_control"
                  placeholder="Nhập tên post server mới"
                  v-model="postServer.name"
                />
              </div>

              <div class="form_group">
                <label>Domain server áp dụng</label>
                <input
                  type="text"
                  class="form_control"
                  placeholder="Nhập tên post server mới"
                  v-model="postServer.server"
                />
              </div>

              <div class="form_group">
                <label>Trạng thái hoạt động</label>
                <select
                  class="form_control"
                  name=""
                  id=""
                  v-model="postServer.status"
                >
                  <option value="true">Hoạt động</option>
                  <option value="false">Không hoạt động</option>
                </select>
              </div>

              <div class="form_group">
                <label>Uid Server</label>
                <input
                  type="text"
                  class="form_control"
                  placeholder="Nhập uid post server"
                  v-model="postServer.uid"
                />
              </div>
            </form>

            <div class="form_group">
              <button
                v-if="variable === 0"
                class="form_control"
                @click="createPostServer"
              >
                Tạo mới
              </button>
              <button v-else class="form_control" @click="editPostServer">
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
  data() {
    return {};
  },
  computed: {
    postServer() {
      return this.$store.getters.postServer;
    },
    variable() {
      return this.$store.getters.variableAction;
    }
  },
  methods: {
    close() {
      this.$emit("closePopUp", false);
    },
    createPostServer() {
      if (this.postServer.name === "" || this.postServer.name.length === 0) {
        return;
      } else {
        this.$store.dispatch("createNewPostServer", this.postServer);
        this.close();
      }
    },
    async editPostServer() {
      if (this.postServer.name === "" || this.postServer.name.length === 0) {
        return;
      } else {
        await this.$store.dispatch("updatePostServer", this.postServer);
        await this.$store.dispatch("setVariableControlButton", 0);
        this.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
