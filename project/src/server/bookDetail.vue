<template>
  <div class="chapter">
    <div class="header">
      <el-button type="primary" icon="el-icon-plus" @click="addchapter"
        >添加章节</el-button
      >
    </div>
    <el-table
      :data="tableData"
      height="calc(100vh - 40px)"
      border
      stripe
      style="width: 100%"
      :cell-style="handleText"
    >
      <template slot="empty"
        ><img
          height="100"
          src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      /></template>
      <el-table-column
        label="序号"
        width="180"
        type="index"
        align="center"
        :index="handleIndex"
      >
      </el-table-column>
      <el-table-column label="章节名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操纵时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ handleDate(scope.row.updateAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" width="130" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="writeChapter(scope.row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="updateChapter(scope.row.id, scope.row.name, scope.row.sort)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="deleteChapter(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加" width="30%" :visible.sync="isShow">
      <el-form>
        <el-form-item label="章节名称">
          <el-input v-model="form.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="章节序号" v-show="alterName">
          <el-input v-model="form.orderBy" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sendChapterInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  name: "detail",
  data() {
    return {
      isShow: false,
      form: {
        name: "",
        orderBy: "",
      },
      id: null,
      tableData: null,
      alterName: true, //修改的时候只能更改章节名称
      isUpdate: false,
      updateId: null,
    };
  },
  created() {
    this.id = this.$route.params.id; //将书籍id取出
  },
  mounted() {
    this.getchapterList();
  },
  methods: {
    getchapterList() {
      request.get(`/file/chapter/${this.id}`).then((res) => {
        this.tableData = res.data;
      });
    },
    updateChapter(id, name, sort) {
      this.alterName = false;
      this.isShow = true;
      this.isUpdate = true;
      this.updateId = id;
      this.form.name = name;
      this.form.orderBy = sort;
    },
    sendChapterInfo() {
      if (this.isUpdate) {
        request
          .patch(`/file/chapter/${this.updateId}`, this.form)
          .then((res) => {
            this.$message({
              type: "success",
              message: `${res.data}`,
              duration: 1300,
            });
            this.getchapterList();
            this.isShow = false;
          });
      } else {
        request
          .post(`/file/chapter/${this.id}`, this.form)
          .then((res) => {
            this.$message({
              type: "success",
              message: `${res.data}`,
              duration: 1300,
            });
            this.getchapterList();
            this.isShow = false;
          })
          .catch((error) => {
            // console.log(error);
            if (error) {
              Object.keys(this.form).forEach((key) => {
                this.form[key] = "";
              });
            }
          });
      }
    },
    deleteChapter(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request.delete(`/file/chapter/${id}`).then((res) => {
          if (res) this.getchapterList();
          if (res)
            this.$message({
              type: "success",
              message: `${res.data}`,
              duration: 1500,
            });
        });
      });
    },
    addchapter() {
      this.isShow = true;
    },
    cancel() {
      this.isShow = false;
    },
    handleIndex(index) {
      return `第${index + 1}章`;
    },
    handleText({ columnIndex }) {
      if (columnIndex === 0) {
        return " letter-spacing:2px;color:rgb(122, 130, 138);font-weight:600";
      }
      if (columnIndex === 1) {
        return "letter-spacing:2px";
      }
    },
    handleDate(e) {
      let appointDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(e)[0];
      return appointDate;
    }, //处理日期

    writeChapter(id) {
      this.$router.push({
        name: "writeBook",
        query: {
          chapterId: id,
        },
      });
      console.log(id);
    },
  },
  computed: {},
};
</script>

<style scoped>
.chapter {
  width: 100%;
  min-width: 590px;
}
.header {
  display: flex;
  justify-content: center;
  background-color: rgb(102, 177, 255);
}
</style>