<template>
  <div class="content">
    <div class="addbook">
      <el-button type="primary" icon="el-icon-plus" @click="addBooks"
        >添加书籍</el-button
      >
    </div>
    <el-table
      stripe
      border
      style="width: 100%;"
      height="calc(100vh - 41px)"
      :data="orderbooklist"
    >
    <template slot="empty"
            ><img
              height="100"
              src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          /></template>
      <el-table-column label="序号" width="100" type="index" align="center">
      </el-table-column>
      <el-table-column label="书籍名称" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面" width="160" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="showImg" />
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ handleDate(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ handleDate(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="bookDetail(scope.row.id)"
            >查看书籍</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="
              editBook(
                scope.row.id,
                scope.row.title,
                scope.row.order,
                scope.row.img
              )
            "
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteBook(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加" width="30%" :visible.sync="isShow">
      <div id="cover">
        <span class="cover_cover">上传封面:</span>
        <el-upload
          :action="getUploadUrl()"
          list-type="picture-card"
          name="cover"
          :on-success="handleSuccess"
          :file-list="fileList"
          ref="elUpload"
          :on-remove="removeImg"
          :limit="1"
          :multiple="false"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <el-form>
        <el-form-item label="书籍名称">
          <el-input v-model="name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="排序权重">
          <el-input v-model="orderBy" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  data() {
    return {
      booklist: [],
      isShow: false,
      name: "",
      orderBy: "",
      fileList: [],
      img: "",
      orderbooklist: [],
      isEdit: false,
      updateId: null,
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      request.get("/file/bookContent").then((res) => {
        this.booklist = res.data;
        this.handleBooklist();
      });
    }, //获取所有书籍的数据
    getUploadUrl() {
      return "http://127.0.0.1:9000/file/book";
    },
    cancel() {
      this.isShow = false;
    },
    addBooks() {
      this.isShow = true;
    },
    handleSuccess(response, file) {
      this.img = file.response.file;
    },
    removeImg() {
      this.img = "";
    },
    submitInfo() {
      //添加书籍时提交的信息
      if (this.isEdit) {
        request
          .patch(`file/book/${this.updateId}`, {
            name: this.name,
            order: this.orderBy,
            img: this.img,
          })
          .then((res) => {
            this.$message({
              type: "success",
              message: `${res.data}`,
              duration: 1300,
            });
            this.isShow = false;
            this.orderBy = "";
            this.name = "";
            this.img = "";
            console.log(this.name);
            this.getBookList();
          });
      } else {
        const name = this.name;
        const order = this.orderBy;
        const img = this.img;
        this.$refs.elUpload.clearFiles();
        request.post("/file/bookInfo", { name, order, img }).then((res) => {
          this.$message({
            type: "success",
            message: `${res.data}`,
            duration: 1300,
          });
          this.isShow = false;
          this.orderBy = "";
          this.name = "";
          this.img = "";
          this.getBookList();
        });
      }
    },
    handleDate(e) {
      let appointDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(e)[0];
      return appointDate;
    }, //处理日期
    handleBooklist() {
      //根据权重进行排序
      this.orderbooklist = this.booklist.sort(function (a, b) {
        return a.order - b.order;
      });
    },
    editBook(id, title, order, img) {
      this.isEdit = true;
      this.isShow = true;
      this.updateId = id;
      this.img = img;
      this.orderBy = order;
      this.name = title;
    }, //编辑书籍
    deleteBook(id) {
      //删除书籍
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request.delete(`/file/book/${id}`).then((res) => {
          if (res) this.getBookList();
          if (res)
            this.$message({
              type: "success",
              message: `${res.data}`,
              duration: 1000,
            });
        });
      });
    },
    bookDetail(id) {
      this.$router.push("/server/chapter/" + id);
      console.log(id);
    },
  },
  mounted() {
    this.handleBooklist();
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  min-width: 590px;
  /* margin-left: 70px; */
}
.showImg {
  width: 50%;
  height: 100px;
}
.addbook {
  justify-content: center;
  display: flex;
  background-color: rgb(102, 177, 255);
  /* position: fixed; */
  z-index: 2;
  width: 100%;
}
</style>
