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
                data.name.toLowerCase().includes(search.toLowerCase()) ||
                data.address.toLowerCase().includes(search.toLowerCase())
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
          <el-table-column prop="date" label="日期" width="180" align="center">
            <template><i class="el-icon-time"></i></template>
          </el-table-column>
          <el-table-column prop="name" label="主题" align="center">
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
          </el-table-column>
          <el-table-column width="200">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="small"
                placeholder="输入关键字搜索"
                suffix-icon="el-icon-search"
              />
              <div :l="scope"></div>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="添加" width="30%" :visible.sync="isShow">
          <el-form :rules="rules" label-width="50px" ref="base" :model="form">
            <el-form-item label="主题" prop="name">
              <el-input v-model="form.name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="权重" v-show="alterName" prop="orderBy">
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
import request from '../utils/request'
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
      alterName: true,
    };
  },
  methods: {
    createArticle() {
      this.isShow = true;
    },
    submitInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request.post('/article/create',this.form).then(res=>{
            this.$message({
              type:'success',
              duration:1300,
              message:`${res.data}`
            })
            this.isShow = false
          }).catch((error)=>{
            if(error){
              this.$refs.base.resetFields();
            }
          })
        } else {
          this.$message.error('请按照规范输入');
          return false;
        }
      });
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