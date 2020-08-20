<template>
  <div class="menu">
    <scroll class="tab-menu" :probe-type="3">
      <div class="menu-list">
        <div class="menu-list-item"
             v-for="(item, index) in categories"
             :class="{active: index === currentIndex}"
             :key="index"
             @click="menuClick(index)">
          {{item.title}}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll"
  export default {
    name: "CateTabMenu",
    components: {
      Scroll
    },
    props: {
      categories: {
        type:Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    mounted(){
    },
    methods: {
      menuClick(index) {
        this.currentIndex = index
        this.$emit('menuClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list .active {
    font-weight: 700;
    color: rgb(255,87,119);
    background-color: #fff;
    border-left: 3px solid rgb(255,87,119);
  }
</style>
