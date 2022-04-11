<template>
 <div class="article">
    <main>
      <div class="btngroups">
        <el-button type="primary" @click="createArticle">新建文章</el-button>
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
      url:'<iframe  frameborder="0" src="https://www.ixigua.com/iframe/6908629621038809613?autoplay=0" referrerpolicy="unsafe-url" allowfullscreen></iframe>'
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