<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item">
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
    }
  }
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
