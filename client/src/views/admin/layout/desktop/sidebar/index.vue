<template>
  <div
    class="sidebar text_left"
    :data-theme="currentTheme"
    :class="{ collapseMenu: collapseMenu }"
  >
    <div class="sidebar--logo d_inline_block text_center">
      <router-link to="/">
        <div class="sidebar--logo-icon">
          <icon-base
            icon-name="logo"
            width="132.92"
            height="49.73"
            viewBox="0 0 250.446 93.703"
          >
            <icon-logo />
          </icon-base>
        </div>
      </router-link>
    </div>
    <ul class="sidebar--menu">
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        active-class="active"
        exact
        v-for="(menu, index) in menus"
        :key="index"
        :to="{ name: menu.to }"
      >
        <a href="#">
          <icon-base
            :icon-name="menu.icon.iconName"
            :width="menu.icon.width"
            :height="menu.icon.height"
            :viewBox="menu.icon.viewBox"
          >
            <component :is="menu.icon.tagName" />
          </icon-base>
          <span class="ml_2">{{ menu.text }}</span>
        </a>
      </router-link>
    </ul>
  </div>
</template>

<script src="./index.script"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
