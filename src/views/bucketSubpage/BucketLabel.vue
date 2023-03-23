<!-- bucket子页面 ———— Bucket配置/Bucket标签-->

<!-- 测试图片选择 -->
<template>
  <div>
    <el-drawer v-model="drawer" direction="rtl" size="40%">
      <!-- 头部 -->
      <template #header>
        <h3 style="text-align: left">详情</h3>
      </template>
      <!-- 内容 -->
      <template #default>
        <div class="circle">
          <ul class="circle-ul">
            <li v-for="item of classList" :key="item.id" class="circle-li">
              <div
                v-on:click="changeList(item.id)"
                v-bind:class="{ changeBorder: item.id == a }"
                value="change!"
              >
                <img
                  :src="item.coverImg"
                  style="width: 100px; height: 100px; padding-top: 5px"
                  alt
                />
                <div>{{ item.id }}</div>
                <div class="topic-shade">
                  <div class="shade">
                    <img
                      src="../../assets/select.png"
                      style="width: 14px; height: 14px"
                      alt
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
      <!-- 尾部 -->
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="chooseImg">保存</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      a: true,
      classList: [
        {
          id: "001",
          coverImg: new URL("../../assets/wallpaper.png", import.meta.url).href,
        },
        {
          id: "002",
          coverImg: new URL("../../assets/preAvatar.png", import.meta.url).href,
        },
        {
          id: "003",
          coverImg: new URL("../../assets/user.png", import.meta.url).href,
        },
        {
          id: "004",
          coverImg: new URL("../../assets/delete.png", import.meta.url).href,
        },
        {
          id: "005",
          coverImg: new URL("../../assets/icon1.png", import.meta.url).href,
        },
        {
          id: "006",
          coverImg: new URL("../../assets/仓库_仓储管理.png", import.meta.url)
            .href,
        },
      ],
    };
  },
  methods: {
    changeList(id) {
      if (this.a == id) {
        this.a = !this.a;
      } else {
        this.a = id;
      }
      alert(this.a);
    },
    cancelClick() {
      drawer.value = false;
    },
    chooseImg() {
      drawer.value = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.circle {
  position: relative;
  width: 632px;
  left: 15px;
}
.circle-ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 532px;
  padding: 0;
  margin: 14px 0 0 50px;
}
.circle-li {
  margin-right: 20px;
  list-style: none;
  margin-bottom: 20px;
}

.topic-shade {
  display: none;
}

.changeBorder {
  width: 115px;
  height: 121px;
  position: relative;
  cursor: pointer;
  border: 1px dashed #969696;
  margin: -1px -8px 0 -8px;
  .topic-shade {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    top: 123.5px;
    right: 0;
    bottom: 0;
    left: 86px;
  }

  .shade {
    margin-bottom: 4px;
  }
}
</style>