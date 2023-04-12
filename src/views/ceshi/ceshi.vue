<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-31 16:28:39
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-20 16:51:45
 * @FilePath: \vue3-background-system\src\views\mainIndex\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="ceshi">
    <Table :columns="columns" :data="data" border :span-method="handleSpan"></Table>
  </div>
</template>
<script lang="ts" setup>
const columns = ref<any>([
  {
    type: 'index',
    title: '序号',
    width: 50,
  },
  {
    title: '所属专业',
    key: 'major',
    width: 80,
  },
  {
    title: '设备名称',
    key: 'name',
    width: 100,
  },
  {
    title: '工作内容',
    key: 'content',
    width: 70,
  },
  {
    title: '责任单位',
    key: 'unit',
    width: 70,
  },
  {
    title: '2021',
    key: 'year',
    align: 'center',
    children: [],
  },
]);
const data = ref<any>([
  {
    major: '土木专业',
    name: '10KV高压系统',
    content: '月度维护',
    unit: '迪威',
  },
  {
    major: '电器专业',
    name: '10KV高压系统',
    content: '月度维护',
    unit: '迪威',
  },
  {
    major: '土木专业',
    name: '10KV高压系统',
    content: '月度维护',
    unit: '迪威',
  },
  {
    major: '电器专业',
    name: '10KV高压系统',
    content: '月度维护',
    unit: '迪威',
  },
  {
    major: '电器专业',
    name: '10KV高压系统',
    content: '月度维护',
    unit: '迪威',
  },
]);
// 行合并起始点
const Rmerge = ref<any>({
    'a': {Rstart:0,Rend:4}
});
// 列合并起始点
const Cmerge = ref<any>([]);
// 表格列需要开始合并的列数
const CstartIndex = ref<number>(5);
onMounted(() => {
  for (let i = 1; i <= 12; i += 1) {
    const obj: any = {
      title: i + '月',
      align: 'center',
      sortable: true,
      children: [
        {
          title: '第1周',
          key: 'month' + i + '-' + 'week1',
          align: 'center',
        },
        {
          title: '第2周',
          key: 'month' + i + '-' + 'week2',
          align: 'center',
        },
        {
          title: '第3周',
          key: 'month' + i + '-' + 'week3',
          align: 'center',
        },
        {
          title: '第4周',
          key: 'month' + i + '-' + 'week4',
          align: 'center',
        },
      ],
    };
    columns.value[columns.value.length - 1].children.push(obj);
  }
  const plan: any = ['月', '季'];
  data.value.forEach((item) => {
    for (let i = 1; i <= 12; i += 1) {
      for (let j = 1; j <= 4; j += 1) {
        item['month' + i + '-' + 'week' + j] = plan[Math.floor(Math.random() * 2)];
        // item['month' + i + '-' + 'week' + j] = plan[index];
      }
    }
  });
  console.log(data.value, '表格数据');

  dealData();
});

function handleSpan({ row, column, rowIndex, columnIndex }) {
  const copyColumn: any = JSON.parse(JSON.stringify(column));
  copyColumn.text = data.value[rowIndex][copyColumn.key];
  //   行合并
  if (columnIndex === 1) {
    if (rowIndex === Rmerge.value[row.major]?.Rstart) {
      return [Rmerge.value[row.major]?.Rend + 1, 1];
    } else if (rowIndex > Rmerge.value[row.major]?.Rstart && rowIndex <= Rmerge.value[row.major]?.Rend) {
      // 第一个元素表示合并几行，第二个元素表示合并几列
      return [0, 0];
    }
  }
  //   列合并
  if (columnIndex >= CstartIndex.value) {
    for (let i = 0; i < Cmerge.value.length; i += 1) {
      if (rowIndex === i) {
        for (let key in Cmerge.value[i]) {
          if (Cmerge.value[i][key]) {
            if (columnIndex === Cmerge.value[i][key].Cstart) {
              console.log(Cmerge.value[i][key], 'kkkk');
              return [1, Cmerge.value[i][key].Cend - Cmerge.value[i][key].Cstart + 1];
              //   return [1, 3];
            } else if (columnIndex > Cmerge.value[i][key].Cstart && columnIndex <= Cmerge.value[i][key].Cend) {
              return [0, 0];
            }
          }
        }
      }
    }
  }
}
function dealData() {
  data.value.sort((a, b) => {
    return a.major.localeCompare(b.major);
  });
  data.value.forEach((item, index) => {
    if (Rmerge.value[item.major]) {
      Rmerge.value[item.major].Rend = index;
    } else {
      Rmerge.value[item.major] = {
        Rstart: index,
        Rend: index,
      };
    }
    Cmerge.value[index] = {};
    for (let i = 1; i <= 12; i += 1) {
      for (let j = 1; j <= 4; j += 1) {
        // 当前列
        const key: any = 'month' + i + '-' + 'week' + j;
        // 前一列
        let preKey: any = '';
        if (i === 1 && j === 1) {
          preKey = key;
        } else {
          preKey = 'month' + (j === 1 ? i - 1 : i) + '-' + 'week' + (j === 1 ? 4 : j - 1);
        }
        Cmerge.value[index][key] = {
          Cstart: (i - 1) * 4 + j + CstartIndex.value - 1,
          Cend: (i - 1) * 4 + j + CstartIndex.value - 1,
          text: item[key],
        };
        if (item[key] === Cmerge.value[index][preKey].text) {
          // 如果当前列和前一列相同，则当前列Cstart等于前一列的Cstart
          Cmerge.value[index][key].Cstart = Cmerge.value[index][preKey].Cstart;
        }
      }
    }
  });
  Cmerge.value.forEach((item) => {
    Object.keys(item).forEach((el, index) => {
      if (item[Object.keys(item)[index + 1]]?.text === item[Object.keys(item)[index]]?.text) {
        //   delete item[Object.keys(item)[index]];
        item[Object.keys(item)[index]] = null;
      }
    });
  });
  console.log(Cmerge.value, 'ppppppp');
}
</script>
<style lang="scss" scoped>
.ceshi {
  width: 100%;
  height: 100%;
  padding: 20px;
}
:deep(.ivu-table) {
  font-size: 12px !important;
}
</style>
