<template>
  <label :class="className">
    <input
      type="checkbox"
      class="v-switch-input"
      :name="name"
      :checked="value"
      :disabled="disabled"
      @change.stop="toggle"
    />
    <div class="v-switch-core" :style="coreStyle">
      <div class="v-switch-button" :style="buttonStyle" />
    </div>
    <template v-if="labels">
      <span class="v-switch-label v-left" :style="labelStyle" v-if="toggled">
        <slot name="checked">
          <template>{{ labelChecked }}</template>
        </slot>
      </span>
      <span class="v-switch-label v-right" :style="labelStyle" v-else>
        <slot name="unchecked">
          <template>{{ labelUnchecked }}</template>
        </slot>
      </span>
    </template>
  </label>
</template>

<script src="./main.js"></script>

<style lang="scss" scoped>
.vue-js-switch {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  user-select: none;
  font-size: 10px;
  cursor: pointer;
  .v-switch-input {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
  }
  .v-switch-label {
    position: absolute;
    top: 0;
    font-weight: 600;
    color: white;
    z-index: 1;
    &.v-left {
      left: 10px;
    }
    &.v-right {
      right: 10px;
    }
  }
  .v-switch-core {
    display: block;
    position: relative;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: border-color 0.3s, background-color 0.3s;
    user-select: none;
    .v-switch-button {
      display: block;
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      border-radius: 100%;
      background-color: #fff;
      z-index: 2;
    }
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>
