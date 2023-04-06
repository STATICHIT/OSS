<!-- 文件对象限制解冻对话框 -->
<template>
  <el-dialog
  width="45%"
   title="错误操作"
    append-to-body
     style="padding: 0px 15px;
     width: 34%;
     "
    >
    <template #default>
        <div class="content-box">
            <el-icon style="color: RGB(217,48,38);height: 20px;"><CircleCloseFilled /></el-icon> 
            <span>勾选的解冻文件列表中包含标准存储/解冻中/已解冻的文件，这些文件无需进行解冻操作。</span>
        </div>
    </template>
    </el-dialog>
</template>

<script setup>

</script>

<style scoped>
.content-box{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-bottom: 23px;
}
.container{
    display: flex;
    flex-direction: row;
}

</style>