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
         <div class="empty" v-show="filterArticle.length == 0">
        <el-empty description="暂无数据"></el-empty>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
export default {
  name: "Article",
  data() {
    return {
      bookData: [],
      articleData: [],
      search: "",
      search2: "",
    };
  },
  created() {
    this.getInfo();
  },
  computed: {
    filterArticle() {
      return this.search2
        ? this.articleData.filter((item) => item.theme.includes(this.search2))
        : this.articleData;
    },
  },
  methods: {
    getInfo() {
      request.get("/article").then((res) => {
        this.articleData = res.data
      });
    },
    handleDate(e) {
      let appointDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(e)[0];
      return appointDate;
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
  border-radius: 10px;
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
</style>