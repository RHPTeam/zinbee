<template>
  <div class="modal--wrapper">
    <div class="modal--dialog">
      <div class="modal--content py_3">
        <!-- Start: Header -->
        <div class="modal--header text_center">
          Tạo mã kích hoạt
        </div>
        <!-- End: Header -->
        <!-- Start: body -->
        <div class="modal--body py_4 px_3">
          <div class="items months mb_3 d_flex align_items_center">
            <div>Months</div>
            <div class="ml_auto">
              <input
                type="text"
                placeholder="Month"
                v-model="code.typeExpire"
              />
            </div>
          </div>
          <div class="items months mb_3 d_flex align_items_center">
            <div>Expire Day</div>
            <div class="ml_auto">
              <datepicker
                class="date--input"
                placeholder="Chọn ngày hết hạn"
                role="date"
                format="DD/MM/YYYY"
                v-model="code.expireDate"
              ></datepicker>
            </div>
          </div>
          <div class="items months mb_3 d_flex align_items_center">
            <div>Max User</div>
            <div class="ml_auto text_center">
              <input type="number" min="0" v-model="code.maxUser" />
            </div>
          </div>
        </div>
        <!-- End: body -->
        <!-- Start: footer -->
        <div class="modal--footer d_flex align_items_center px_3">
          <div class="left mr_auto" @click="closePopup">HỦY</div>
          <div class="right ml_auto" @click="createCode">TẠO</div>
        </div>
        <!-- End: footer -->
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "@/components/datepicker";
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      code: {
        expireDate: "",
        typeExpire: 1,
        maxUser: 2
      }
    };
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    createCode() {
      this.$store.dispatch("createCode", this.code);
      this.closePopup();
    }
  }
};
</script>
<style lang="scss" scoped>
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  bottom: 0;
  font-family: "Open Sans", sans-serif;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  .modal--dialog {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
  .modal--header {
    font-size: 1.5rem;
  }
  .modal--content {
    background-color: #2f3236;
    border-radius: 0.625rem;
    max-height: calc(100vh - 10%);
    width: 50%;
    color: #ccc;
    input {
      text-align: center;
      border-radius: 0.625rem;
      border: 0;
      background-color: #27292d;
      font-size: 0.95rem;
      outline: none;
      padding: 10px;
      transition: all 0.4s ease;
      width: 210px;
      color: #ccc;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    input[type="number"] {
      -moz-appearance: textfield; /* Firefox */
    }
  }
  .modal--footer {
    color: #fff;
    .right {
      padding: 0.5rem 1.5rem;
      background-color: #ffb94a;
      border-radius: 0.625rem;
      border: 1px solid #ffb94a;
      transition: all 0.4s ease;
      cursor: pointer;
      &:hover {
        background-color: #ff9e4a;
      }
    }
    .left {
      padding: 0.5rem 1.5rem;
      background-color: #2f3136;
      border-radius: 0.625rem;
      border: 1px solid #e4e4e4;
      cursor: pointer;
    }
  }
}
</style>
