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
    </div>

</template>


<script>
import request from "../utils/request";
export default {
  name: "Book",
  data() {
    return {
      search: "",
      bookData: [],
    };
  },
  created() {
    this.getBook();
  },
  computed: {
    filterData() {
      return this.search
        ? this.bookData.filter((item) => item.title.includes(this.search))
        : this.bookData;
    },
  },
  methods: {
    getBook() {
      request.get("/file/bookContent").then((res) => {
        this.bookData = res.data;
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
.search {
  width: 300px;
}
.head {
  justify-content: space-between;
}
</style>