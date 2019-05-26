<template>
  <div class="server position_relative" :data-theme="currentTheme">
    <div class="desc py_3 px_2">
      <span>Quản lý hệ thống server :</span> Thông tin về domain cho 3 miền.
    </div>
    <div class="action py_2 px_2">
      <button class="btn btn_info" @click="openCreateNewDomain">Tạo mới</button>
    </div>
    <div class="body mt_2">
      <div class="content--body">
        <div class="table-container" role="table" aria-label="Destinations">
          <div class="flex-table header" role="rowgroup">
            <div class="flex-row first" role="columnheader">Tên</div>
            <div class="flex-row" role="columnheader">Cụm</div>
            <div class="flex-row" role="columnheader">Số lượng max</div>
            <div class="flex-row" role="columnheader">Số lượng hiện tại</div>
            <div class="flex-row" role="columnheader">Hành động</div>
          </div>
          <div v-if="!domain"></div>
          <div v-else>
            <item-domain
              :item="item"
              v-for="(item, index) in domain"
              :key="index"
              @openPopupUpdate="isShowAddDomain = $event"
              @changeStatus="statusDefault = $event"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Start : add new domain -->
    <add-domain
      v-if="isShowAddDomain === true"
      :currentTheme="currentTheme"
      :status="statusDefault"
      @closePopUpAddNewDomain="isShowAddDomain = $event"
    />
    <!-- End : add new domain -->
  </div>
</template>

<script>
import AddDomain from "./action";
import ItemDomain from "./item";
export default {
  components: {
    AddDomain,
    ItemDomain
  },
  data() {
    return {
      isShowAddDomain: false,
      statusDefault: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    domain() {
      return this.$store.getters.allDomain;
    }
  },
  async created() {
    await this.$store.dispatch("getAllDomain");
  },
  methods: {
    openCreateNewDomain() {
      this.$store.dispatch("setDomainDefault");
      this.isShowAddDomain = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
