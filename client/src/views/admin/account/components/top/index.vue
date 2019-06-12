<template>
  <div
    class="top d_flex justify_content_between align_items_center mb_4"
    :data-theme="currentTheme"
  >
    <div class="top--search d_flex">
      <div class="input--wrap position_relative">
        <input
          type="text"
          placeholder="Tìm kiếm"
          v-model="search"
          @keydown.enter="searchUsers"
        />
        <div class="search--icon position_absolute">
          <icon-base
            icon-name="input-search"
            width="16.772"
            height="17.287"
            viewBox="0 0 16.772 17.287"
          >
            <icon-input-search />
          </icon-base>
        </div>
      </div>

      <div class="btn btn--active ml_3" @click="isActivePopup = true">
        Kích hoạt bằng mã
      </div>
    </div>
    <!-- <div class="d_none">{{ filteredSearch }}</div> -->
    <div class="d_flex justify_content_end align_items_center">
      <div class="top--filter">
        <div
          class="select--wrapper position_relative d_flex align_items_center"
          @click="showStatusFilter"
        >
          <div class="ic--filter mr_2">
            <icon-base
              icon-name="filter"
              width="16"
              height="16"
              viewBox="0 0 400 400"
            >
              <icon-filter />
            </icon-base>
          </div>
          <div class="selected">{{ statusFilter }}</div>
          <div
            class="options position_absolute m_0"
            v-if="isShowStatusFilter === true"
          >
            <div
              class="option"
              v-for="(item, index) in statusOptions"
              :key="index"
              @click="filterByStatus(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="top--layout">
        <div class="layout--list ml_3" @click="changeLayout">
          <div class="icon--grid" v-if="isGrid">
            <icon-base
              icon-name="grid"
              width="24"
              height="21"
              viewBox="0 0 24 21"
            >
              <icon-grid-layout />
            </icon-base>
          </div>
          <div class="icon--list" v-else>
            <icon-base
              icon-name="list"
              width="24"
              height="18.065"
              viewBox="0 0 24 18.065"
            >
              <icon-list />
            </icon-base>
          </div>
        </div>
      </div>
    </div>

    <!--Start: Active Popup-->
    <active-popup
      v-if="isActivePopup === true"
      @close="isActivePopup = $event"
    ></active-popup>
    <!--End: Active Popup-->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
