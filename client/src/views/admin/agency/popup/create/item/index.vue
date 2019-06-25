<template>
  <div>
    <div v-if="!item"></div>
    <div v-else class="flex-table row" role="rowgroup">
      <div class="flex-row first" role="cell">
        {{ item.title }}
      </div>
      <div class="flex-row content" role="cell">
        <div class="item--content" v-html="item.content.slice(0, 38)"></div>
      </div>
      <div class="flex-row action" role="cell">
        <label class="custom--checkbox">
          <input
            type="checkbox"
            :value="item._id"
            @click="pushContentToCategory(item._id)"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    infoCateDefault: Array
  },
  methods: {
    pushContentToCategory(val) {
      this.$emit("pushPostToCampaign", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
.item--content {
  width: 100%;
}
</style>
