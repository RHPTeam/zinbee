<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title">{{ title }}</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc" v-if="multiple === false">
            Toàn bộ dữ liệu liên quan đến {{ typeName }}
            <span class="text--bold">{{ targetName }}</span> sẽ bị xóa hoàn toàn.
            <span v-if="description !== '' ">{{ description }}</span>
            Để tiếp tục, nhập
            <span class="text--delete">DELETE</span> vào ô bên dưới.
          </div>
          <input
            class="modal--body-input mt_3"
            placeholder="DELETE"
            type="text"
            v-model="deleteText"
          />
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--submit"
            @click="closePopup()"
          >HỦY</button>
          <button
            class="btn--skip"
            v-if="deleteConfirm"
            @click="deleteTargets()"
          >XÓA</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    },
    storeActionName: {
      type: String,
      default: ""
    },
    targetData: {
      type: Object
    },
    targetName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    typeName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      deleteConfirm: false,
      deleteText: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    deleteText() {
      this.deleteConfirm = this.deleteText === "DELETE";
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    deleteTargets() {
      this.$store.dispatch( this.storeActionName, this.targetData );

      this.$emit( "closePopup", false );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style";
@import "./index.style";
</style>

