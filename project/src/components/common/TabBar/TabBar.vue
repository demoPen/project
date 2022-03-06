<template>
  <div class="tab_bar">
  <slot></slot>
  </div>
</template>

<script>
  export default {
    name:'TabBar'
  }
</script>

<style scoped>
.tab_bar{
  width: 100%;
  
  background-color: #fff;
  display: flex;
}
</style>