<template>
  <div class="right">
      <el-carousel height="150px">
      <el-carousel-item v-for="(item,index) in path" :key="index">
        <!-- <h3 class="small">{{ item }}</h3>
         -->
         <img :src="item.icon" width="100%">
      </el-carousel-item>
    </el-carousel>
    <div class="foo">
      <img src="@/assets/img/right.png" alt="" width="100%">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: [
        { icon: require("@/assets/img/login.png") },
        { icon: require("@/assets/img/login2.png") },
        { icon: require("@/assets/img/login3.png") },
      ],
    };
  },
};
</script>

<style scoped>
.right {
  /* height: calc(100vh - 80px); */
  position: fixed;
  width: 300px;
  right: 0;
  top: 78px;
  bottom: 0;
  /* height: calc(100vh - 80px); */
  /* background-color: rgb(108, 10, 10); */
  /* border-left: 10px solid #ebedee; */
}
.foo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 150px);
}
</style>