<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-19 09:15:53
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-01 09:12:59
 * @FilePath: \vue3-background-system\src\views\login\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login">
    <div class="ligon-box">
      <Form :model="loginModel" ref="loginForm" :rules="rules">
        <FormItem label="" prop="username">
          <Input
            v-model="loginModel.username"
            prefix="ios-person"
            placeholder="请输入用户名"
            style="width: 100%"
            @on-enter="handleSubmit"
          />
        </FormItem>
        <FormItem label="" prop="password">
          <Input
            type="password"
            v-model="loginModel.password"
            prefix="ios-lock-outline"
            placeholder="请输入密码"
            style="width: 100%"
            @on-enter="handleSubmit"
          />
        </FormItem>
        <!-- <FormItem label="" prop="vCode"> -->
        <FormItem label="">
          <Input
            v-model="loginModel.vCode"
            placeholder="请输入验证码，不区分大小写"
            style="width: 50%"
            @on-enter="handleSubmit"
          />
          <div class="yzm">
            <picyzm @getIdentifyCode="getIdentifyCode"></picyzm>
          </div>
        </FormItem>
      </Form>
      <Button type="primary" class="sub-button" @click="handleSubmit" :loading="loading">
        <span class="login-text">登录</span>
      </Button>
      <Checkbox v-model="rememberUser" class="remember-user">记住用户</Checkbox>
    </div>
  </div>
</template>
<script setup lang="ts">
import VueCookie from 'js-cookie';
import { usePost } from '@/utils/http/axios';
import picyzm from './picyzm.vue';
/**
 * 路由,const $router = useRouter();
 */
const $router = useRouter();
interface IloginModeltype {
  username: string;
  password: string;
  vCode: string;
}
const loginForm = ref<any>(null);
const rememberUser = ref<boolean>(false);
const loading = ref<boolean>(false);
const loginModel = ref<IloginModeltype>({
  username: '',
  password: '',
  vCode: '',
});
const identifyCode = ref<string>('');
function validatePass(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入验证码'));
  } else {
    if (value.toLowerCase() != identifyCode.value) {
      callback(new Error('验证码错误'));
    }
    callback();
  }
}
const rules = ref<any>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  vCode: [{ validator: validatePass, trigger: 'blur' }],
});
onMounted(() => {
  VueCookie.remove('X-ACCESS-TOKEN');
  const rememberData: any = sessionStorage.getItem('loginModel');
  if (rememberData) {
    loginModel.value = JSON.parse(rememberData);
    rememberUser.value = true;
  }
});
// 获取验证码组建的验证码用于判断验证码是否正确
function getIdentifyCode(value: Array<string | number>) {
  identifyCode.value = value.join('').toLowerCase();
}
//提交验证
function handleSubmit() {
  loginForm.value.validate((valid) => {
    if (valid) {
      save();
    }
  });
}
// 发送登录请求
function save() {
  loading.value = true;
  usePost('/login', loginModel.value).then(
    (res: any) => {
      if (res.code == 0) {
        if (rememberUser.value) {
          const userPwd = {
            username: loginModel.value.username,
            password: loginModel.value.password,
          };
          sessionStorage.setItem('loginModel', JSON.stringify(userPwd));
        }
        VueCookie.set('X-ACCESS-TOKEN', res.data, -1);
        loginForm.value.resetFields();
        $router.push('/main/mainIndex');
      } else {
        window.$message.error('账号密码错误');
      }
      loading.value = false;
    },
    (_err) => {
      window.$message.error('登陆失败！');
      loading.value = false;
    }
  );
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: url('../../assets/images/login-bg.jpg');
  background-size: 100% 100%;

  .ligon-box {
    position: absolute;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25%;
    height: 200px;
    padding: 0 2%;

    .login-text {
      font-size: 20px;
      color: #fff;
    }

    .sub-button {
      width: 100%;

      .login-text {
        letter-spacing: 10px;
      }
    }

    .yzm {
      width: 50%;
      height: 45px;
      display: inline-block;
      vertical-align: middle;
      padding-left: 15%;
    }

    .remember-user {
      margin-top: 10px;
      color: #2d8cf0;
    }

    :deep(.ivu-input) {
      height: 45px;
      border-radius: 8px;
    }

    :deep(.ivu-input-prefix i, .ivu-input-suffix i) {
      line-height: 45px;
    }
  }
}
</style>
