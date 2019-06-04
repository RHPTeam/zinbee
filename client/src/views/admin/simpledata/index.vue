<template>
  <div class="simple">
    <div class="group">
      <div class="btn--all mr_3 mb_2">
        Xem tất cả
      </div>
      <div class="group--item mr_2 mb_2">
        <div>
          <icon-base
            class="icon--add mr_2"
            icon-name="plus"
            width="20"
            height="20"
            viewBox="0 0 481 481"
          >
            <icon-folder />
          </icon-base>
          <contenteditable
            class="editable"
            tag="div"
            placeholder="Nhập tên..."
            :contenteditable="true"
          />
        </div>
        <div class="btn--delete">
          <icon-base
            class="icon--add mr_1"
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 26 26"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>

      <div class="group--item btn--add mb_2">
        <icon-base
          class="icon--add mr_2"
          icon-name="plus"
          width="14"
          height="14"
          viewBox="0 0 60 60"
        >
          <icon-plus />
        </icon-base>
        Tạo nhóm mới
      </div>

      <!--*********** POPUP *************-->
      <!--      <transition name="popup">-->
      <!--        <create-group-popup-->
      <!--          v-if="isShowCreateGroup === true"-->
      <!--          :data-theme="currentTheme"-->
      <!--          @closePopup="isShowCreateGroup = $event"-->
      <!--        ></create-group-popup>-->
      <!--        <delete-group-popup-->
      <!--          v-if="isShowDeletePopup === true"-->
      <!--          :data-theme="currentTheme"-->
      <!--          title="Xoá nhóm"-->
      <!--          @closePopup="isShowDeletePopup = $event"-->
      <!--          storeActionName="deletePostGroup"-->
      <!--          :targetData="{ id: groupDelete._id }"-->
      <!--          :targetName="groupDelete.title"-->
      <!--          typeName="nhóm"-->
      <!--        ></delete-group-popup>-->
      <!--      </transition>-->
    </div>
    <div class="body"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
