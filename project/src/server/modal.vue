<template>
  <div>
    <el-dialog title="添加" width="30%" :visible="isShow" @close=cancel>
      <el-upload
        class="upload-demo"
        drag
        accept=".mp4,mpeg,avi"
        :action="getUploadUrl()"
        v-show="urlCode"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip"></div>
      </el-upload>
      <el-form :model="form">
        <el-form-item label="iframe代码" v-show="!urlCode">
          <el-input type="text"></el-input>
        </el-form-item>
        <el-form-item label="视频描述">
          <el-input type="text"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['urlCode','isShow'],
  data() {
    return {
      form: {},
    };
  },
  methods: {
    getUploadUrl() {
      return `http://127.0.0.1:9000/video/location`;
    },
    cancel() {
      this.$emit('close', false);
    },
    confirm() {
      this.$emit('close', false);
    },
  },
};
</script>

<style lang="css" scoped>
</style>