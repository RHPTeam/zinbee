<template>
  <div class="ct m_auto">
    <div class="search py_3">
      <div class="input_group d_flex m_auto">
        <input type="text" class="input--search" placeholder="Tìm kiếm">
        <div class="btn--search d_flex justify_content_center">Search</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.btn--search {
  font-size: 0.875rem;
  background: #ffb94a;
  font-size: 14px;
  transition: all 0.2s ease-in;
  box-shadow: 1px 1px 3px -1px hsl(0, 0%, 90%);
  box-shadow: 1px 1px 3px 0 hsla(0, 0%, 0%, .07);
  color: hsl(0, 0%, 100%);
  padding: 16px 0;
  margin-left: -2px;
  width: 160px;
  border-radius: 0 2px 2px 0;
  border: 0;
}

.input--search{
  border-radius: 2px 0 0 2px;
  font-size: 16px;
  color: hsl(0, 0%, 10%);
  border: 2px solid hsl(0, 0%, 90%);
  background-color: hsl(0, 0%, 100%);
  padding: 16px 24px;
  flex: 1;
  height: 56px;
}
</style>
