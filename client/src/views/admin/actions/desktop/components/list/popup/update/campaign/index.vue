<template>
  <div class="modal--wrapper">
    <div class="modal--dialog">
      <div class="modal--content position_relative">
        <VuePerfectScrollbar class="scroll--event">
          <!-- Start: Header -->
          <div class="px_3 items--header mt_3 text_center">
            <div class="title">Cập nhật sự kiện <b>Event 1</b></div>
          </div>
          <!-- Start: Header -->
          <!-- Start: Body -->
          <div class="p_3 items--body">
            <div class="time mb_3">
              <p class="mb_0">Bắt đầu: <b>10:00</b> ngày <b>01/01/2018</b></p>
              <p>Thời gian chờ giữa các lần đăng: <b>5</b> phút</p>
            </div>
            <div class="post mb_3">
              Bài đăng:
              <div class="item pl_3">
                <p class="mb_0">Danh mục: <b>Danh mục 1</b></p>
                <p class="mb_0">
                  Kho nội dung:
                  <span>
                    <b>Post 1</b>,
                    <b>Post 2</b>
                  </span>
                </p>
              </div>
            </div>
            <div class="content--advance mb_3">
              Nội dung nâng cao:
              <div class="item pl_3">
                <p class="mb_0">Mở bài: <b>Aha</b></p>
                <p class="mb_0">Kết bài: <b>Ah1</b></p>
              </div>
            </div>
            <div class="active">
              <div class="item d_flex align_items_center">
                <div class="mr_auto">Hoạt động:</div>
                <div
                  class="ml_auto detail"
                  @click="isShowDetail = !isShowDetail"
                >
                  Chi tiết
                </div>
              </div>
              <div class="content--active" v-show="isShowDetail === true">
                <div class="item d_flex align_items_center">
                  <div class="time">10:00</div>
                  <div class="dots mx_2"></div>
                  <div>Đăng tới: TCN</div>
                </div>
                <div class="item d_flex align_items_center">
                  <div class="time">10:05</div>
                  <div class="dots mx_2"></div>
                  <div>Đăng tới: Page 1</div>
                </div>
                <div class="item d_flex align_items_center">
                  <div class="time">10:10</div>
                  <div class="dots mx_2"></div>
                  <div>Đăng tới: Page 2</div>
                </div>
              </div>
            </div>
          </div>
          <!-- End: Body -->
          <!-- Start: Footer -->
          <div
            class="items--footer d_flex align_items_center"
            @click="closePopup"
          >
            <icon-base
              icon-name="đóng"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <icon-close />
            </icon-base>
          </div>
          <!-- End: Footer -->
        </VuePerfectScrollbar>
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
    return {
      isShowDetail: false
    };
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  }
};
</script>

<style scoped lang="scss">
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

    .modal--content {
      background-color: #2f3236;
      border-radius: 0.625rem;
      max-height: calc(100vh - 10%);
      width: 60vw;
      color: #fff;
    }
    .items--header {
      font-size: 1rem;
    }
    .items--body {
      .detail {
        padding: 0.35rem 0.625rem;
        border: 1px solid #444;
        border-radius: 0.625rem;
        cursor: pointer;
        transition: 0.4s all ease;
        &:hover {
          border-color: #ccc;
        }
      }
      .dots {
        height: 5px;
        width: 5px;
        background: #ccc;
        border-radius: 50%;
      }
    }
    .items--footer {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
    }
  }
  .scroll--event {
    max-height: 80vh;
  }
}
</style>
