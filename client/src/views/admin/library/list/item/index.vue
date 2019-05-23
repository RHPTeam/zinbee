<template>
  <div>
    <div v-if="!item">
      <loading-component />
    </div>
    <div v-else class="flex-table row" role="rowgroup">
      <div
        v-if="item.content && item.content.length > 0"
        class="flex-row first"  role="cell"
      >
        <div v-html="item.content.slice(0,38)"></div>
      </div>
      <div v-else class="flex-row first"  role="cell">
        <div v-html="`Chưa cập nhật nội dung`"></div>
      </div>
      <div class="flex-row" role="cell">
          <div
            v-if="item.attachments && item.attachments.length > 0"
            class="d_flex align_items_center"
          >
            <div
              v-for="(img, index) in item.attachments.slice(0,5)"
              :key="index"
            >
              <div class="images">
                <img :src="img.link">
              </div>
            </div>
            <div class="images position_relative" v-if="item.attachments.length > 5">
              <div class="above d_flex align_items_center justify_content_center position_absolute"> +{{item.attachments.length - 5}} </div>
            </div>
          </div>
          <div v-else>Không có ảnh</div>
      </div>
      <div class="flex-row" role="cell"> {{ item._account.name }} </div>
      <div class="flex-row" role="cell">
        <div class="d_flex justify_content_center">
          <button class="btn btn_warning" @click="showPostLibrariesById">Sửa</button>
          <button class="btn btn_danger ml_3" @click="deletePostLibraries">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
  },
  methods: {
    showPostLibrariesById() {
      this.$store.dispatch( "getPostLibrariesById", this.item._id );
      this.$router.push( {
        name: "post_libraries_details",
        params: { id: this.item._id }
      } );
    },
    deletePostLibraries(){
      this.$store.dispatch( "deletePostLibrariesFacebook", this.item._id );
    }
  },
}
</script>



<style lang="scss" scoped>
  $table-header: #ffb94a;
  $table-header-border: #fff6f4;
  $table-border: #d9d9d9;
  $row-bg: #f5f5f5;

  .table-container {
    display: block;
    margin: auto;
    width: 100%;
    max-width: 100%;
  }

  .flex-table {
    display: flex;
    flex-flow: row wrap;
    border-left: solid 1px $table-border;
    transition: 0.5s;
    &:first-of-type {
      border-top: solid 1px $table-header-border;
      border-left: solid 1px $table-header-border;
    }
    &:first-of-type .flex-row {
      background: $table-header;
      color: white;
      border-color: $table-header-border;
    }
    &.row:nth-child(odd) .flex-row {
      background: $row-bg;
    }
    &:hover {
      background: #F5F5F5;
      transition: 500ms;
    }
    .flex-row {
      color: $blackLight !important;
      overflow: hidden;
      width: calc(100% / 4);
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0.5em 0.5em;
      border-right: solid 1px $table-border;
      border-bottom: solid 1px $table-border;
    }
  }
  .images {
    height: 50px;
    margin: 0 6px;
    width: 50px;
    img {
      border-radius: 6px;
      height: 100%;
      width: 100%;
    }
    .above {
      background-color: #cccccc;
      border-radius: 6px;
      color: #444444;
      cursor: pointer;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
