<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-04-13 17:36:43
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-04-21 13:03:25
 * @FilePath: \四川省GA厅NCMS机房可视化\src\views\mainIndex\machine-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="machine-detail">
    <div class="detail-left">
      <MachineBox :boxValue="nowBox" @show-details="null"></MachineBox>
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
        <div v-if="showMenu" class="show-menu">
          <CheckboxGroup v-model="checkMenu" @on-change="changeMenuList">
            <Checkbox :label="item.label" v-for="(item, index) of menuList" :key="index"> </Checkbox>
          </CheckboxGroup>
        </div>
        <div class="table-box" :style="`height:calc(100% - ${showMenu ? 150 : 50}px)`">
          <Table :columns="columns" :data="tableData" stripe></Table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useGet, usePost } from '@/utils/http/axios';
import MachineBox from './machine-box.vue';
defineProps<{
  nowBox: any;
}>();
defineExpose({
  initData,
});
const tableInfo = ref<any>({});
const showMenu = ref<boolean>(false);
const allMenu = ref<any>({});
const menuList = ref<
  Array<{
    label: string;
    isCheck: number;
  }>
>([]);
const checkMenu = ref<Array<string>>([]);
const columns = ref<any>([]);
const tableData = ref<any>([]);

function initData(rackNo: any) {
  useGet('/menu/all', {}).then((res: any) => {
    if (res.data) {
      allMenu.value = res.data;
      const data: any = [];
      checkMenu.value = [];

      Object.keys(res.data).forEach((item: any) => {
        const obj = {
          label: item,
          isCheck: res.data[item],
        };
        if (obj.isCheck === 1) {
          checkMenu.value.push(item);
        }
        data.push(obj);
      });
      getColumns();
      menuList.value = data;
    }
  });
  useGet('/visual/detailsByRackNo?rackNo=' + rackNo, {}).then((res: any) => {
    if (res.data) {
      tableData.value = res.data.devList;
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
async function changeMenuList(params: any) {
  for (let i in allMenu.value) {
    if (params.indexOf(i) === -1) {
      allMenu.value[i] = 0;
    } else {
      allMenu.value[i] = 1;
    }
  }
  await usePost('/menu/update', allMenu.value).then((res: any) => {
    if (res.data) {
      getColumns();
    }
  });
}

function getColumns() {
  columns.value = [];
  checkMenu.value.forEach((li: any) => {
    const columnsObj: any = {
      title: li,
      key: li,
      minWidth: 60,
      ellipsis: true,
      tooltip: true,
      resizable: true,
      align: 'center',
    };
    columns.value.push(columnsObj);
  });
}
</script>
<style lang="scss" scoped>
.machine-detail {
  width: 100%;
  max-height: 600px;
  min-height: 420px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  .detail-left {
    width: 200px;
    height: 'auto';
    background: #273859;
    padding-bottom: 20px;
    overflow-y: auto;
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
      .show-menu {
        width: 100%;
        height: 100px;
        overflow-y: auto;
      }
      .table-box {
        // overflow-y: auto;
        overflow: auto;
      }
    }
  }
}
</style>
