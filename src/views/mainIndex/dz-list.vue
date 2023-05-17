<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-05-15 10:37:06
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-05-17 11:08:25
 * @FilePath: \四川省GA厅NCMS机房可视化\src\views\mainIndex\dz-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="dz-list">
    <Table
      row-key="id"
      :columns="columns"
      :data="allMenu"
      stripe
      @on-select="selectList"
      @on-select-cancel="cancelList"
      @on-select-all="selectAll('select')"
      @on-select-all-cancel="selectAll('cancel')"
      ref="refTable"
    ></Table>
  </div>
</template>
<script setup lang="ts">
import { Button } from 'view-ui-plus';
import { useGet, usePost } from '@/utils/http/axios';
defineExpose({
  editList,
});
const emit = defineEmits(['close-modal', 'init-data']);
const refTable = ref<any>(null);
const allMenu = ref<any>([]);
const columns = ref<any>([
  {
    type: 'selection',
    width: 60,
    align: 'center',
    tree: true,
  },
  {
    title: '列名',
    key: 'name',
    align: 'left',
    tree: true,
    minWidth: 60,
    ellipsis: true,
    // tooltip: true,
    resizable: true,
  },
  {
    title: '操作',
    width: 200,
    ellipsis: true,
    tooltip: true,
    resizable: true,
    align: 'left',
    render: (h, params) => {
      if ('parentId' in params.row) {
        return h(
          'div',
          {
            style: 'display:flex;gap:10px',
          },
          [
            h(Button, {
              icon: 'ios-arrow-round-up',
              type: 'text',
              ghost: true,
              size: 'large',
              title: '向前一位',
              disabled: params.index === 0 ? true : false,
              onclick: () => {
                sortList(params.index, params.row.parentId, 'stepUp');
              },
            }),
            h(Button, {
              icon: 'ios-arrow-round-down',
              type: 'text',
              ghost: true,
              size: 'large',
              title: '向后一位',
              disabled: params.index === params.row.total - 1 ? true : false,
              onclick: () => {
                sortList(params.index, params.row.parentId, 'stepDown');
              },
            }),
            h(Button, {
              icon: 'md-arrow-up',
              type: 'text',
              ghost: true,
              size: 'large',
              title: '置顶',
              disabled: params.index === 0 ? true : false,
              onclick: () => {
                sortList(params.index, params.row.parentId, 'stepTop');
              },
            }),
            h(Button, {
              icon: 'md-arrow-down',
              type: 'text',
              ghost: true,
              size: 'large',
              title: '置尾',
              disabled: params.index === params.row.total - 1 ? true : false,
              onclick: () => {
                sortList(params.index, params.row.parentId, 'stepBottom');
              },
            }),
          ]
        );
      }
    },
  },
]);

onMounted(() => {
  getData();
});
/**
 * 排序功能
 * index:0开始
 * stepUp：向上一步
 * stepDown：向下一步
 */
function sortList(index: number, parentId: number, type: string) {
  //   if (type === 'stepUp') {
  allMenu.value.forEach((item: any) => {
    item._showChildren = false;
    if (item.id === parentId) {
      // 当前分组保持展开
      item._showChildren = true;
      // 当前项
      const cur = item.children[index];
      if (type === 'stepUp') {
        cur.order -= 1;
        item.children[index - 1].order += 1;
        item.children[index] = item.children[index - 1];
        item.children[index - 1] = cur;
      } else if (type === 'stepDown') {
        cur.order += 1;
        item.children[index + 1].order -= 1;
        item.children[index] = item.children[index + 1];
        item.children[index + 1] = cur;
      } else if (type === 'stepTop') {
        cur.order = 1;
        item.children.splice(index, 1);
        item.children.unshift(cur);
        for (let i = 1; i <= index; i += 1) {
          item.children[i].order += 1;
        }
      } else if (type === 'stepBottom') {
        cur.order = item.children.length;
        item.children.splice(index, 1);
        item.children.push(cur);
        for (let i = index; i < item.children.length - 1; i += 1) {
          item.children[i].order -= 1;
        }
      }
    }
  });
  //   }
}
function selectList(selection: any, row: any) {
  allMenu.value.forEach((item: any) => {
    item._showChildren = false;
    // 选中的是子集
    if (item.id === row.parentId) {
      item._showChildren = true;
      item.children.forEach((el: any) => {
        if (el.order === row.order) {
          el._checked = true;
        }
      });
      item._checked = item.children.find((li) => !li._checked) ? false : true;
      // 选中的是父级
    } else if (item.id === row.id) {
      item._checked = true;
      item._showChildren = true;
      item.children.forEach((el: any) => {
        el._checked = true;
      });
    }
  });
}
function cancelList(selection: any, row: any) {
  allMenu.value.forEach((item: any) => {
    item._showChildren = false;
    // 选中的是子集
    if (item.id === row.parentId) {
      item._checked = false;
      item._showChildren = true;
      item.children.forEach((el: any) => {
        if (el.order === row.order) {
          el._checked = false;
        }
      });
      // 选中的是父级
    } else if (item.id === row.id) {
      item._checked = false;
      item._showChildren = true;
      item.children.forEach((el: any) => {
        el._checked = false;
      });
    }
  });
}
// 全选、取消
function selectAll(type: string) {
  allMenu.value.forEach((item: any) => {
    if (type === 'select') {
      item._checked = true;
    } else {
      item._checked = false;
    }
    item.children.forEach((el: any) => {
      if (type === 'select') {
        el._checked = true;
      } else {
        el._checked = false;
      }
    });
  });
}
function getData() {
  useGet('/menu/all', {}).then((res: any) => {
    if (res.data) {
      allMenu.value = [];
      res.data.forEach((item: any, index: number) => {
        const obj: any = {
          id: index,
          name: item.category,
          _checked: item.fields.find((item) => item.display === 0) ? false : true,
          _showChildren: false,
          _disabled: item.fields.length === 0 ? true : false,
          children: [],
        };
        item.fields.forEach((el: any) => {
          const childrenObj: any = {
            id: index + '-' + el.order,
            parentId: index,
            order: el.order,
            name: el.name,
            _checked: el.display === 1 ? true : false,
            total: item.fields.length,
          };
          obj.children.push(childrenObj);
        });
        allMenu.value.push(obj);
      });
    }
  });
}
// 数据组装，修改定制列(order或者display)
function editList() {
  // 数据组装
  const data: any = [];
  allMenu.value.forEach((item: any) => {
    const obj: any = {
      category: item.name,
      fields: [],
    };
    item.children.forEach((el: any) => {
      const fieldsItem: any = {
        name: el.name,
        display: el._checked ? 1 : 0,
        order: el.order,
      };
      obj.fields.push(fieldsItem);
    });
    data.push(obj);
  });
  update(data);
}
// 修改定制列请求
function update(postData: any) {
  usePost('/menu/update', postData).then((res: any) => {
    if (res.data) {
      window.$message.success('修改成功');
      emit('close-modal');
      emit('init-data');
    }
  });
}
</script>
<style lang="scss" scoped>
.dz-list {
  width: 100%;
  height: 500px;
  overflow-y: auto;
}
</style>
