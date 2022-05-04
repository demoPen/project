<template>
  <div class="shows">
    <el-dialog :title="code.describeText" :visible="dialogTableVisible" @close="cancel"  fullscreen>
      <div v-html="code.iframe" class="views"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogTableVisible", "code"],
  methods: {
    cancel(){
      this.$emit('close',false);
    }
  }
};
</script>

<style scoped>
.show{
  position: fixed;
  z-index: 22;
  width: 100%;
  height: 100%;
}

</style>