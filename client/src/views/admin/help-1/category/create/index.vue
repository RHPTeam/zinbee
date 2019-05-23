<template>
  <div class="add--catagory card_body card mt_2" :data-theme="currentTheme">
    <div class="form_group">
      <label>Tên danh mục</label>
      <input
        type="text"
        class="px_2 py_1 ml_2 form_control"
        placeholder="Nhập tên danh mục ..."
        v-model="cateparent.name"
      />
    </div>
    <div v-if="isShowAlert === true" class="text_danger">
      Tên danh mục không được bỏ trống
    </div>
    <div class="my_2">Danh mục cha</div>
    <span class="text_danger"
      >Nếu không lựa chọn trong danh mục này thì mặc định danh mục được tạo ở
      trên là danh mục cha</span
    >
    <div class="add--chilren">
      <multiselect
        label="title"
        placeholder="Lựa chọn danh mục cha"
        @input="getParent"
        :options="getCateAdmin"
      />
    </div>
    <button class="btn btn_info mt_3" @click="createNewCateAdmin">
      Tạo mới
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowAlert: false,
      cateparent: {
        name: "",
        parent: ""
      }
    };
  },
  computed: {
    getCateAdmin() {
      return this.$store.getters.getCateAdmin;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  created() {},
  methods: {
    getParent(val) {
      this.cateparent.parent = val._id;
    },
    createNewCateAdmin() {
      if (this.cateparent.name.length > 0) {
        // this.isShowAlert = false;
        if (this.cateparent.parent === "") {
          this.$store.dispatch("NoParent", this.cateparent.name);
        } else {
          this.$store.dispatch("HaveParent", this.cateparent);
        }
        this.$router.push("/admin/help");
      } else {
        this.isShowAlert = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.add--catagory[data-theme="dark"] {
  background: #27292d;
}
</style>
