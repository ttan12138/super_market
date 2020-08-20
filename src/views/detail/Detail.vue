<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @titleClick="titleClick" :curr-index="currIndex"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" @imgLoad="imgLoad"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo" :is-comment="isComment" />
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"/>
    </scroll>
    <back-top @backTopClick="backTopClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart"/>
<!--    <toast :message="message" :show="isShowToast"></toast>-->
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
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import Scroll from "components/common/scroll/Scroll"
  // import Toast from "components/common/toast/Toast"  //自封装toast-引入
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"
  import {itemListenerMixin, backTopMixin} from "common/mixin"
  import {debounce} from "../../common/utils"
  import {BACKTOP_DISTANCE} from "common/const"

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
      DetailBottomBar,
      Scroll,
      // Toast
    },
    mixins: [itemListenerMixin, backTopMixin],
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
        recommendList: [],
        themeTopYs: [],
        getThemeTopY: null,
        currIndex: 0,
        // message: '',       //自封装toast-属性
        // isShowToast: false
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

      //获取标题内容联动高度元素
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)
    },
    destroyed() {
      this.$bus.$off('itemImageLoad')
    },
    methods: {
      /**
       * 事件监听
       */
      imgLoad() {
        this.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 1000)
      },
      contentScroll(position) {

        const positionY = -position.y + 45
        for(let i in this.themeTopYs) {
          if(positionY >= this.themeTopYs[parseInt(i)] && positionY < this.themeTopYs[parseInt(i) + 1]){
              this.currIndex = parseInt(i)
          }
        }

        this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
      },
      addToCart() {
        //获取购物车中展示的信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        // console.log(product)

        //将商品添加到购物车
        this.$store.dispatch('addToCart', product).then(res => {
        // this.addToCart(product).then(res => {
          //自封装toast
          /*this.message = res
          this.isShowToast = true
          setInterval(() => {
            this.isShowToast = false
          },3000)*/
          console.log(this.$toast)
          this.$toast.show(res, 5000)

        })
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

          //dom渲染完成执行
          this.$nextTick(() => {

          })
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
