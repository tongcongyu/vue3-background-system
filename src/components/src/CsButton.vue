<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-02-01 14:05:40
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-01 14:26:27
 * @FilePath: \vue3-background-system\src\components\src\CsButton.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="cs-button">
    <div v-for="(item, index) in actions" :key="index">
      <Button
        size="small"
        :type="item.type || 'primary'"
        :icon="item.icon"
        :disabled="item.disabled"
        @click="click(item.action, data)"
        >{{ item.label }}
      </Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  actions: any;
  click: any;
  data: any;
}>();
</script>
<style lang="scss" scoped>
.cs-button {
  display: flex;
  justify-content: start;
  align-items: center;
  > div {
    margin: 0 5px;
  }
}
</style>
