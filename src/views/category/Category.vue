<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-control class="top-tab-control"
                   :titles="['综合', '新品', '销量']"
                   @tabClick="controlClick"
                   ref="tabControl1"
                   v-show="isTabFixed">
      </tab-control>
      <cate-tab-menu :categories="categories" @menuClick="menuClick"></cate-tab-menu>
      <scroll id="tab-content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <div>
          <cate-tab-content :subcategories="showSubcategories"></cate-tab-content>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="controlClick"
                       ref="tabControl2">
          </tab-control>
          <cate-tab-detail :category-detail="showCategoryDetail"></cate-tab-detail>
        </div>
      </scroll>
      <back-top @backTopClick="backTopClick" v-show="isShowBackTop"></back-top>
    </div>
  </div>
</template>

<script>
  import CateTabMenu from "./childComps/CateTabMenu"
  import CateTabContent from "./childComps/CateTabContent"
  import CateTabDetail from "./childComps/CateTabDetail"

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from "components/common/scroll/Scroll"
  import TabControl from "components/content/tabcontrol/TabControl"
  import BackTop from "components/content/backTop/BackTop"

  import {getCategory,getSubcategory,getCategoryDetail} from "../../network/category"
  import {itemListenerMixin, backTopMixin } from 'common/mixin'

  export default{
    name: 'Category',
    components: {
      CateTabMenu,
      CateTabContent,
      NavBar,
      Scroll,
      TabControl,
      CateTabDetail,
      BackTop
    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
      return {
        categories: [],
        categoryData: {
        },
        currentIndex: -1,
        currentType: 'pop',
        isTabFixed: false,
        tabOffsetTop: 1036
      }
    },
    computed:{
      showSubcategories() {
        if(this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },

      showCategoryDetail() {
        if(this.currentIndex === -1) return []
        // const ss = this.categoryData[this.currentIndex].categoryDetail[this.currentType]
        // console.log(ss[0])
        // return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      },
    },
    updated() {
      // console.log(Math.ceil(this.showSubcategories.list.length / 3 ) * 103.6)
      if(this.showSubcategories){
        this.tabOffsetTop = Math.ceil(this.showSubcategories.list.length / 3 ) * 103.6
      }
    },
    created() {
      //请求分类数据
      this._getCategory()
    },
    methods: {
      /*
      * 事件监听
      * */
      menuClick(index) {
        this._getSubcategories(index)
        this.backTopClick()
      },
      controlClick(index) {
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
        this.isShowBackTop = (-position.y) >1000

        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      /*
      * 请求分类页的数据
      * */
      _getCategory() {
        getCategory().then(res => {
          //获取分类数据
          this.categories = res.data.category.list
          //初始化每个类别的子数据
          for(let i = 0; i < this.categories.length; i++){
            this.categoryData[i] = {
              subcategory: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          //请求第一个分类数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index){
        this.currentIndex = index
        const maitKey = this.categories[index].maitKey
        // console.log(maitKey)
        //http://123.207.32.32:8000/api/x6/subcategory?maitKey=596
        getSubcategory(maitKey).then(res => {
          this.categoryData[index].subcategories = res.data
          // console.log(this.categoryData)
          this.categoryData = {...this.categoryData}
          // console.log(this.categoryData)
          this._getCategoryDetail('pop')
          this._getCategoryDetail('new')
          this._getCategoryDetail('sell')
        })
      },
      _getCategoryDetail(type){
        // 获取请求中的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        // 传入miniWallkey和type,获取数据
        getCategoryDetail(miniWallkey, type).then(res => {
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryDetail = {...this.categoryData}
          // console.log(this.categoryData)
        })
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
    overflow: hidden;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
  .top-tab-control  {
    z-index: 9;
    position: fixed;
    left: 100px;
    width: calc(100% - 100px);
  }

</style>
