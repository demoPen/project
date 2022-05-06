<template>
  <div class="article">
    <main>
      <div class="table">
        <div class="card" v-for="item in fileList" :key="item.id">
         
          <img :src="item.path" />
          <el-tooltip :content='item.describeText'>
            <div
              style="
                font-size: 12px;
                text-align: center;
                margin-top: 10px;
                margin-bottom: 10px;
              "
            >
              {{ item.name }}
            </div></el-tooltip
          >
          <el-button type='text' size='mini' @click="download(item.url)">下载</el-button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  data() {
    return {
      isShow: false,
      form: {
        desc: "",
        url: "",
        name: "",
        originName: "",
      },
      fileList: [],
      rules: {
        desc: [
          { required: true, message: "请输入资源描述", trigger: "blur" },
          { min: 3, message: "长度最少3个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    deleteFile(data){

      request.delete('/resource/info',{data:data}).then(res =>{
        if(res.data){
          this.$message.success(res.data)
          this.getFile()
        }
      })
    },
    getUploadUrl() {
      return `http://127.0.0.1:9000/video/location`;
    },
    handleSuccess(response) {
      this.form.url = response.url;
      this.form.name = response.filename;
      this.form.originName = response.originalname;
    },
    cancel() {
      this.isShow = false;
    },
    uploadResource() {
      this.isShow = true;
    },
    confirm(formName) {
      this.$refs.elUpload.clearFiles();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request.post("/resource/info", this.form).then((res) => {
            if (res.data) {
              this.$message.success(res.data);
              this.isShow = false;
              this.getFile();
              this.$refs.base.resetFields();
            }
          });
        }
      });
    },
    getFile() {
      request.get("/resource/info").then((res) => {
        let result = [];
        let type;
        res.data.forEach((el) => {
          type = el.name.split(".")[1];
          el.type = type;
          el.path = require(`../assets/icon/${type}.png`);
          result.push(el);
        });
        this.fileList = result;
      });
    },
    download(e) {
      // request({
      //   method:'get',
      //   responseType: 'blob',
      //   url:`/video/base/${e}`
      // }).then(res =>{
      //   console.log(res.data);
      // })
      window.open(e);
    },
  },

  created() {
    this.getFile();
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
  overflow: hidden;
  padding: 20px;
}
.card {
  background: rgba(138, 139, 141, 0.2);
  border-radius: 5px;
  width: 80px;
  /* height: 100px; */
  float: left;
  margin-right: 20px;
  padding-top: 13px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.card img {
  width: 80%;
  /* height: 80%; */
}
.card i {
  position: absolute;
  right: 2px;
  top: 2px;
  color: #fff;
  display: none;
  cursor: pointer;
}
.card:hover.card i {
  display: block;
}
</style>