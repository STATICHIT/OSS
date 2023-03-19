<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router="true"
    style="
      min-height: 90vh;
      box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.06);
    "
  >
    <el-menu-item index="/dataScreen" class="el-menu-font">
      <el-icon><PieChart /></el-icon>
      <template #title>数据大屏</template>
    </el-menu-item>
    <el-menu-item index="/bucketList" class="el-menu-font">
      <el-icon><FolderOpened /></el-icon>
      <template #title>Bucket列表</template>
    </el-menu-item>
    <el-sub-menu index="/dataServer">
      <template #title>
        <el-icon><List /></el-icon>
        <span class="el-menu-font">数据服务</span>
      </template>
      <el-menu-item index="/dataCopy">数据复制</el-menu-item>
      <el-menu-item index="/dataImport">数据导入</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon><TrendCharts /></el-icon>
        <span class="el-menu-font">资源管理</span>
      </template>
      <el-menu-item index="/subUserManage">子用户管理</el-menu-item>
      <el-menu-item index="/labelManage">标签管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon><Star /></el-icon>
        <span class="el-menu-font">收藏路径</span>
      </template>
      <el-menu-item
        v-for="collectBucket in state.collectBuckets"
        :key="collectBucket.id"
        index=""
        >{{ collectBucket.name }}</el-menu-item
      >
      <el-menu-item
        ><el-icon><Plus /></el-icon>新建路径</el-menu-item
      >
    </el-sub-menu>
    <button class="open-btn" @click="isCollapse = !isCollapse">
      <el-icon class="open-icon" v-show="isCollapse"
        ><ArrowRightBold
      /></el-icon>
      <el-icon v-show="!isCollapse"
        ><ArrowLeftBold class="open-icon"
      /></el-icon>
    </button>
  </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import "@/style/base.scss";
import apiFun from "../utils/api";
import { ElMessage } from "element-plus";

const state = reactive({
  collectBuckets: [],
});

//  apiFun.bucket.getCollect().then((res)=>{
//   if(res.code==200){
//     state.collectBuckets=res.data
//   }
//   else
//   ElMessage.error(res.msg)
//  })

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const isCollapse = ref(false); //设置主菜单收起/显示状态
</script>

<style lang="scss">
$primary-color: #6477b7;
$back-color: #f0f2f8;
$second-color: #f0f1f8;

.el-menu.el-menu-item {
  font-size: 10px;
}
.open-btn {
  border-radius: 0;
  width: 15px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #dde0e6;
  background: #fff;
  height: 30px;
  position: absolute;
  bottom: 50vh;
  right: -15px;
  &:hover {
    background-color: $second-color;
  }
  transform: translateY(-50%);
  transition: right 0.3s ease-in-out;
}
.el-menu-vertical-demo.is-collapsed .open-btn {
  right: 170px;
}
.open-icon {
  color: #7e7e7e;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
}
.el-menu-font {
  font-weight: bold;
  color: #4e4e4e;
}
.plus-icon {
  margin-left: 10px;
}
</style>
