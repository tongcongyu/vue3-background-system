<template>
  <div class="save" :style="`height:${8.5 * uSite}px`">
    <div v-for="item in 4" :key="item">
      <div>
        <div v-for="li in uSite" :key="li"></div>
      </div>
      <div></div>
    </div>
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
.save {
  width: 100px;
  //   height: 8.5px;
  border: 2px solid #545c5e;
  display: flex;
  position: relative;
  > div {
    height: 100%;
    width: 25%;
    z-index: 99;
    display: flex;
    > div:nth-of-type(1) {
      height: 100%;
      width: 70%;
      background: #343c3f;
      display: flex;
      justify-content: space-around;
      flex-direction: column-reverse;
      align-items: center;
      padding: 1px 0;
      > div {
        height: 2px;
        width: 70%;
        background: #4a5459;
        border-radius: 1px;
      }
    }
    > div:nth-of-type(2) {
      height: 100%;
      width: 30%;
      background: #6ec0d4;
    }
  }
}
</style>
