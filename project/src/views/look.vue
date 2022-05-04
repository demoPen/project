<template>
  <div class="show">
    <div class="view">
      <h2>{{$route.query.theme}}</h2>
      <mavon-editor
        :ishljs="true"
        ref="md"
        v-html="html"
        style="min-height: 100%; padding: 20px"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
import { getArticleCode } from "@/utils/api.js";
export default {
  data() {
    return {
      html: "",
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const id = this.$route.query.id;
      getArticleCode(id).then(res =>{
        this.html = res.data[0].md_text
      });
    },
  },
};
</script>

<style scoped>
.show {
  width: 100%;
  height: 100vh;
  justify-content: center;
  display: flex;
  background-color: rgb(223, 221, 221);
}
.view {
  width: 60%;
  height: 100%;
  /* background-color: rgb(145, 73, 73); */
  overflow: scroll;
}
h2{
  padding: 10px ;
  background-color: #fff;
  border-radius: 2px;
}
</style>