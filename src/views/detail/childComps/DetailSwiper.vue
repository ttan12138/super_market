<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item" @load="imgLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    date() {
      return{
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    props: {
      topImages:{
        type: Array,
        default() {
          return []
        }
      }
    },
    methods:{
      imgLoad() {
        this.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
