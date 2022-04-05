<template>
  <div class="bookcc">
    <div class="mask">
      <div class="input-groups">
        <el-button type="primary" @click="IsUpdateOrSave">保存</el-button>
      </div>
      <mavon-editor
        v-model="value"
        style="min-height: calc(100vh - 60px)"
        :boxShadow="false"
        @change="changeData"
        :ishljs="true"
        ref="md"
        @imgAdd="$imgAdd"
        @save="IsUpdateOrSave"
      />
      <!-- <article v-html="render" class="markdown-body"></article> -->
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import { uploadImg, pageCode, getMdText, updateCode } from "@/utils/api.js";
export default {
  name: "editBookDetail",
  created() {
    this.getCode();
    // window.addEventListener('popstate',this.popstate,false)
  },
  destroyed() {
    // window.removeEventListener('popstate',this.popstate,false)
  },
  data() {
    return {
      value: "",
      render: "",
      first: "",
    };
  },
  methods: {
    // popstate(){
    //    this.$confirm('当前内容为保存是否保存', '提示', {
    //       confirmButtonText: '保存',
    //       cancelButtonText: '不保存',
    //       type: 'info'
    //     }).then(()=>{
    //       this.IsUpdateOrSave()
    //     }).catch(()=>{
    //       this.$router.back()
    //     })
    // },//浏览器的前进和后退
    changeData(value, render) {
      this.render = marked(render);
      // console.log(marked('injjsj'));
    },
    $imgAdd(pos, $file) {
      const formdata = new FormData();
      formdata.append("image", $file);
      uploadImg(formdata).then((res) => {
        this.$refs.md.$img2Url(pos, res.data);
      });
    },

    save() {
      if (!this.value) {
        this.$message({
          type: "warning",
          message: "编辑内容不能为空",
          duration: 1300,
        });
        return false;
      }
      const { chapterId } = this.$route.query;
      pageCode(chapterId, this.render, this.value).then((res) => {
        if (res) {
          this.$message({
            type: "success",
            duration: 1500,
            message: res.data,
          });
        }
      });
      return true
    },
    updateMd() {
      const { chapterId } = this.$route.query;
      updateCode(chapterId, this.render, this.value).then((res) => {
        if (res.data) {
          this.$message({
            type: "success",
            duration: 1500,
            message: res.data,
          });
        }
      });
    },
    getCode() {
      const { chapterId } = this.$route.query;
      getMdText(chapterId).then((res) => {
        this.first = res.data;

        this.render = res.data[0].md_text;
        this.value = res.data[0].val;
      });
    },
    IsUpdateOrSave() {
      if (this.first.length == 0) {
        const jump = this.save();
        console.log(jump)
        if (jump) {
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        }
      } else {
        this.updateMd();
        setTimeout(() => {
          this.$router.back();
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.bookcc {
  padding-left: 10px;
  width: calc(100% - 70px);
  background-color: rgb(168, 168, 168);
  overflow: scroll;
}
.input-groups {
  display: flex;
  margin-bottom: 10px;
  padding: 2px;
}
.mask {
  background-color: #fff;
}
.article {
  height: 100px;
}
img {
  width: 100px;
}
</style>