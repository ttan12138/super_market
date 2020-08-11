<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg"/>
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active: isClick == index}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
      <div slot="right"></div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "detailNavBar",
    components: {
      NavBar,
    },
    data(){
      return {
        titles: ['商品', '参数', '评价', '推荐'],
        isClick: 0
      }
    },
    methods: {
      titleClick(index) {
        this.isClick = index
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 14px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: #ff5777;
  }
  .back img{
    margin-top: 12px;
    margin-left: 15px;
  }
</style>
