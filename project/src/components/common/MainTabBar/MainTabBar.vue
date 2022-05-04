<template>
  <div>
    <div class="main_bar">
      <div class="logo">
        <img src="@/assets/img/loo.png" alt="" srcset="" />
        <img src="@/assets/img/logo.png" alt="" />
      </div>
      <tab-bar class="tab_nav">
        <tab-item path="/home">
          <div slot="text-item">首页</div>
        </tab-item>
        <tab-item path="/book">
          <div slot="text-item">电子书</div>
        </tab-item>
        <tab-item path="/article">
          <div slot="text-item">好文分享</div>
        </tab-item>
        <tab-item path="/video">
          <div slot="text-item">学习视频</div>
        </tab-item>
        <tab-item path="/resource">
          <div slot="text-item">资源下载</div>
        </tab-item>
      </tab-bar>
      <div class="wrap">
        <!-- <div class="search">
          <input type="text" class="searchTerm" placeholder="搜索" />
          <button type="submit" class="searchButton">
            <img src="@/assets/img/search.png" alt="" />
          </button>
        </div> -->
      </div>
    </div>
    <div class="content">
      <div class="left">
        <router-view></router-view>
      </div>
      <div style="width:300px">

      <right-content></right-content>
      </div>
    </div>
  </div>
</template>
<script>
import TabBar from "@/components/common/TabBar/TabBar.vue";
import TabItem from "@/components/common/TabBar/TabItem.vue";
import RightContent from "@/views/right.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabItem,
    RightContent,
  },
};
</script>

<style scoped>
.main_bar {
  display: flex;
  padding: 0 30px;
  box-shadow: 0 5px #ebedee;
  min-width: 1000px;

  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  left: 0;
  background-color: #fff;
}
.logo {
  flex: 1;
}
.logo {
  display: flex;
}
.warp {
  flex: 1;
}
.logo img {
  height: 70px;
}
.tab_nav {
  flex: 4;
}
.search {
  /* position: relative; */
  display: flex;
  margin-top: 20px;
}

.searchTerm {
  width: 100%;
  border: 1px solid #b1b7b8;
  border-right: none;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  outline: none;
  /* color: #9DBFAF; */
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #b1b7b8;
  border-left: 0;
  background: #fff;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}
.searchButton img {
  width: 20px;
  margin-top: 2px;
}
.content {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 74px;
  min-width: 800px;
  /* width: calc(100% ); */
  flex:1;

}
.left {
  /* padding-right: 10px; */
  flex: 1;

  background: #ebedee;
}
.wrap{
  width: 200px;
}
</style>