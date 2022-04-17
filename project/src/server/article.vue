<template>
  <div class="article">
    <main>
      <div class="btngroups">
        <el-button type="primary" @click="createArticle">新建文章</el-button>
      </div>
      <div class="table">
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.theme.toLowerCase().includes(search.toLowerCase()) ||
                data.updateAt.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
          stripe
          height="100%"
        >
          <template slot="empty"
            ><img
              height="100"
              src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          /></template>
          <el-table-column type="index" width="180" align="center" label="序号">
          </el-table-column>
          <el-table-column prop="theme" label="主题" align="center">
          </el-table-column>
          <el-table-column label="最近操作日期" width="380" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{
                handleDate(scope.row.updateAt)
              }}</span>
            </template>
          </el-table-column>

          <el-table-column width="250" align="center">
            <template slot="header">
              <el-input
                v-model="search"
                size="small"
                placeholder="输入关键字搜索"
                suffix-icon="el-icon-search"
              />
            </template>
            <template slot-scope="scope">
              <el-button type="text" @click="writeInfo(scope.row.id)">查看</el-button>
              <el-button type="text" @click="updateInfo(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="deleteInfo(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="添加" width="30%" :visible.sync="isShow">
          <el-form :rules="rules" label-width="50px" ref="base" :model="form">
            <el-form-item label="主题" prop="name">
              <el-input v-model="form.name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="权重" prop="orderBy">
              <el-input v-model.number="form.orderBy" type="text"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button>取 消</el-button>
            <el-button type="primary" @click="submitInfo('base')"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </main>
  </div>
</template>

<script>
import request from "../utils/request";
import moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      rules: {
        name: [
          { required: true, message: "请输入主题名称", trigger: "blur" },
          { min: 3, message: "长度最少3个字符", trigger: "blur" },
        ],
        orderBy: [
          { required: true, message: "权重必须为数字", type: "number" },
        ],
      },
      search: "",
      isShow: false,
      form: {
        name: "",
        orderBy: "",
      },
      edit: false,
      updateId: null,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    handleDate(e) {
      return moment(e).format("YYYY-MM-DD HH:mm:ss");
    },
    getInfo() {
      request.get("/article").then((res) => {
        this.tableData = res.data;
      });
    },
    createArticle() {
      this.isShow = true;
    },
    updateInfo(e) {
      this.form.name = e.theme;
      this.form.orderBy = e.sort;
      this.isShow = true;
      this.edit = true;
      this.updateId = e.id;
    },
    deleteInfo(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request.delete(`/article/${id}`).then((res) => {
          this.$message.success(res.data);
          this.getInfo();
        });
      });
    },
    writeInfo(id) {
      this.$router.push({
        name:'writeBook',
        query: {
          articleId: id,
        },
      });
      console.log(id);
    },
    submitInfo(formName) {
      if (this.edit) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request
              .patch(`/article/${this.updateId}`, this.form)
              .then((res) => {
                if (res.data) {
                  this.$message.success(res.data);
                  this.getInfo();
                  this.isShow = false;
                }
              })
              .catch((error) => {
                if (error) {
                  this.$refs.base.resetFields();
                }
              });
          }
        });
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request
              .post("/article/create", this.form)
              .then((res) => {
                this.$message({
                  type: "success",
                  duration: 1300,
                  message: `${res.data}`,
                });
                this.isShow = false;
              })
              .catch((error) => {
                if (error) {
                  this.$refs.base.resetFields();
                }
              });
          } else {
            this.$message.error("请按照规范输入");
            return false;
          }
        });
      }
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
}
</style>