<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-04-17 11:46:43
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-06-01 10:56:25
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
          <Poptip trigger="hover" placement="right-end" :disabled="!showToolTip || !el.info" word-wrap>
            <server :uSite="el.site.length" v-if="typeList[el.typeId] === 'server'"></server>
            <net :uSite="el.site.length" v-else-if="typeList[el.typeId] === 'net'"></net>
            <safe :uSite="el.site.length" v-else-if="typeList[el.typeId] === 'safe'"></safe>
            <other :uSite="el.site.length" v-else-if="typeList[el.typeId] === 'other'"></other>
            <save :uSite="el.site.length" v-else-if="typeList[el.typeId] === 'peixian'"></save>
            <div class="empty-box" v-else></div>
            <template #content v-if="el.info">
              <div style="width: 500px; max-height: 500px; min-height: 100px; overflow-y: auto; overflow-x: hidden">
                <div
                  v-for="(li, liIndex) in boxValue.tooltipList"
                  :key="liIndex"
                  style="margin: 5px 0; border-bottom: 2px solid #fff; display: flex; align-items: center"
                >
                  <p style="display: inline-block; width: 100px">{{ li }}：</p>
                  <p style="display: inline-block; width: calc(100% - 100px); padding: 0 20px">
                    {{ el.info[li] }}
                  </p>
                </div>
              </div>
            </template>
          </Poptip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  boxValue: any;
  showToolTip: boolean;
}>();
/**
 * empty:无设备
 * server：交换机
 * net：路由器
 * safe：安全设备
 * other：其他
 * peixian:配线架
 */
const typeList = ref<any>(['empty', 'server', 'net', 'safe', 'other', 'peixian']);
const emit = defineEmits(['show-details']);
function showDetails(params) {
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
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .list-name {
    color: #95d0f2;
    font-size: 12px;
    height: 24px;
    text-align: center;
  }
  .list-box {
    width: 100%;
    min-height: 50px;
    max-height: calc(100% - 24px);
    padding: 12px 0;
    position: relative;
    // overflow-y: auto;
    .box-border {
      width: 130px;
      min-height: 50px;
      margin: 0 auto;
      display: flex;
      flex-direction: column-reverse;
      padding: 0 15px 0 0;
      background: url('@/assets/images/machine-box.png') no-repeat center center;
      background-size: 130px 100%;
      gap: 2px;
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
        left: 50%;
        transform: translate(-50%, 100%);
      }
      > div {
        width: 100%;
        // height: 13px;
        // height: auto;
        display: flex;
        align-items: center;
        justify-content: end;
        .site {
          width: 20px;
          height: 100%;
          color: #fff;
          font-size: 12px;
          text-align: center;
          //   transform: scale(0.7);
          zoom: 0.7;
        }
        .empty-box {
          width: 100px;
          height: 13px;
          //   background: #fff;
        }
      }
    }
  }
}
</style>
