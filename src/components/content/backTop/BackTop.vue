<template>
  <div class="back-top" @click="backClick">
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods:{
      backClick(){
        this.$emit('backTopClick')
      }
    }
  }
</script>

<style scoped>
  .back-top{
    position: fixed;
    bottom: 50px;
    right: 10px;
  }
  .back-top img {
    height: 50px;
  }

</style>
