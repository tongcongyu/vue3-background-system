<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-04-13 14:53:31
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-06-01 09:53:51
 * @FilePath: \四川省GA厅NCMS机房可视化\src\views\mainIndex\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="list-page">
    <div class="flex-list">
      <div v-for="(item, index) in roomList" :key="index">
        <div class="item-top">
          <div>{{ item.roomName }}</div>
          <img src="@/assets/images/list-bg.png" alt="" @click="showListModal(item.roomNo, item.roomName)" />
        </div>
        <div class="item-bottom">
          <div>
            机房编号：<span>{{ item.roomNo }}</span>
          </div>
          <div>
            机房位置：<span>{{ item.address }}</span>
          </div>
        </div>
      </div>
    </div>
    <Modal
      class="modal-page"
      :title="machineRoomName"
      width="65"
      v-model="listModal"
      :mask-closable="false"
      footer-hide
      :styles="{ top: '20px' }"
    >
      <MachineList :racksList="racksList"></MachineList>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { useGet } from '@/utils/http/axios';
import MachineList from './machine-list.vue';

const roomList = ref<any>([]);
const machineRoomName = ref<string>('');
const listModal = ref<boolean>(false);
const racksList = ref<any>([]);
onMounted(() => {
  getRoom();
});
function getRoom() {
  useGet('/visual/room', {}).then((res: any) => {
    if (res.data) {
      roomList.value = res.data;
    }
  });
}
function showListModal(roomNo: string, roomName: string) {
  machineRoomName.value = roomName;
  listModal.value = true;
  useGet('/visual/racksByRoomNo?roomNo=' + roomNo, {}).then((res: any) => {
    if (res.data) {
      racksList.value = res.data;
    }
  });
}
</script>
<style lang="scss" scoped>
.list-page {
  width: 1920px;
  height: 100%;
  background-color: #12213e;
  padding: 28px 19px;
  overflow-y: auto;
  .flex-list {
    widows: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    align-items: start;
    > div {
      width: 32%;
      height: 375px;
      margin: 7px 9px;
      .item-top {
        background-color: #162947;
        width: 100%;
        height: calc(100% - 32px);
        position: relative;
        padding: 20px;
        > div {
          text-align: center;
          color: #fff;
        }
        > img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 80%;
          cursor: pointer;
        }
      }
      .item-bottom {
        width: 100%;
        height: 32px;
        margin-top: 1px;
        background-color: #192b4c;
        display: flex;
        padding: 0 20px;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        > div {
          width: 50%;
          color: #6d84af;
          > span {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
