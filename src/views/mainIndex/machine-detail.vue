<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-04-13 17:36:43
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditT i me: 2023-05-15 10:51:50
     * @FilePath: \四川省GA厅NCMS机房可视化\src\views\mainIndex\machine-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="machine-detail">
    <div class="detail-left">
      <MachineBox :boxValue="nowBox" @show-details="null" :showToolTip="true"></MachineBox>
    </div>
    <div class="detail-right">
      <div class="right-top">
        <div>
          机器编号：<span>{{ tableInfo.rackNo }}</span>
        </div>
        <div>
          所在行列:<span>{{ tableInfo.rowCol }}</span>
        </div>
        <div>
          厂商型号:<span>{{ tableInfo.rackManufacturer }}</span>
        </div>
        <div>
          U数:<span>{{ tableInfo.cabCount }}</span>
        </div>
      </div>
      <div class="right-bottom">
        <div class="table-top">
          <div class="table-name">资产信息</div>
          <Button type="primary" ghost icon="ios-build" @click="showMenuRow">定制列</Button>
        </div>
        <div class="table-box" :style="`height:calc(100% - ${showMenu ? 150 : 50}px)`">
          <Table :columns="columns" :data="tableData" stripe></Table>
        </div>
      </div>
    </div>
    <Modal class="modal-page" title="定制列" width="35" v-model="showMenu" :mask-closable="true">
      <dz-list ref="refDzList" @close-modal="showMenuRow" @init-data="initData"></dz-list>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <Button type="primary" @click="selectList">确定</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { useGet } from '@/utils/http/axios';
import MachineBox from './machine-box.vue';
import DzList from './dz-list.vue';
const prop = defineProps<{
  nowBox: any;
}>();
defineExpose({
  getRackNo,
});
const refDzList = ref<any>(null);
const tableInfo = ref<any>({});
const showMenu = ref<boolean>(false);
const columns = ref<any>([]);
const rackNoStr = ref<any>('');
const tableData = ref<any>([]);
const tooltipList = ref<any>([]);

function getRackNo(rackNo: any) {
  rackNoStr.value = rackNo;
  initData();
}
function initData() {
  // 获取展示的定制列
  columns.value = [];
  tooltipList.value = [];
  useGet('/menu/all', {}).then((res: any) => {
    res.data.forEach((item: any) => {
      item.fields.forEach((el: any) => {
        if (el.display === 1) {
          const obj: any = {
            title: el.name,
            key: el.name,
            minWidth: 60,
            ellipsis: true,
            tooltip: true,
            resizable: true,
            align: 'center',
          };
          columns.value.push(obj);
          tooltipList.value.push(el.name);
        }
      });
    });
  });
  //   获取表格数据
  useGet('/visual/detailsByRackNo?rackNo=' + rackNoStr.value, {}).then((res: any) => {
    if (res.data) {
      //   tableData.value = [...res.data.devList, ...res.data.devList, ...res.data.devList, ...res.data.devList];
      tableData.value = res.data.devList;
      prop.nowBox.list.forEach((item: any) => {
        tableData.value.forEach((el: any) => {
          if (item.id && item.id === el.id) {
            item.info = el;
          }
        });
      });
      // eslint-disable-next-line vue/no-mutating-props
      prop.nowBox.tooltipList = tooltipList.value;
      tableInfo.value = {
        rackNo: res.data.rackNo,
        rowCol: res.data.rowCol,
        rackManufacturer: res.data.rackManufacturer,
        cabCount: res.data.cabCount,
      };
    }
  });
}
function showMenuRow() {
  showMenu.value = !showMenu.value;
}
// function closeMenuRow() {
//   showMenu.value = !showMenu.value;
// }
function selectList() {
  const fnEditList: any = refDzList.value.editList;
  fnEditList();
}
</script>
<style lang="scss" scoped>
.machine-detail {
  width: 100%;
  //   max-height: 600px;
  min-height: 420px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  .detail-left {
    width: 200px;
    // height: 'auto';
    background: #273859;
    padding-bottom: 20px;
    // overflow-y: auto;
    > div {
      zoom: 0.7;
    }
  }
  .detail-right {
    width: calc(100% - 250px);
    min-height: 100%;
    .right-top {
      width: 100%;
      height: 40px;
      background: #273859;
      display: flex;
      align-items: center;
      padding: 0 20px;
      > div {
        width: 25%;
        color: #95d0f2;
        > span {
          color: #fff;
          display: inline-block;
          text-align: center;
        }
      }
    }
    .right-bottom {
      width: 100%;
      height: calc(100% - 40px);
      .table-top {
        display: flex;
        width: 100%;
        height: 50px;
        justify-content: space-between;
        align-items: center;
        .table-name {
          color: #1d79b9;
        }
      }
      .table-box {
        // overflow-y: auto;
        overflow: auto;
      }
    }
  }
}
</style>
