<!-- 查看备份文件信息对话框 -->
<template>
    <el-dialog
    width="45%"
     title="查看备份"
      append-to-body
      >
      <template #default>
        <TableModel>
            
        </TableModel>
      </template>
      </el-dialog>
</template>
<script setup>
import { reactive } from 'vue';
import TableModel from '../TableModel.vue';

const state = reactive({
    columns: [
      //例子
      { prop: "name", label: "文件名", width: "100px" },
      { prop: "bucketName", label: "所处桶", width: "100px" },
      { prop: "", label: "Address" },
    ],
})

</script>
<style scoped>

</style>