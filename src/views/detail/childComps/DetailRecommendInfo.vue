<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <grid-view class="grid-view">
      <goods-list :goods="recommendList" ></goods-list>
    </grid-view>
  </div>
</template>

<script>
  import GoodsList from 'components/content/goods/GoodsList'
  import GridView from "components/common/gridView/GridView"
  export default {
    name: "DetailRecommendInfo",
    components: {
      GridView,
      GoodsList
    },
    props: {
      recommendList: {
        type: Array,
        default(){
          return []
        }
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .grid-view {
    width: 100%;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
