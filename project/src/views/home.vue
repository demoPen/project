<template>
  <div class="home">
    <div style="font-size: 18px; background: #fff; padding: 20px">精选书籍</div>
    <div class="showCard" style="padding: 10px 40px">
      <div class="card">
        <img src="@/assets/img/login.png" alt="" />
        <div style="font-size: 14px; font-weight: bold">
          介绍hhhhhhhhhah哈哈哈哈哈哈
        </div>
        <div class="text">
          <div style="line-height: 28px; font-size: 12px">2022</div>
          <el-button size="mini">Yue</el-button>
        </div>
      </div>

      <div class="card">
        <img src="@/assets/img/login.png" alt="" />
        <div style="font-size: 14px; font-weight: bold">
          介绍hhhhhhhhhah哈哈哈哈哈哈
        </div>
        <div class="text">
          <div style="line-height: 28px; font-size: 12px">2022</div>
          <el-button size="mini">Yue</el-button>
        </div>
      </div>
      <div class="card">
        <img src="@/assets/img/login.png" alt="" />
        <div style="font-size: 14px; font-weight: bold">
          介绍hhhhhhhhhah哈哈哈哈哈哈
        </div>
        <div class="text">
          <div style="line-height: 28px; font-size: 12px">2022</div>
          <el-button size="mini">Yue</el-button>
        </div>
      </div>
      <div class="card">
        <img src="@/assets/img/login.png" alt="" />
        <div style="font-size: 14px; font-weight: bold">
          介绍hhhhhhhhhah哈哈哈哈哈哈
        </div>
        <div class="text">
          <div style="line-height: 28px; font-size: 12px">2022</div>
          <el-button size="mini">Yue</el-button>
        </div>
      </div>
      <div class="card">
        <img src="@/assets/img/login.png" alt="" />
        <div style="font-size: 14px; font-weight: bold">
          介绍hhhhhhhhhah哈哈哈哈哈哈
        </div>
        <div class="text">
          <div style="line-height: 28px; font-size: 12px">2022</div>
          <el-button size="mini">Yue</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.showCard {
  overflow: hidden;
  justify-content: space-between;
  background-image: linear-gradient(
    to bottom,
    #e6d7df,
    #ded3dd,
    #d7d0da,
    #cfccd7,
    #c8c9d3,
    #c7ccd6,
    #c7ced8,
    #c6d1da,
    #cadbe4,
    #cfe6ec,
    #d4f1f3,
    #dbfbf9
  );
  align-content: flex-start;
}
.card {
  height: 230px;
  width: 200px;
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
.card img {
  width: 100%;
}
.card .text {
  justify-content: space-around;
  display: flex;
}
</style>