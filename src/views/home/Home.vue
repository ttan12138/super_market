<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','最新','精品']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                    @imageLoad="swiperLoad"/>
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control :titles="['流行','最新','精品']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @backTopClick="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView  from "./childComps/HomeRecommendView"
  import HomeFeatureView from "./childComps/HomeFeatureView"
  import TabControl from "components/content/tabcontrol/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import {getHomeMultidata, getHomeGoods} from "../../network/home"
  import Scroll from "components/common/scroll/Scroll"
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  export default {
      name: "Home",
      components: {
        HomeSwiper,
        HomeRecommendView,
        HomeFeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
      },
      mixins: [itemListenerMixin,backTopMixin],
      data() {
        return {
          banners: [],
          recommends: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []},
          },
          currentType: 'pop',
          tabOffsetTop: 534,
          isTabFixed: false,
          saveY: 0,
        }
      },
      computed: {
        showGoods() {
          return this.goods[this.currentType].list
        }
      },
      created() {
        // 请求轮播图等数据
        this.getHomeMultidata()

        // 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
      methods: {
        /**
         * 事件监听相关的方法
         */
        tabClick(index) {
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl2.currentIndex = index
        },
        contentScroll(position){
          //是否显示backtop按钮
          this.isShowBackTop = (-position.y) >1000

          this.isTabFixed = (-position.y) > this.tabOffsetTop

        },
        loadMore(){
          this.getHomeGoods(this.currentType)
        },
        swiperLoad(){
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        /**
         * 网络请求相关的方法
         */
        getHomeMultidata() {
          getHomeMultidata().then(res => {
            // this.result = res;
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
        },
        getHomeGoods(type) {
          const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1

            this.$refs.scroll.finishPullUp()
          })
        }
      },
    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //保存离开时Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //取消图片加载全局事件监听
      this.$bus.$off('homeItemImageLoad', this.homeItemListener)
    }
  }

</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  .content {
    overflow: hidden;
    /*height: calc(100% - 93px);
    margin-top: 44px;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
