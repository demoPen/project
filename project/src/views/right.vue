<template>
  <div class="right">
      <el-carousel height="150px">
      <el-carousel-item v-for="(item,index) in path" :key="index">
        <!-- <h3 class="small">{{ item }}</h3>
         -->
         <img :src="item.icon" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: [
        { icon: require("@/assets/img/login.png") },
        { icon: require("@/assets/img/login.png") },
        { icon: require("@/assets/img/login.png") },
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
  background-color: rgb(108, 10, 10);
  /* border-left: 10px solid #ebedee; */
}
</style>