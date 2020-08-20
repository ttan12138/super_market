<template>
  <div>
    <div class="toast" v-show="isShow">{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = '默认文字', duration = 2000) {
        this.message = message
        this.isShow = true

        setInterval(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;

    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, .5);
    z-index: 999;
  }
</style>
