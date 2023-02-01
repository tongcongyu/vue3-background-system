<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-31 16:41:07
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-01 09:16:10
 * @FilePath: \vue3-background-system\src\views\main\user.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="user">
    <Dropdown @on-click="handleClick">
      <Avatar style="background-color: rgb(0, 0, 0, 0.2)" icon="ios-person" />
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <template #list>
        <DropdownMenu>
          <DropdownItem name="logout">退出登录</DropdownItem>
          <!-- <DropdownItem name="changePwd">修改密码</DropdownItem> -->
        </DropdownMenu>
      </template>
    </Dropdown>
    <Modal v-model="changePwdModal" title="密码修改" footer-hide>
      <Form :model="model" ref="refPwdForm" :rules="rules">
        <Form-item label="原密码" prop="old" v-validate:old.required.maxInputLength="rules">
          <Input type="password" v-model="model.old" placeholder="请输入原密码" maxlength="32"></Input>
        </Form-item>
        <Form-item label="新密码" prop="new" v-validate:new.required.maxInputLength="rules">
          <Input type="password" v-model="model.new" placeholder="请输入新密码" maxlength="32"></Input>
        </Form-item>
        <Form-item label="确认新密码" prop="newConfirm" v-validate:newConfirm.required.maxInputLength="rules">
          <Input type="password" v-model="model.newConfirm" placeholder="请输入新密码" maxlength="32"></Input>
        </Form-item>
        <Form-item style="text-align: center">
          <Button type="primary" @click="submitForm">确定</Button>
          <Button style="margin-left: 8px" @click="changePwdModal = false">关闭</Button>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import VueCookie from 'js-cookie';
import { usePost } from '@/utils/http/axios';
const refPwdForm = ref<any>(null);
const changePwdModal = ref<boolean>(false);
const model = ref<any>({ old: '', new: '', newConfirm: '' });
const rules = ref<any>({});

function handleClick(name) {
  if (name == 'logout') {
    logout();
  }
}
// 注销账号
function logout() {
  usePost('/api/logoutBySelf', {}).then((res: any) => {
    if (res.code == 0) {
      window.$message.success(res.msg);
      VueCookie.remove('X-ACCESS-TOKEN');
      console.log(window.$router, 'pppppp');

      window.$router.push('/');
    }
  });
}
// function changePwd() {
//   this.model = { old: '', new: '', newConfirm: '' };
//   this.changePwdModal = true;
// }
/*提交*/
function submitForm() {
  refPwdForm.value.validate((valid) => {
    if (valid) {
      save();
    } else {
      window.$message.info('请完善必填项!');
    }
  });
}
// 修改密码
function save() {
  if (model.value.new !== model.value.newConfirm) {
    window.$message.info('两次新密码输入不一致!');
    return;
  }
  usePost('/api/v1/user/pwd/change', model.value).then((res: any) => {
    if (res.rtnCode == 0) {
      window.$message.info('密码修改成功!');
      changePwdModal.value = false;
    } else {
      window.$message.error(res.msg);
    }
  });
}
</script>
