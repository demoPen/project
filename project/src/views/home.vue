<template>
  <div class="home">
    <div
      style="font-size: 18px; background: #fff; padding: 20px; display: flex"
      class="head"
    >
      <div style="line-height: 40px">
        <i
          class="el-icon-notebook-1"
          style="color: #5a5ad9; margin-right: 10px"
        ></i
        >精选书籍
      </div>
      <div class="search">
        <el-input
          placeholder="请输入关键词进行搜索"
          suffix-icon="el-icon-search"
          v-model="search"
        ></el-input>
      </div>
    </div>
    <div class="showCard" style="padding: 10px 20px">
      <div
        class="card"
        v-for="item in filterData"
        :key="item.id"
        v-show="bookData.length !== 0"
      >
        <div class="showImg">
          <img :src="item.img" alt="" />
        </div>
        <div style="font-size: 14px; font-weight: bold; text-align: center">
          {{ item.title }}
        </div>
        <div class="text">
          <div style="line-height: 28px; font-size: 12px">
            {{ handleDate(item.updateTime) }}
          </div>
          <el-button size="mini" @click="watchBook(item)">阅读</el-button>
        </div>
      </div>
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
        >精选文章
      </div>
      <div class="search">
        <el-input
          placeholder="请输入关键词进行搜索"
          suffix-icon="el-icon-search"
          v-model="search2"
        ></el-input>
      </div>
    </div>
    <div class="showCard" style="padding: 10px 20px">
      <div class="show-article">
        <div v-for="item in filterArticle" :key="item.id" class="list">
          <a @click="watchArticle(item)">{{ item.theme }}</a>
          <h6 style="margin-top: 10px">{{ handleDate(item.updateAt) }}</h6>
        </div>
      </div>
       <div class="empty" v-show="filterArticle.length == 0">
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
        >精选视频
      </div>
      <div class="search">
        <el-input
          placeholder="请输入关键词进行搜索"
          suffix-icon="el-icon-search"
          v-model="search3"
        ></el-input>
      </div>
    </div>

    <div style="overflow: hidden">
      <el-card class="box-card" v-for="item in filterVideo" :key="item.id">
        <div slot="header" class="clearfix">
          <span>{{ item.describeText }}</span>
        </div>
        <video :src="item.video" controls></video>
      </el-card>
      <div class="empty" v-show="filterVideo.length == 0">
        <el-empty description="暂无数据"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
export default {
  name: "Home",
  data() {
    return {
      bookData: [],
      articleData: [],
      search: "",
      search2: "",
      search3:'',
      location:[]
    };
  },
  created() {
    this.getBook();
    this.getInfo();
    this.getVideo();
  },
  computed: {
    filterVideo() {
      return this.search3
        ? this.location.filter((item) =>
            item.describeText.includes(this.search3)
          )
        : this.location;
    },
    filterData() {
      return this.search
        ? this.bookData.filter((item) => item.title.includes(this.search))
        : this.bookData;
    },
    filterArticle() {
      return this.search2
        ? this.articleData.filter((item) => item.theme.includes(this.search2))
        : this.articleData;
    },
  },
  methods: {
    getBook() {
      request.get("/file/bookContent").then((res) => {
        this.bookData = res.data.splice(0, 5);
      });
    },
    getVideo() {
      request.get("/video/videoInfo").then((res) => {
        this.location = res.data;
      });
    },
    getInfo() {
      request.get("/article").then((res) => {
        this.articleData = res.data.splice(0, 6);
      });
    },
    handleDate(e) {
      let appointDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(e)[0];
      return appointDate;
    },
    watchBook(item) {
      this.$router.push({
        name: "watch",
        query: {
          bookId: item.id,
        },
      });
    },
    watchArticle(id) {
      this.$router.push({
        name: "look",
        query: {
          id: id.id,
          theme: id.theme,
        },
      });
    },
  },
};
</script>

<style scoped>
.showCard {
  overflow: hidden;
  justify-content: space-between;
  align-content: flex-start;
}
.card {
  height: 280px;
  border-radius: 4px;
  width: 210px;
  float: left;
  margin: 10px 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(1px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
}
.card .showImg {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card img {
  height: 100%;
}
.card .text {
  justify-content: space-around;
  display: flex;
}
.show-article {
  overflow: hidden;
}
.show-article .list {
  width: 200px;
  float: left;
  background-color: #fff;
  margin-right: 10px;
  padding: 10px;
  box-shadow: 2px 2px 3px rgb(97, 97, 237);
  margin-bottom: 10px;
}
.show-article .list a {
  /* padding: 10px; */
  width: 180px;
  display: block;
  color: #5a5ad9;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.show-article .list a:hover {
  text-decoration: underline;
}
.search {
  width: 300px;
}
.head {
  justify-content: space-between;
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
</style>