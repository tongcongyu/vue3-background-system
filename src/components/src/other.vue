<template>
  <div class="other" :style="`height:${13 * uSite}px;margin:${uSite - 1}px 0`">
    <div></div>
  </div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    uSite: number;
  }>(),
  {
    uSite: 1,
  }
);
</script>
<style lang="scss" scoped>
.other {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #353c3f;
  border: 2px solid #676f72;
  > div {
    width: 50%;
    height: 50%;
    background: #6dc0d4;
  }
}
</style>
