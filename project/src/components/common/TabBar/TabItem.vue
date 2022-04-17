<template>
  <div class="tab_item" @click="itemClick">
      <div  :class="{'text':true,'ispath':isActive}">
      <slot name="text-item"></slot>
    </div>  
  </div>
</template>

<script>
  export default {
    name:'TabItem',
    props: {
     path:{
       type:String,
       require:true
     }
    },
    methods: {
      itemClick(){
        this.$router.push(this.path).catch(err => err);
      }
    },
    computed: {
      isActive(){
        return this.$route.path === this.path
      }
    }
  }
</script>

<style scoped>
.tab_item{
  flex: 1;
}
.text{
  text-align: center;
  line-height: 100%;
  height: 100%;
  display: flex;
  /* width:80px; */
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 17px;
}
.ispath::after{
 display: block;
  position: absolute;
  content: '';
  width: 80px;
  height: 3px;
  background-color: cornflowerblue;
  bottom: 0;
}
.text:hover::after{
  display: block;
  position: absolute;
  content: '';
  width: 80px;
  height: 3px;
  background-color: cornflowerblue;
  bottom: 0;
}

</style>