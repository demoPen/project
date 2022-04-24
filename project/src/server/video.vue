<template>
  <div class="article">
    <main>
      <div class="btngroups">
        <el-button type="primary" @click="uploadUrl('location')"
          >上传本地视频</el-button
        >
        <el-button type="primary" @click="uploadUrl('url')"
          >网页iframe视频</el-button
        >
      </div>
      <div class="table">
        <el-table stripe :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </div>
      <modal :urlCode="urlCode" :isShow="isShow" @close="close"></modal>
    </main>
  </div>
</template>

<script>
import Modal from "./modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      isShow: false,
      
      urlCode: "",
    };
  },
  methods: {
    uploadUrl(e) {
      this.isShow = true;
      this.urlCode = e == "location";
    },
    close(e) {
      console.log(e);
      this.isShow = e;
    },
  },
};
</script>

<style scoped>
.article {
  width: 100%;
  min-width: 590px;
  padding: 10px;
  height: 100vh;
  background-color: rgb(220, 227, 225);
}
main {
  height: 100%;
  width: 100%;
  background-color: rgb(253, 253, 253);
  padding: 10px;
}
main .btngroups {
  padding-bottom: 10px;
  border-bottom: 2px solid #dfe7f3;
}
.table {
  height: calc(100% - 52px);
  overflow: scroll;
}
</style>