<template>
  <div class="rc--card-hover"
       :style="{
        top: topVal + 'px',
        left: leftVal + 'px',
        right: rightVal + 'px'
      }"
  >
    <div class="card--hover-item card--hover--title">
      <div class="item--left">
        <div class="card--hover-icon icon--event-color"
            :style="{ backgroundColor: eventData.color }"
        ></div>
      </div>
      <div class="item--right">
        <div class="title--content">{{ eventData.title  }}</div>
        <div class="start--time">{{ formatDateTime( eventData.started_at ) }}</div>
      </div>
    </div>
    <div v-if="eventData.type_event === 1">
      <div class="card--hover-item">
        <div class="item--left">
          <div class="card--hover-icon icon--autopost">
            <span class="icon--autopost-text">A</span>
          </div>
        </div>
        <div class="item--right">
          <div>Tự động đăng bài trên trang cá nhân vào các khung giờ vàng.</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card--hover-item">
        <div class="item--left">
          <div class="card--hover-icon icon--post">
            <icon-base
              height="20px"
              width="20px"
              viewBox="0 0 520 520"
            >
              <icon-post></icon-post>
            </icon-base>
          </div>
        </div>
        <div class="item--right">
          <div v-if="eventData.post_custom.length > 0">{{ eventData.post_custom.length }} bài viết</div>
          <div v-else>Tự động đăng bài viết từ danh mục {{ eventData.post_category.title }}</div>
        </div>
      </div>
      <div class="card--hover-item">
        <div class="item--left">
          <div class="card--hover-icon icon--page">
            <icon-base
              height="20px"
              width="22px"
              viewBox="0 0 520 520"
            >
              <icon-page></icon-page>
            </icon-base>
          </div>
        </div>
        <div class="item--right">
          <div v-if="eventData.target_custom.length > 0">{{ filterTypeTarget(1) }} trang</div>
          <div v-else>{{ eventData.target_category._pages.length }} trang</div>
        </div>
      </div>
      <div class="card--hover-item">
        <div class="item--left">
          <div class="card--hover-icon icon--group">
            <icon-base
              height="20px"
              width="20px"
              viewBox="0 0 520 520"
            >
              <icon-group></icon-group>
            </icon-base>
          </div>
        </div>
        <div class="item--right">
          <div v-if="eventData.target_custom.length > 0">{{ filterTypeTarget(0) }} nhóm</div>
          <div v-else>{{ eventData.target_category._groups.length }} nhóm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "eventData", "topVal", "leftVal", "rightVal" ],
  methods: {
    formatDateTime( d ) {
      const dateTime = new Date( d ),
            hours = String( dateTime.getHours() ).padStart( 2, "0"),
            mins = String( dateTime.getMinutes() ).padStart( 2, "0" ),
            dd = String( dateTime.getDate() ).padStart( 2, "0" ),
            mm = String( dateTime.getMonth() + 1 ).padStart( 2, "0" ),
            yyyy = dateTime.getFullYear();

      return `${hours}:${mins}, ${dd}/${mm}/${yyyy}`;
    },
    filterTypeTarget( type ) {
      let targetCustom = this.eventData.target_custom;

      return targetCustom.filter( ( item ) => {
        return item.typeTarget === type;
      } ).length;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../style";
</style>
