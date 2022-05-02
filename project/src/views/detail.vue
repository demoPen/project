<template>
  <div class="detail">
    <ul>
      <li :class="{active:activeIndex === index}" v-for="(item,index) in tableData" :key="item.id" @click="getHtml(item.id,index)">
        {{ item.name }}
      </li>
    </ul>
    <main>
      <div class="show">
        <mavon-editor
         :ishljs="true"
         ref="md"
          v-html="html"
          style="min-height: 100%; padding: 20px"
        ></mavon-editor>
      </div>
    </main>
  </div>
</template>

<script>
import { marked } from "marked";
import request from "@/utils/request";
import { getMdText } from "@/utils/api.js";
// pageCode,

// updateCode,
// getArticleCode,
// saveArticle,
// updateArticle,

export default {
  data() {
    return {
      tableData: [],
      value: "",
      html: "",
      activeIndex:0,
    };
  },
  created() {
    //
    this.defalutValue();
  },
  methods: {
    getData() {
      return new Promise((reslove) => {
        const info = this.$route.query;
        if (Object.keys(info)[0] == "bookId") {
          request.get(`/file/chapter/${info.bookId}`).then((res) => {
            this.tableData = res.data;
            reslove(res.data[0]);
          });
        }
      });
    },
    defalutValue() {
      this.getData().then((el) => {
           getMdText(el.id).then((res) => {
          this.html = marked(res.data[0]?.md_text || "");
        });
      });
    },
    getHtml(id,index) {
       this.activeIndex = index
      getMdText(id).then((res) => {
        this.html = marked(res.data[0]?.md_text || "");
        console.log(this.html);
      });
    },
  },
};
</script>

<style scoped>
.detail {
  width: 100%;
  height: 100vh;
  justify-content: center;
  display: flex;
  background-color: rgb(248, 236, 236);
}
ul {
  flex: 1;
  margin-left: 30px;
  padding: 30px 5px;
  background-color: rgb(217, 207, 207);
  font-size: 14px;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 30px;
}
ul > li {
  text-align: left;
  padding: 8px 0 8px 20px;
  border-bottom: 1px solid rgb(176, 172, 172);
  list-style: none;
}
li:hover {
  color: aliceblue;
  background: #000;
  border-radius: 3px;
}
.active{
   color: aliceblue;
  background: rgb(66, 62, 62);
  border-radius: 3px;
}
main {
  width: 50%;
  height: 100%;
  flex: 4;
  background-color: rgb(248, 236, 236);
}
main .show {
  height: calc(100% - 60px);
  background-color: #fff;
  margin-top: 30px;
  overflow: scroll;
}
</style>