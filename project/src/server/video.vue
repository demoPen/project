<template>
 <div class="article">
    <main>
      <div class="btngroups">
        <el-button type="primary" @click="createArticle">上传视频</el-button>
      </div>
      <div class="table" v-html='url'>
       <!-- <div ></div> -->
      </div>
    </main>
  </div>
</template>

<script>
  export default {
   data() {
     return {
      url:'<iframe src="//player.bilibili.com/player.html?aid=765670802&bvid=BV1Kr4y1i7ru&cid=557660873&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>'
     };
   },
  }
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
}

</style>