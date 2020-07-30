<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NvaBar"
  }
</script>

<style scoped>
  .nav-bar {
    width: 100%;
    display: flex;
    height: 44px;
    line-height: 44px;
    box-shadow: 0px  4px 1px rgba(100,100,100,0.2);
  }
  .left,.right {
    width: 17%;
  }
  .center {
    text-align: center;
    flex: 1;
  }
</style>
