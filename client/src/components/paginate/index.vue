<template>
  <ul :class="containerClass" v-if="!noLiSurround">
    <li
      v-if="firstLastButton"
      :class="[pageClass, firstPageSelected() ? disabledClass : '']"
    >
      <a
        @click="selectFirstPage()"
        @keyup.enter="selectFirstPage()"
        :class="pageLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        v-html="firstButtonText"
      ></a>
    </li>

    <li
      v-if="!(firstPageSelected() && hidePrevNext)"
      :class="[prevClass, firstPageSelected() ? disabledClass : '']"
    >
      <a
        @click="prevPage()"
        @keyup.enter="prevPage()"
        :class="prevLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        v-html="prevText"
      ></a>
    </li>

    <li
      v-for="(page, index) in pages"
      :key="index"
      :class="[
        pageClass,
        page.selected ? activeClass : '',
        page.disabled ? disabledClass : '',
        page.breakView ? breakViewClass : ''
      ]"
    >
      <a
        v-if="page.breakView"
        :class="[pageLinkClass, breakViewLinkClass]"
        tabindex="0"
      >
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </a>
      <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{
        page.content
      }}</a>
      <a
        v-else
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
        :class="pageLinkClass"
        tabindex="0"
        >{{ page.content }}</a
      >
    </li>

    <li
      v-if="!(lastPageSelected() && hidePrevNext)"
      :class="[nextClass, lastPageSelected() ? disabledClass : '']"
    >
      <a
        @click="nextPage()"
        @keyup.enter="nextPage()"
        :class="nextLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        v-html="nextText"
      ></a>
    </li>

    <li
      v-if="firstLastButton"
      :class="[pageClass, lastPageSelected() ? disabledClass : '']"
    >
      <a
        @click="selectLastPage()"
        @keyup.enter="selectLastPage()"
        :class="pageLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        v-html="lastButtonText"
      ></a>
    </li>
  </ul>

  <div :class="containerClass" v-else>
    <a
      v-if="firstLastButton"
      @click="selectFirstPage()"
      @keyup.enter="selectFirstPage()"
      :class="[pageLinkClass, firstPageSelected() ? disabledClass : '']"
      tabindex="0"
      v-html="firstButtonText"
    ></a>
    <a
      v-if="!(firstPageSelected() && hidePrevNext)"
      @click="prevPage()"
      @keyup.enter="prevPage()"
      :class="[prevLinkClass, firstPageSelected() ? disabledClass : '']"
      tabindex="0"
      v-html="prevText"
    ></a>
    <template v-for="(page, index) in pages">
      <a
        v-if="page.breakView"
        :key="`p-${index}`"
        :class="[
          pageLinkClass,
          breakViewLinkClass,
          page.disabled ? disabledClass : ''
        ]"
        tabindex="0"
      >
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </a>
      <a
        v-else-if="page.disabled"
        :key="page"
        :class="[
          pageLinkClass,
          page.selected ? activeClass : '',
          disabledClass
        ]"
        tabindex="0"
        >{{ page.content }}</a
      >
      <a
        v-else
        :key="page"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
        :class="[pageLinkClass, page.selected ? activeClass : '']"
        tabindex="0"
        >{{ page.content }}</a
      >
    </template>
    <a
      v-if="!(lastPageSelected() && hidePrevNext)"
      @click="nextPage()"
      @keyup.enter="nextPage()"
      :class="[nextLinkClass, lastPageSelected() ? disabledClass : '']"
      tabindex="0"
      v-html="nextText"
    ></a>
    <a
      v-if="firstLastButton"
      @click="selectLastPage()"
      @keyup.enter="selectLastPage()"
      :class="[pageLinkClass, lastPageSelected() ? disabledClass : '']"
      tabindex="0"
      v-html="lastButtonText"
    ></a>
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
/* CSS LiBRARY*/
.rp {
  align-items: center;
  display: flex;
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  &--item,
  & > li:first-child,
  & > li:last-child {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    color: #ccc;
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 0.5rem 0.5rem;
    text-align: center;
    &:last-child {
      margin-right: 0;
    }
    a {
      color: #ccc;
    }
  }
}
</style>
