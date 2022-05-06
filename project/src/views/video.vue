<template>
  <div class="home">
    <!-- <div><i class="el-icon-film"></i> <span>本地视频</span></div> -->
    <div
      style="font-size: 18px; background: #fff; padding: 20px; display: flex"
      class="head"
    >
      <div style="line-height: 40px">
        <i
          class="el-icon-notebook-1"
          style="color: #5a5ad9; margin-right: 10px"
        ></i
        >精选视频
      </div>
      <div class="search">
        <el-input
          placeholder="请输入关键词进行搜索"
          suffix-icon="el-icon-search"
          v-model="search"
        ></el-input>
      </div>
    </div>

    <div style="overflow: hidden">
      <el-card class="box-card" v-for="item in filterData" :key="item.id">
        <div slot="header" class="clearfix">
          <span>{{ item.describeText }}</span>
       
        </div>
        <video :src="item.video" controls></video>
      </el-card>
        <div class="empty" v-show="filterData.length == 0">
        <el-empty description="暂无数据"></el-empty>
      </div>
    </div>



    <div
      style="font-size: 18px; background: #fff; padding: 20px; display: flex"
      class="head"
    >
      <div style="line-height: 40px">
        <i
          class="el-icon-notebook-1"
          style="color: #5a5ad9; margin-right: 10px"
        ></i
        >网页视频
      </div>
      <div class="search">
        <el-input
          placeholder="请输入关键词进行搜索"
          suffix-icon="el-icon-search"
          v-model="search2"
        ></el-input>
      </div>
    </div>

    <div style="overflow: hidden">
      <el-card class="box-card iframe" v-for="item in filterIframe" :key="item.id">
        <div slot="header" class="clearfix">
          <span>{{ item.describeText }}</span>
           <el-button
              style="float: right; padding: 3px 0; margin-left: 10px"
              type="text"
              icon="el-icon-view"
              @click="preview(item)"
              >预览</el-button
            >
        </div>
      </el-card>
        <div class="empty" v-show="filterIframe.length == 0">
        <el-empty description="暂无数据"></el-empty>
      </div>
    </div>
      <!-- <div class="search">
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
          </div>
        </el-card>
      </div> -->


    <view-modal
      :dialogTableVisible="dialogTableVisible"
      :code="code"
      @close="close"
    ></view-modal>
  </div>
</template>

<script>
import ViewModal from "../server/view.vue";
import request from "@/utils/request.js";
export default {
  components: {
    ViewModal,
  },
  created() {
    this.getVideo();
  },
  data() {
    return {
      isShow: false,
      urlCode: "",
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
      this.dialogTableVisible = e;
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

video {
  width: 100%;
  height: 100%;
}
.search {
  width: 300px;
}
.head {
  justify-content: space-between;
}
</style>
