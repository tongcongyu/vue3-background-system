<template>
  <div class="cs-dynamic-table">
    <div class="action-box">
      <div class="action-button" v-if="!propData.actionList || !propData.actionList.replace">
        <Button type="primary">新增</Button>
        <Button type="error">删除</Button>
      </div>
      <div class="action-button" v-else>
        <Button v-for="(item, index) in propData.actionList.def || []" :key="'action' + index" :type="item.type">{{
          item.name
        }}</Button>
      </div>
      <div class="action-search">
        <div v-if="propData.search && propData.search.show">
          <Input
            style="width: 300px"
            search
            :placeholder="propData.search.placeholder || ''"
            v-model="searchValue[propData.search.key]"
          />
        </div>
        <div class="advance-search" v-if="propData.advanceSearch && propData.advanceSearch.length > 0">
          <div v-for="(item, index) in propData.advanceSearch" :key="'advance' + index">
            <Input
              v-if="item.type == 'input'"
              v-model="searchValue[item.key]"
              :placeholder="item.placeholder || ''"
              style="width: 300px"
            />
            <Select
              :multiple="item.multiple"
              v-if="item.type == 'select'"
              v-model="searchValue[item.key]"
              style="width: 300px"
            >
              <Option v-for="(el, elIndex) in item.option" :key="elIndex" :value="el.value">{{ el.label }}</Option>
            </Select>
          </div>
        </div>
        <Button type="primary" @click="getData">查询</Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const prop = defineProps<{
  propData: any;
}>();
const searchValue = ref<any>({});

function getData() {
  console.log(searchValue.value, 'pppppppppppp');
}
</script>
<style lang="scss" scoped>
.cs-dynamic-table {
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  .action-box {
    width: 100%;
    height: 50px;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .action-button {
      > button {
        margin: 0 3px;
      }
    }
    .action-search {
      display: flex;
      align-items: center;
      padding-right: 20px;
      > div {
        margin-right: 10px;
      }
      .advance-search {
        display: flex;
        > div {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>
