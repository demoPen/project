<template>
  <div class="server">
    <menu-nav :bgc="{ backgroundColor: '#fff' }">
      <el-tooltip class="item" effect="dark" content="电子书" placement="right">
        <menu-item
          item-text="电子书"
          icon="el-icon-notebook-1"
          path="/server/sbook"
        ></menu-item>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="好文分享"
        placement="right"
      >
        <menu-item
          item-text="好文分享"
          icon="el-icon-reading"
          path="/server/sarticle"
        ></menu-item>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="教学视频"
        placement="right"
      >
        <menu-item
          item-text="教学视频"
          icon="el-icon-video-camera-solid"
          path="/server/svideo"
        ></menu-item>
      </el-tooltip>

      <el-tooltip
        class="item"
        effect="dark"
        content="资源下载"
        placement="right"
      >
        <menu-item
          item-text="资源下载"
          icon="el-icon-download"
          path="/server/sdownload"
        ></menu-item>
      </el-tooltip>
    </menu-nav>

    <router-view></router-view>
  </div>
</template>

<script>
import MenuNav from "@/components/common/Left-nav/Menu.vue";
import MenuItem from "@/components/common/Left-nav/Menu_item.vue";
export default {
  name: "server",
  data() {
    return {};
  },
  components: {
    MenuNav,
    MenuItem,
  },
  methods: {
    transformStyle() {},
  },
};
</script>

<style scoped>
.server {
  display: flex;
  min-height: 500px;
  min-width: 700px;
  position: relative;
  /* width: 100%; */
}
</style>
