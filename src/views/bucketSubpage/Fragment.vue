<!-- 碎片管理 -->
<template>
  <div class="message">
        <div class="common-table" >
            <el-table :data="data.tableData" class="table" stripe style="width:100%" height="100%" @select="select">
                <el-table-column  prop="" label="" width="20">
                </el-table-column>
                <el-table-column  prop="" label="文件名称" width="180">
                    <template #default="scope">
                        <router-link to="/users/subUser" style="color:#2177b8;">{{ scope.row.objectName }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column  prop="" label="大小" width="120">
                    <template #default="scope">
                        <p>{{ scope.row.size }}</p>
                    </template>
                </el-table-column>
                <el-table-column  prop="chunkNum" label="已上传块数" width="120">
                </el-table-column>
                <el-table-column  prop="chunks" label="总块数" width="120">
                </el-table-column>
                <el-table-column  prop="blockToken" label="令牌" width="350">
                </el-table-column>
                <el-table-column  prop="ip" label="上传地址" width="200">
                </el-table-column>
                <el-table-column  label="操作" width="">
                    <template #default="scope" >
                        <a class="buttonText" href="javascript:void(0)" target="_blank" style="color:brown;" @click.prevent="handleDelete(scope.row)">
                            删除
                        </a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="clear: both;"></div>
        <!-- 分页 -->
        <div>
            <!-- <el-pagination
                background
                class="page"
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.size"
                :current-page="page.pageNum"
                @current-change="changePage"
                /> -->
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'
import { ElMessageBox,ElMessage } from 'element-plus';
import req from '../../utils/api';
/**
* 仓库
*/
const store = useStore();

/**
* 路由对象
*/
const route = useRoute();
// console.log("当前路由信息:")
// console.log(route.matched)
// console.log(route.query)

/**
* 路由实例
*/
const router = useRouter();
// 当前路由的匹配记录
// console.log(router.currentRoute.value.matched)

//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({
    // 表单是否打开
    dialogVisible: false,
    // 列表数据 
    tableData:[],
    bucketName:'',
    keyword:'',
})

const page = reactive({
    total: 0, // 总条数
    pageNum: 1, // 当前页
    size: 15,
})

//分页切换
const changePage = (val) =>{
    page.pageNum = val
    initData()
}
//搜索
const search = () => {
    console.log(data.bucketName)
    initData()
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


//获取bucket列表
const initData = () => {
    console.log(data.bucketName)
    //写请求接口
    // axios.get( "/api/getFragment").then(res=>{
    //     console.log(res)
    //     console.log(res.data.data2.data.length)
    //     console.log(formatBytes(res.data.data2.data.num))
    //     for(let i=0; i<res.data.data2.data.length; i++){
    //         console.log(res.data.data2.data[i].ip)
    //         res.data.data2.data[i].ip = res.data.data2.data[i].ip+res.data.data2.data[i].port
    //         res.data.data2.data[i].size = formatBytes(res.data.data2.data[i].size)
    //         res.data.data2.data[i].chunkNum = res.data.data2.data[i].chunkNum + '块'
    //     }
    //     data.tableData = res.data.data2.data
    //     console.log(data.tableData)
    // }).catch(err =>{
    //     console.log(err)
    // })
    req.bucket.getFragment(data.bucketName).then(res=>{
        console.log(res)
        if(res.code===200){
          for(let i = 0; i<res.data.length; i++){
            res.data[i].size = formatBytes(res.data[i].size)
            res.data[i].id = res.data[i].id + ':' + res.data[i].port
            res.data[i].chunkNum = res.data[i].chunkNum + ' 块'
            res.data[i].chunks = res.data[i].chunks + ' 块'
          }
          data.tableData = res.data
          data.total = res.data.totalCount
        }
    }).catch(err=>{
        console.log(err)
    })
}

//删除bucket
const handleDelete = (index) => {
    console.log(index.blockToken)
    ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            req.bucket.deleteFragment(data.bucketName,index.blockToken).then(res=>{
                console.log(res)
                if(res.code===200){
                    ElMessage.success({
                        message: '删除成功!'
                    });
                    initData()
                }
            }).catch(err=>{
                console.log(err)
            })
        }).catch(() => {
          ElMessage.info({
            message: '已取消删除'
          });
        });
    
   
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  data.bucketName = route.query.bucketName
  initData()
})


// 监听路径的改变,如果发生变化了，执行方法
watchEffect(()=>{
    route,
    () => {
        getMatched()
    }
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='scss'>
a:hover{
    text-decoration:underline;
}
::v-deep .table th {
  background-color: #eff3f8;
}
::v-deep.table td{
  text-align: left;
}
.message {
        position: relative;
        height: 100%;
        padding-left: 15px;
        width: 98%;

        .common-table {
            position: relative;
                // height: 100%;
                // width:100%
        }
       
}
    
    ::v-deep .el-upload {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover { //触碰到以后边框变颜色（暂时没用
        border: #409EFF;
    }
    .page {
        position: absolute;
        // bottom: calc(100%-10px);
        right: 20%;
        margin-top: 20px;
    }
</style>