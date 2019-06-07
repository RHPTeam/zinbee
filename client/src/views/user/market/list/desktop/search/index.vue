<template>
  <div class="ct m_auto">
    <div class="search py_3">
      <div class="input_group d_flex m_auto">
        <input type="text" class="input--search" placeholder="Tìm kiếm" />
        <div class="btn--search d_flex justify_content_center">
          <icon-base
            class="icon--search"
            height="24px"
            width="24px"
            viewBox="0 0 20 20"
          >
            <icon-input-search></icon-input-search>
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.btn--search {
  background-color: #ffb94a;
  border-radius: 0 0.625rem 0.625rem 0;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease-in;
  color: hsl(0, 0%, 100%);
  padding: 16px 0;
  margin-left: -2px;
  width: 60px;
  height: 50px;
  border: 0;
  .icon--search {
    color: #fff;
    stroke: #fff;
    stroke-width: 0.5;
  }
}
.input--search {
  background-color: #fff;
  border: 0;
  border-radius: 0.625rem 0 0 0.625rem;
  font-size: 0.875rem;
  color: #444;
  padding: 0 1rem;
  flex: 1;
  height: 50px;
  line-height: 50px;
  outline: 0;
  &::placeholder {
    color: #ccc;
  }
}
</style>
