<!-- 列表模板 -->
<template>
  <div style="position: relative">
    <el-table
      highlight-current-row:true
      :row-height="500"
      class="tableModel"
      :data="tableData"
      size="large"
    >
      <!-- 多选 -->
      <el-table-column v-if="selectionIsNeed" type="selection" width="55">
      </el-table-column>
      <!-- 表头 -->
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
      >
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        v-if="optionIsNeed"
        label="操作"
        :width="optionWidth"
        class="option-class"
      >
        <template #default="scope">
          <!-- 加其他操作按钮的插槽 -->
          <slot name="prev" :scope="scope"></slot>
          <el-button
            v-if="editIsNeed"
            @click="handleEdit(scope.$index, scope.row)"
            type="text"
            style="margin-left: -5%"
            size="small"
            >编辑</el-button
          >
          <el-button
            v-if="deleteIsNeed"
            @click="handleDelete(scope.$index, scope.row)"
            text
            type="danger"
            size="small"
            >删除</el-button
          >
          <slot name="next" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="page"
      layout="prev, pager, next"
      :total="tableData.length"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
  </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  /* 设置表头 */
  columns: {
    type: Array,
    default: () => [
      //例子
      { prop: "date", label: "Date", width: "100px" },
      { prop: "name", label: "Name", width: "100px" },
      { prop: "address", label: "Address" },
    ],
  },
  /* 设置是否有多选框 */
  selectionIsNeed: {
    type: Boolean,
    default: true,
  },
  /* 设置是否有操作按钮 */
  optionIsNeed: {
    type: Boolean,
    default: false,
  },
  /* 设置是否需要详情按钮 */
  editIsNeed: {
    type: Boolean,
    default: false,
  },
  /* 设置是否需要删除按钮 */
  deleteIsNeed: {
    type: Boolean,
    default: false,
  },
  /* 设置操作栏的宽度 */
  optionWidth: {
    type: String,
    default: "180px",
  },
  /* 设置数据 */
  tableData: {
    type: Array,
    default: () => [
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ],
  },
});
const state = reactive({
  total: 200,
  currentPage: 1, // 当前页
  pageSize: 8, //一页的数据量
});
/*编辑方法 */
const changePage = (val) => {
  state.currentPage = val;
};
/* 删除方法 */
const handleEdit = (index, row) => {
  emit("handleEdit", { index, row });
};
const handleDelete = (index, row) => {
  emit("handleDelete", { index, row });
};
</script>

<style scoped>
.table {
  width: 1350px;
  margin-left: 10px;
}

::v-deep .tableModel th {
  background-color: #eff3f8;
}
.option-class {
  display: flex;
  flex-direction: row;
}
.el-table-link {
  color: #3299ff;
  text-decoration: none;
}

.page {
  position: absolute;
  bottom: calc(100%-10px);
  right: 10px;
  margin-top: 20px;
}
</style>
