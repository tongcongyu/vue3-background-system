<template>
  <div class="table-form">
    <Form :model="model" ref="refMenuForm" :rules="rules" :label-width="80">
      <Row :gutter="10">
        <Col span="24">
          <Form-item label="菜单名称" prop="name">
            <Input
              v-model="model.name"
              maxlength="20"
              show-word-limit
              placeholder="请输入菜单名称"
              :disabled="modelDisabled"
            ></Input>
          </Form-item>
          <Form-item label="菜单序号" prop="sort">
            <Input v-model="model.sort" maxlength="10" placeholder="请输入菜单序号" :disabled="modelDisabled"></Input>
          </Form-item>
          <Form-item label="菜单图标" prop="icon">
            <Input
              v-model="model.icon"
              maxlength="20"
              show-word-limit
              placeholder="请输菜单图标"
              :disabled="modelDisabled"
            ></Input>
          </Form-item>
          <Form-item label="菜单链接" prop="url">
            <Input
              v-model="model.url"
              maxlength="200"
              show-word-limit
              placeholder="请输入菜单链接"
              :disabled="modelDisabled"
            ></Input>
          </Form-item>
          <Form-item label="父级菜单" prop="parentId">
            <div id="app">
              <TreeSelect
                v-model="model.parentId"
                show-checkbox
                :data="options"
                :disabled="modelDisabled || parentDisabled"
              />
            </div>
          </Form-item>
        </Col>
      </Row>

      <Row class="buttonDiv">
        <Button @click="cancel">关闭</Button>
        <Button :loading="loading" @click="submitForm" type="primary" v-if="!(action == 'detail')">确定</Button>
      </Row>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { useMenuFlagStore } from '@/store';
import { usePost } from '@/utils/http/axios';
// pinia
const menuFlagStore = useMenuFlagStore();

interface ImodelType {
  name?: string;
  sort?: number;
  icon?: string;
  url?: string;
  parentId?: number | string;
}
const prop = defineProps<{
  formModel: any;
  action: string;
}>();
const emit = defineEmits(['close-modal', 'getAllMenu']);
const model = ref<ImodelType>({});
const refMenuForm = ref<any>(null);
const modelDisabled = ref<boolean>(false);
const parentDisabled = computed(() => {
  return prop.action == 'detail' ? true : false;
});
const options = ref<Array<any>>([]);
const loading = ref<boolean>(false);
const rules = ref<any>({
  name: [
    {
      type: 'string',
      required: true,
      message: '该项不能为空',
      trigger: 'blur',
    },
  ],
});
// 数据重新赋值
watch(
  () => prop.formModel,
  () => {
    model.value = { ...prop.formModel };
  },
  {
    deep: true,
  }
);
/*提交*/
function submitForm() {
  refMenuForm.value.validate((valid) => {
    if (valid) {
      if (!loading.value) {
        loading.value = !0;
        save();
      }
    } else {
      window.$message.info('请完善必填项!');
    }
  });
}
function save() {
  usePost('/api/v1/menu/', model.value).then(
    (res: any) => {
      loading.value = !1;
      if (res.rtnCode == 0) {
        emit('getAllMenu');
        cancel();
        window.$message.success('保存成功！');
        //   改变菜单状态
        menuFlagStore.updateMenuFlag(true);
      }
    },
    () => {
      loading.value = !1;
    }
  );
}
function cancel() {
  emit('close-modal');
  refMenuForm.value.resetFields();
}
</script>
