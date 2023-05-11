<template>
  <div class="safe" :style="`height:${15 * uSite}px;margin:${1.5 * uSite}px 0`">
    <div v-for="item in uSite" :key="item" class="row">
      <div>
        <div v-for="li in 6" :key="li"></div>
      </div>
      <div>
        <div>
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
.safe {
  width: 100px;
  //   height: 15px;
  position: relative;
  background: #676f72;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1px;
  .row {
    width: 100%;
    height: 15px;
    display: flex;
    > div:nth-of-type(1) {
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 2px;
      > div {
        width: 4px;
        height: 4px;
        background: #6dc0d4;
      }
    }
    > div:nth-of-type(2) {
      width: 58%;
      height: 100%;
      background: #353c3f;
      display: flex;
      justify-content: end;
      align-items: center;
      padding-right: 3px;
      > div {
        width: 10px;
        height: 50%;
        background: #e5e5e5;
      }
    }
  }
}
</style>
