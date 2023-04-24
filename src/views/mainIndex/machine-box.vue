<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-04-17 11:46:43
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-04-23 16:29:19
 * @FilePath: \四川省GA厅NCMS机房可视化\src\views\mainIndex\machine-box.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="machine-box" @click="showDetails(boxValue)">
    <div class="list-name ellipsis-text" :title="boxValue.rackName">{{ boxValue.rackName }}</div>
    <div class="list-box" :style="`cursor: ${boxValue.list?.length > 0 ? 'pointer' : 'default'};`">
      <div class="box-border">
        <div v-for="(el, elIndex) in boxValue.list" :key="elIndex">
          <div class="site">{{ el.site[0] }}</div>
          <server :uSite="el.site.length" v-if="typeList[el.typeId] === 'server'"></server>
          <save :uSite="el.site.length" v-else-if="typeList[el.typeId] === 'save'"></save>
          <net :uSite="el.site.length" v-else-if="typeList[el.typeId] === 'net'"></net>
          <safe :uSite="el.site.length" v-else-if="typeList[el.typeId] === 'safe'"></safe>
          <other :uSite="el.site.length" v-else-if="typeList[el.typeId] === 'other'"></other>
          <div class="empty-box" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  boxValue: any;
}>();
const typeList = ref<any>(['empty', 'server', 'save', 'net', 'safe', 'other']);
const emit = defineEmits(['show-details']);
function showDetails(params) {
  console.log(params, 'hjhj');
  if (params.list.length > 0) {
    emit('show-details', params);
  }
}
</script>
<style lang="scss" scoped>
.machine-box {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  .list-name {
    color: #95d0f2;
    font-size: 12px;
    height: 24px;
    text-align: center;
  }
  .list-box {
    width: 100%;
    min-height: 50px;
    padding: 12px 0;
    position: relative;
    .box-border {
      width: 130px;
      min-height: 50px;
      margin: 0 auto;
      display: flex;
      flex-direction: column-reverse;
      padding: 2px 15px 0 0;
      background: url('@/assets/images/machine-box.png') no-repeat center center;
      background-size: 130px 100%;
      gap: 1px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 130px;
        height: 12px;
        background: url('@/assets/images/machine-box-top.png') no-repeat center center;
        background-size: 100% 100%;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 130px;
        height: 12px;
        background: url('@/assets/images/machine-box-bottom.png') no-repeat center center;
        background-size: 100% 100%;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
      }
      > div {
        width: 100%;
        // height: 8.5px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .site {
          color: #fff;
          font-size: 12px;
          text-align: center;
          //   min-width: 13px;
          //   padding-right: 2px;
        }
        .empty-box {
          width: 100px;
          height: 100%;
          //   margin-left: 2px;
        }
      }
    }
  }
}
</style>
