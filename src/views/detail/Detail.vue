<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo" :is-comment="isComment" />
      <detail-recommend-info :recommend-list="recommendList"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailRecommendInfo from "./childComps/DetailRecommendInfo"
  import Scroll from "components/common/scroll/Scroll"
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        isComment: false,
        recommendList: []
      }
    },
    created(){
      //保存iid
      // console.log(this.$route)
      this.iid = this.$route.params.iid

      //根据iid获取信息
      this.getDetail()

      //获取推荐信息
      this.getRecommend()
    },
    mounted() {
    },
    methods: {
      /**
       * 事件监听
       */
      imgLoad() {
        this.$refs.scroll.refresh()
      },
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

          //获取商品详细信息
          this.detailInfo = result.detailInfo

          //获取商品参数信息
          this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)

          //获取评论信息
          if(result.rate.cRate !== 0) {
            this.isComment = true
            this.commentInfo = result.rate.list[0]
          }
        })
      },

      getRecommend() {
        getRecommend().then((res, error) => {
          if (error) return
          this.recommendList = res.data.list
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-navbar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
