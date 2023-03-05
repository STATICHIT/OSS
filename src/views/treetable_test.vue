<!-- 树形列表 -->
<template>
  <el-table :data="tableData" style="width: 900px">
    <el-table-column type="expand">
      <template v-slot="props">
        <el-table :data="props.row.children" class="sub-table" >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="type" label="类型"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        name: '计算机组成原理',
        type: '专业课',
        children: [{
          name: '浮点数',
          type: '必考点'
        }, {
          name: '存储器',
          type: '必考点'
        }]
      }, {
        name: '环境艺术设计',
        type: '选修课',
        children: [{
          name: '环境透视',
          type: '必考点'
        }, {
          name: '环境艺术导论',
          type: '了解',
          children: [{
            name: '环境艺术设计历史',
            type: '了解'
          }]
        }]
      }, {
        name: '漫画',
        type: '娱乐',
        children: [{
          name: '朝花夕拾',
          type: '快看漫画'
        }, {
          name: 'old先',
          type: '耽美'
        }]
      }]
    };
  }
};
</script>

<style lang="scss" scoped>
.sub-table {
  padding-left: 100px;
  width: 900px;
}
</style>