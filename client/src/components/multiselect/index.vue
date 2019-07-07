<template>
  <div :dir="dir" class="v-select" :class="stateClasses">
    <div
      ref="toggle"
      @mousedown.prevent="toggleDropdown"
      class="vs__dropdown-toggle"
    >
      <div class="vs__selected-options" ref="selectedOptions">
        <slot
          v-for="option in selectedValue"
          name="selected-option-container"
          :option="normalizeOptionForSlot(option)"
          :deselect="deselect"
          :multiple="multiple"
          :disabled="disabled"
        >
          <span class="vs__selected" v-bind:key="option.old">
            <slot
              name="selected-option"
              v-bind="normalizeOptionForSlot(option)"
              >{{ getOptionLabel(option) }}</slot
            >
            <button
              v-if="multiple"
              :disabled="disabled"
              @click="deselect(option)"
              type="button"
              class="vs__deselect"
              aria-label="Deselect option"
            >
              <deselect />
            </button>
          </span>
        </slot>

        <slot name="search" v-bind="scope.search">
          <input
            class="vs__search"
            v-bind="scope.search.attributes"
            v-on="scope.search.events"
          />
        </slot>
      </div>

      <div class="vs__actions">
        <button
          v-show="showClearButton"
          :disabled="disabled"
          @click="clearSelection"
          type="button"
          class="vs__clear"
          title="Clear selection"
        >
          <deselect />
        </button>

        <open-indicator
          v-if="!noDrop"
          ref="openIndicator"
          role="presentation"
          class="vs__open-indicator"
        ></open-indicator>

        <slot name="spinner" v-bind="scope.spinner">
          <div class="vs__spinner" v-show="mutableLoading">Loading...</div>
        </slot>
      </div>
    </div>

    <transition :name="transition">
      <ul
        ref="dropdownMenu"
        v-if="dropdownOpen"
        class="vs__dropdown-menu"
        role="listbox"
        @mousedown="onMousedown"
        @mouseup="onMouseUp"
      >
        <li
          role="option"
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="vs__dropdown-option"
          :class="{
            'vs__dropdown-option--selected': isOptionSelected(option),
            'vs__dropdown-option--highlight': index === typeAheadPointer
          }"
          @mouseover="typeAheadPointer = index"
          @mousedown.prevent.stop="select(option)"
        >
          <slot name="option" v-bind="normalizeOptionForSlot(option)">{{
            getOptionLabel(option)
          }}</slot>
        </li>
        <li
          v-if="!filteredOptions.length"
          class="vs__no-options"
          @mousedown.stop
        >
          <slot name="no-options">Không có kết quả.</slot>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss">
@import "./styles/index";
</style>
