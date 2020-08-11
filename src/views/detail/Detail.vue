<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import {getDetail, Goods, Shop} from "network/detail"

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      }
    },
    created(){
      //保存iid
      // console.log(this.$route)
      this.iid = this.$route.params.iid

      //根据iid获取信息
      this.getDetail()

    },
    mounted() {
    },
    methods: {
      /**
       * 事件监听
       */
      /**
       * 获取数据
       */
      getDetail(){
        getDetail(this.iid).then(res => {
          //查看接口返回数据
          // console.log(res)
          const result = res.result
          //获取轮播图数据
          this.topImages = res.result.itemInfo.topImages
          // console.log(this.topImages)

          //获取商品信息
          this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)

          //获取店铺信息
          this.shop = new Shop(result.shopInfo)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
