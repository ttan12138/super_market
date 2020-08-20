<template>
  <div id="profile">
    <nav-bar style="background-color: var(--color-tint)"></nav-bar>
    <profile-user-info></profile-user-info>
    <profile-account></profile-account>
    <profile-list-view :list-data="orderList" class="order-list"></profile-list-view>
    <profile-list-view :list-data="serviceList" class="service-list"></profile-list-view>
  </div>
</template>

<script>
  import ProfileUserInfo from "./childComps/ProfileUserInfo"
  import ProfileAccount from './childComps/ProfileAccount'
  import ProfileListView from "./childComps/ProfileListView"

  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: 'Profile',
    components: {
      ProfileUserInfo,
      ProfileAccount,
      ProfileListView,
      NavBar,

    },
    data(){
      return{
        orderList: [
          {icon: '#message', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#pointer', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#cart', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#shopping', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
.order-list, .service-list {
  margin-top: 12px;
}


</style>
