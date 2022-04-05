<template>
  <div class="left-nav" :style="bgc">
    <input type="checkbox" id="checkbox" />
    <label for="checkbox" @click="spread">
      <span v-if="isSpread">
        <i class="el-icon-s-unfold"></i>
      </span>
      <span v-else>
        <i class="el-icon-s-fold"></i>
      </span>
    </label>
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: "menuNav",
  props: {
    bgc: {
      type: Object,
    },
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    spread() {
      this.isCollapse = !this.isCollapse;
    },
  },
  computed: {
    isSpread() {
      return this.isCollapse;
    },
  },
};
</script>

<style scoped>
#checkbox {
  display: none;
}
.left-nav label {
  position: absolute;
  bottom: 0;
  /* left: 70px; */
  /* width: 100%; */
  height: 43px;
  /* padding-left: 20px; */
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5a738e;
  /* background-color: #ededed; */
  /* border: 1px solid #d9dee4; */
  cursor: pointer;
  white-space: nowrap;
  left: 50%;
  transform: translate(-50%);
  transition: all 0.5s;
  font-size: 25px;
}
label:hover {
  color: cornflowerblue;
}
.left-nav {
  max-width: 300px;
  position: relative;
  /* height: 100%; */
  z-index: 3;
  box-shadow:  0 1px 2px rgb(78, 77, 77);
}
.left-nav input:checked ~ ul {
  width: 190px;
  z-index: -1;
}
.left-nav input:checked ~ label {
  font-size: 25px;
  color: #66b1ff;
  transform: translateX(50px);
  /* transform: translate(-50%); */
  white-space: nowrap;
}

.left-nav input:checked ~ ul .item-li {
  /* background-color: red; */
  flex-direction: row;
  justify-content: space-around;
  width: 190px;
  padding: 0 30px;
}
.left-nav input:checked ~ ul .item-li >>> .text {
  display: block; 
}
.left-nav input:checked ~ ul .item-li >>> i {
  font-size: 20px;
}
ul {
  height: 100vh;
  width: 50px;
  overflow: hidden;
  transition: all 0.5s;
}
</style>
