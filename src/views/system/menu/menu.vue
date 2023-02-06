<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-02-01 10:57:29
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-06 15:22:33
 * @FilePath: \vue3-background-system\src\views\system\menu\menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="oo-page">
    <!-- <div class="i-table">
      <Row class="i-table-top-btns">
        <Button type="primary" icon="md-add" @click="clickEvent('save', 0)">增加</Button>
      </Row>
      <Table row-key="id" :columns="columns" :data="allMenuList" border></Table>
    </div>
    <Modal v-model="smsModal" :title="title[action]" :width="40" @on-cancel="closeModal">
      <menu-form
        @close-modal="closeModal"
        @getAllMenu="getAllMenu"
        :allMenuList="allMenuList"
        :formModel="model"
        :action="action"
      ></menu-form>
      <template #footer>
        <span></span>
      </template>
    </Modal> -->
    <CsDynamicTable :propData="csTable" />
  </div>
</template>
<script lang="ts" setup>
import { useDelete } from '@/utils/http/axios';
import { getAllMenuList } from '@/request/common/common';
import CsButton from '@/components/src/CsButton.vue';
import MenuForm from './menu-form.vue';
const model = ref<any>({});
const action = ref<string>('save');
const smsModal = ref<boolean>(false);
const title = ref<any>({
  save: '新增',
  detail: '详情',
  update: '编辑',
  add: '新增子菜单',
});
const allMenuList = ref<Array<any>>([]);
const columns = ref<Array<any>>([
  {
    title: '菜单名称',
    key: 'name',
    align: 'left',
    tree: true,
  },
  {
    title: '菜单链接',
    key: 'url',
    align: 'left',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    render: (h, params) => {
      const actionList = [
        {
          label: '详情',
          type: 'info',
          icon: 'ios-eye',
          action: 'detail',
        },
        {
          label: '编辑',
          type: 'primary',
          icon: 'ios-create-outline',
          action: 'update',
        },
        {
          label: '删除',
          type: 'error',
          icon: 'md-trash',
          action: 'delete',
        },
        {
          label: '新增子菜单',
          type: 'primary',
          icon: 'md-add',
          action: 'add',
        },
      ];
      return h('div', [
        h(CsButton, {
          actions: actionList,
          click: clickEvent,
          data: params.row,
        }),
      ]);
    },
  },
]);

const csTable = ref<any>({
  actionList: {
    //表头操作按钮
    replace: true,
    def: [
      {
        name: '增加',
        icon: 'ios-add',
        type: 'primary',
        action: () => {},
      },
      {
        name: '删除',
        icon: 'md-trash',
        type: 'error',
        action: () => {},
      },
    ],
  },
  search: {
    show: false,
    key: 'gatewayId',
    placeholder: '请输入名称',
  },
  advanceSearch: [
    {
      type: 'input',
      key: 'id',
      placeholder: '请输入名称',
    },
    {
      type: 'select',
      option: [
        { value: 1, label: '11' },
        { value: 2, label: '22' },
      ],
      key: 'name',
      multiple: true,
      placeholder: '请输入名称',
    },
  ],
});
onMounted(() => {
  getAllMenu();
});
async function getAllMenu() {
  // 获取全部菜单
  allMenuList.value = ((await getAllMenuList()) as any).allMenuList || [];
}
function clickEvent(name: string, obj: any) {
  if (name == 'delete') {
    deleteMenuItem(obj.id);
    return;
  } else if (name == 'add') {
    model.value.parentId = obj.id;
  } else {
    model.value = obj;
  }
  action.value = name;
  showModal();
}

// 删除菜单
function deleteMenuItem(ids) {
  window.$modal.confirm({
    title: '提示',
    content: '此操作将永久删除, 是否继续?',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      useDelete('/api/v1/menu/delete?menuId=' + ids, {}).then((res: any) => {
        if (res.rtnCode == 0) {
          window.$message.success('删除成功');
          getAllMenu();
        } else {
          window.$message.error('删除失败');
        }
      });
    },
    onCancel: () => {
      window.$message.info('已取消删除');
    },
  });
}
// 弹框
function showModal() {
  smsModal.value = !0;
}
function closeModal() {
  smsModal.value = !1;
}
</script>
