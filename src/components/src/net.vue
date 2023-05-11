<template>
  <div class="net" :style="`height:${15 * uSite}px;margin:${1.5 * uSite}px 0`">
    <div>
      <div :style="`height:${3 * uSite}px`"></div>
    </div>
    <div>
      <div v-for="li in uSite" :key="li" class="row">
        <div v-for="item in 13" :key="item">
          <div></div>
        </div>
      </div>
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
.net {
  width: 100px;
  //   height: 15px;
  display: flex;
  position: relative;
  background: #676f72;
  > div:nth-of-type(1) {
    height: 100%;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
      width: 30%;
      background: #f7910c;
    }
  }
  > div:nth-of-type(2) {
    height: 100%;
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1px;
    .row {
      display: flex;
      justify-content: space-around;
      width: 100%;
      //   margin-bottom: 1px;
      > div {
        width: 4px;
        height: 4px;
        background: #888c8e;
        padding: 1px;
        > div {
          width: 2px;
          height: 2px;
          background: #000;
        }
      }
    }
  }
}
</style>
