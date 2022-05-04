<template>
  <div>
    <el-dialog title="添加" width="30%" :visible="isShow" @close="cancel">
      <el-upload
        class="upload-demo"
        drag
        accept=".mp4,mpeg,avi"
        :action="getUploadUrl()"
        v-show="urlCode"
        name="video"
        ref="elUpload"
        :on-success="handleSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip"></div>
      </el-upload>
      <el-form :model="form" ref="base" :rules="rules">
        <el-form-item label="iframe代码" v-show="!urlCode" prop='iframe' >
          <el-input type="text" v-model="form.iframe"></el-input>
        </el-form-item>
        <el-form-item label="视频描述" prop="desc">
          <el-input type="text" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm('base')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveVideo } from "@/utils/api.js";
export default {
  props: ["urlCode", "isShow"],
  data() {
    return {
      form: {
        url: "",
        filename: "",
        desc: "",
        iframe: "",
      },
      rules: {
        desc: [
          { required: true, message: "请输入视频描述", trigger: "blur" },
          { min: 3, message: "长度最少3个字符", trigger: "blur" },
        ],
        iframe: [
          {message: "权重必须为数字", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getUploadUrl() {
      return `http://127.0.0.1:9000/video/location`;
    },
    handleSuccess(response) {
      this.form.url = response.url;
      this.form.filename = response.filename;
    },
    cancel() {
      this.$emit("close", false);
    },
    confirm(formName) { 
       this.$refs.elUpload.clearFiles();
      let videoType = this.urlCode ? "videoInfo" : "iframeInfo";
      console.log(videoType);
      this.$refs[formName].validate((valid) => {
        if (valid) {
            saveVideo(videoType, this.form).then((res) => {
              if (res.data) {
                this.$message.success(res.data);
                this.$refs.base.resetFields();
              }
            });
            this.$emit("close", false);
          
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
</style>