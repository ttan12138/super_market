<template>
  <div id="account">
    <div class="account-item" v-for="(item, index) in accountInfo" :key="index" :class="{border: index !== 0}">
      <div class="number">{{item.num}} <span style="font-size: 20px; line-height: 23px;">{{item.unit}}</span></div>
      <div class="describe">{{item.describe}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileAccount",
    props:{
      accountInfo: {
        type: Array,
        default() {
          return [
            { //balance: 0,
              num: '0.00',
              describe: '我的余额',
              unit: '元'
            },
            { //desc: 0,
              num: 0,
              describe: '我的优惠',
              unit: '个'
            },
            {//integral: 0,
              num: 0,
              describe: '我的积分',
              unit: '个'
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  #account {
    font-size: 13px;
    background-color: #fff;
    padding: 0 15px 0 15px;
    color: #666;
    display: flex;
    border-bottom: 3px solid rgba(0, 0, 0, .04);
  }

  .account-item {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
  }

  .account-item.border {
    align-items: center;
    height: 30px;
    border-left: 3px solid #ff5f3e;
  }
  .account-item .number {
    color: #ff5f3e;
    font-size: 23px;
    margin-bottom: 10px;
  }
</style>
