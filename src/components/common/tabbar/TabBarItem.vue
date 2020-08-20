<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-active"></slot>
    </div>
    <div :style="activeStyle" :class="{active: isActive}">
        <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: Array,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        let pathScode = 0
        for(let i = 0; i < this.path.length; i++){
          if(this.$route.path.indexOf(this.path[i]) !== 0){
            pathScode++
          }
        }
        return !pathScode
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }

    },
    methods: {
      itemClick() {
        this.$router.replace(this.path[0])
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
   font-size: 14px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>
