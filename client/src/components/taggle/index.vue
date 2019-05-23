<template>
  <div
    @click="focusNewTag()"
    :class="{
      'read-only': readOnly,
      'vue-input-tag-wrapper--active': isInputActive,
    }"
    class="vue-input-tag-wrapper"
  >
    <span v-for="(tag, index) in innerTags" :key="index" class="input-tag">
      <span>{{ tag }}</span>
      <a v-if="!readOnly" @click.prevent.stop="remove(index)" class="remove">
        <slot name="remove-icon"/>
      </a>
    </span>
    <input
      v-if="!readOnly && !isLimit"
      ref="inputtag"
      :placeholder="placeholder"
      type="text"
      v-model="newTag"
      v-on:keydown.delete.stop="removeLastTag"
      v-on:keydown="addNew"
      v-on:blur="handleInputBlur"
      v-on:focus="handleInputFocus"
      class="new-tag"
    >
  </div>
</template>

<script src="./main.js"></script>

<style>
.vue-input-tag-wrapper {
  background-color: #fff;
  border: 1px solid #ccc;
  overflow: hidden;
  padding-left: 4px;
  padding-top: 4px;
  cursor: text;
  text-align: left;
  -webkit-appearance: textfield;
  display: flex;
  flex-wrap: wrap;
}
.vue-input-tag-wrapper .input-tag {
  background-color: #cde69c;
  border-radius: 2px;
  border: 1px solid #a5d24a;
  color: #638421;
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 4px;
  margin-right: 4px;
  padding: 3px;
}
.vue-input-tag-wrapper .input-tag .remove {
  cursor: pointer;
  font-weight: bold;
  color: #638421;
}
.vue-input-tag-wrapper .input-tag .remove:hover {
  text-decoration: none;
}
.vue-input-tag-wrapper .input-tag .remove:empty::before {
  content: " x";
}
.vue-input-tag-wrapper .new-tag {
  background: transparent;
  border: 0;
  color: #777;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 6px;
  margin-top: 1px;
  outline: none;
  padding: 4px;
  padding-left: 0;
  flex-grow: 1;
}
.vue-input-tag-wrapper.read-only {
  cursor: default;
}
</style>
