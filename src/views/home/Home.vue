<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control class="tab-control"
                   :titles="['流行','最新','精品']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods" />
    </scroll>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView  from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";
  // import BackTop from '../../components/content/backTop/BackTop'
  import TabControl from "../../components/content/tabcontrol/TabControl"
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll"

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
          isShowBackTop: false
        }
      },
      computed: {
        showGoods() {
          return this.goods[this.currentType].list
        }
      },
      created() {
        // 1.请求多个数据
        this.getHomeMultidata()

        // 2.请求商品数据
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
        },
        backClick() {
          this.$refs.scroll.scrollTo(0, 0)
        },
        contentScroll(position) {
          this.isShowBackTop = (-position.y) > 1000
        },
        loadMore() {
          this.getHomeGoods(this.currentType)
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
      }
  }

</script>

<style>
  .home-nav {
    background: #ff5777;
    color: #fffdee;
  }
</style>
  console.log (goods)
