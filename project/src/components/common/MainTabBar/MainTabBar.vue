<template>
  <div>
    <div class="main_bar">
      <div class="logo">
        <img
          src="https://www.baidu.com/img/flexible/logo/pc/result.png"
          alt=""
        />
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
        <div class="search">
          <input type="text" class="searchTerm" placeholder="搜索" />
          <button type="submit" class="searchButton">
            <img src="@/assets/img/search.png" alt="" />
          </button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import TabBar from "@/components/common/TabBar/TabBar.vue";
import TabItem from "@/components/common/TabBar/TabItem.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabItem,
  },
};
</script>

<style scoped>
.main_bar {
  display: flex;
  padding: 0 30px;
  box-shadow: 0 5px #ebedee;
  min-width: 1000px;
  overflow: hidden;
}
.logo {
  flex: 1;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
}
.warp {
  flex: 1;
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
</style>