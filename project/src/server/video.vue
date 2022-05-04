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
        <el-collapse v-model="activeName">
          <el-collapse-item name="1">
            <template slot="title">
              <div><i class="el-icon-film"></i> <span>本地视频</span></div>
            </template>
            <div class="search">
              <el-input
                v-model="search"
                placeholder="请输入关键词进行搜索"
                suffix-icon="el-icon-search"
              />
            </div>
            <div style="overflow: hidden">
              <el-card
                class="box-card"
                v-for="item in filterData"
                :key="item.id"
              >
                <div slot="header" class="clearfix">
                  <span>{{ item.describeText }}</span>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    icon="el-icon-delete"
                    @click="deleteVideo(item)"
                    >删除</el-button
                  >
                </div>
                <video :src="item.video" controls></video>
              </el-card>
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <template slot="title">
              <div><i class="el-icon-film"></i> <span>iframe视频</span></div>
            </template>
            <div class="search">
              <el-input
                placeholder="请输入关键词进行搜索"
                suffix-icon="el-icon-search"
                v-model="search2"
              ></el-input>
            </div>
            <div style="overflow: hidden">
              <el-card
                class="box-card iframe"
                v-for="item in filterIframe"
                :key="item.id"
              >
                <div slot="header" class="clearfix">
                  <span>{{ item.describeText }}</span>
                  <el-button
                    style="float: right; padding: 3px 0; margin-left: 10px"
                    type="text"
                    icon="el-icon-view"
                    @click="preview(item)"
                    >预览</el-button
                  >
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    icon="el-icon-delete"
                    @click="deleteVideo(item)"
                    >删除</el-button
                  >
                </div>
              </el-card>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <modal :urlCode="urlCode" :isShow="isShow" @close="close"></modal>
      <view-modal
        :dialogTableVisible="dialogTableVisible"
        :code="code"
        @close="close"
      ></view-modal>
    </main>
  </div>
</template>

<script>
import Modal from "./modal.vue";
import ViewModal from "./view.vue";
import request from "@/utils/request.js";
export default {
  components: {
    Modal,
    ViewModal,
  },
  created() {
    this.getVideo();
  },
  data() {
    return {
      isShow: false,
      urlCode: "",
      activeName: ["1", "2"],
      location: [],
      search: "",
      iframe: [],
      search2: "",
      dialogTableVisible: false,
      code: "",
    };
  },
  computed: {
    filterData() {
      return this.search
        ? this.location.filter((item) =>
            item.describeText.includes(this.search)
          )
        : this.location;
    },
    filterIframe() {
      return this.search2
        ? this.iframe.filter((item) => item.describeText.includes(this.search2))
        : this.iframe;
    },
  },
  methods: {
    uploadUrl(e) {
      this.isShow = true;
      this.urlCode = e == "location";
    },
    close(e) {
      this.isShow = e;
      this.dialogTableVisible = e
      this.getVideo();
    },
    getVideo() {
      request.get("/video/videoInfo").then((res) => {
        this.location = res.data;
      });
      request.get("/video/iframeInfo").then((res) => {
        this.iframe = res.data;
      });
    },
    deleteVideo(e) {
      // alert(e);
      let videoType = e.video ? "videoInfo" : "iframeInfo";
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request.delete(`/video/${videoType}`, { data: e }).then((res) => {
          this.$message.success(res.data);
          if (res) this.getVideo();
        });
      });
    },
    preview(item) {
      this.dialogTableVisible = true;
      this.code = item;
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
.table i {
  font-size: 20px;
  margin-right: 20px;
  display: inline-block;
}
.box-card {
  width: 300px;
  height: 180px;
  float: left;
  margin-right: 20px;
}
.search {
  width: 230px;
  padding-bottom: 20px;
}
video {
  width: 100%;
  height: 100%;
}
</style>
