<template>
  <div class="item-li" @click="serverPath">
    <i :class="icon" :style="Styleactive"></i>
    <span class="text">{{ itemText }}</span>
  </div>
</template>

<script>
export default {
  // name:'menu-item',
  props: {
    itemText: {
      type: String,
    },
    icon: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  methods: {
    serverPath() {
      this.$router.push(this.path).catch((err) => err);
      // console.log(this.$route);
      console.log(this.path);
    },
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !==-1;
    },
    Styleactive(){
      return this.isActive ? {color:'#3e88b3'} :{}
    }
  }
};
</script>

<style scoped>
.item-li {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
}
.item-li i {
  font-size: 30px;
  margin-bottom: 10px;
  transition: all 0.5s;
  margin-top: 8px;
}
.item-li span {
  display: none;
}
.item-li:hover {
  background-color: rgb(219, 213, 213);
  color: #3e88b3;
}
</style>