<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-04-13 16:35:05
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-05-17 14:12:29
 * @FilePath: \四川省GA厅NCMS机房可视化\src\views\mainIndex\machine-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="machine-list">
    <div class="list-top">
      <div v-for="(item, index) in legendList" :key="index">
        <div class="legend-name">{{ item.name }}</div>
        <img :src="getImg(item.icon)" alt="" />
      </div>
    </div>
    <div class="tool-bar">
      <div>比例缩放：</div>
      <Tooltip content="放大">
        <Button
          type="primary"
          size="small"
          shape="circle"
          icon="md-add"
          @click="changeZoom('add')"
          :disabled="zoomValue > 3"
        ></Button>
      </Tooltip>
      <Tooltip content="缩小">
        <Button
          type="primary"
          size="small"
          shape="circle"
          icon="md-remove"
          @click="changeZoom('remove')"
          :disabled="zoomValue <= 0.5"
        ></Button>
      </Tooltip>
      <Trend :flag="zoomValue < 1 ? 'down' : 'up'">X{{ zoomValue.toFixed(1) }}</Trend>
    </div>
    <div class="list-bottom">
      <div v-for="(li, idx) in machineList" :key="idx" :style="`zoom:${zoomValue}`">
        <MachineBox :boxValue="li" @show-details="showDetails(li)" :showToolTip="false"></MachineBox>
      </div>
    </div>
    <Modal class="modal-page" title="设备详情" width="65" v-model="detailModal" :mask-closable="false" footer-hide>
      <MachineDetail :nowBox="nowBox" ref="refMachineDetail"></MachineDetail>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import MachineDetail from './machine-detail.vue';
import MachineBox from './machine-box.vue';

interface IlegendList {
  name: string;
  icon: string;
}
const props = defineProps<{
  racksList: any;
}>();
const zoomValue = ref<number>(1);
const refMachineDetail = ref<any>(null);
const detailModal = ref<boolean>(false);
const nowBox = ref<any>({});
const legendList = ref<Array<IlegendList>>([
  {
    name: '交换机',
    icon: 'server',
  },
  {
    name: '路由器',
    icon: 'net',
  },
  {
    name: '安全',
    icon: 'safe',
  },
  {
    name: '其他设备',
    icon: 'other',
  },
  {
    name: '配线架',
    icon: 'peixian',
  },
]);
const machineList = ref<any>([]);
function getImg(name: string) {
  return new URL(`../../assets/images/${name}.png`, import.meta.url).href;
}
function showDetails(params: any) {
  nowBox.value = { ...params };
  nowBox.value.name = '';
  detailModal.value = true;
  refMachineDetail.value.getRackNo(params.rackNo);
}
function changeZoom(type: string) {
  if (type === 'add') {
    zoomValue.value += 0.1;
  } else {
    zoomValue.value -= 0.1;
  }
}
watch(
  () => props.racksList,
  () => {
    const data: any = [];
    props.racksList.forEach((item: any) => {
      const obj = {
        rackName: item.rackName,
        rackNo: item.rackNo,
        total: item.cabCount,
        list: item.cabLayers,
      };
      //   找到已经有的点位
      const numList: any = [];
      item.cabLayers.forEach((el: any) => {
        numList.push(...el.site);
      });
      //   找到不存在的点位，插入空U位
      for (let i = 1; i <= item.cabCount; i += 1) {
        if (numList.indexOf(i) === -1) {
          const siteObj = {
            id: null,
            type: 0,
            site: [i],
          };
          obj.list.push(siteObj);
        }
      }
      //   排序
      obj.list.sort((a: any, b: any) => {
        return a.site[0] - b.site[0];
      });
      data.push(obj);
    });
    machineList.value = data;
  },
  {
    deep: true,
  }
);
</script>
<style lang="scss" scoped>
.machine-list {
  width: 100%;
  max-height: 600px;
  min-height: 420px;
  overflow-y: auto;
  .list-top {
    width: 100%;
    height: 40px;
    background: #273859;
    display: flex;
    align-items: center;
    padding: 0 20px;
    > div {
      display: flex;
      align-items: center;
      color: #fff;
      width: 20%;
      .legend-name {
        max-width: 100px;
      }
      img {
        max-width: 90px;
        height: 16px;
        margin: 0 20px;
      }
    }
  }
  .tool-bar {
    padding: 10px 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #fff;
    gap: 10px;
  }
  .list-bottom {
    max-width: 100%;
    // margin-top: 11px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 15px;
    > div {
      width: 185px;
      height: 700px;
      //   zoom: 1; //缩放
      background: #273859;
      overflow: auto;
    }
  }
}
</style>
