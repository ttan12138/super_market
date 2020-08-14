import {debounce} from "./utils"
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
  data() {
    return {
      itemListener: null,
      refresh: null
    }
  },

  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500)

    this.itemListener = () => {
      this.refresh()
    }
    //监听item图片加载完成
    this.$bus.$on('itemImageLoad', this.itemListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },

  methods: {
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
  }
}
