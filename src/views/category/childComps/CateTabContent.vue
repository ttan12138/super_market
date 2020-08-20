<template>
  <div class="tab-content" v-if="subcategories.list">
    <div class="content-item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img :src="item.image"/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  import GridView from "components/common/gridView/GridView"

  export default {
    name: "CateTabContent",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  }
</script>

<style scoped>
  .tab-content{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  .tab-content .content-item {
    width: 33%;
    height: 100%;
    text-align: center;
    font-size: 12px;
  }

  .content-item img {
    width: 100%;
  }

  .content-item div{
    margin-top: 15px;
  }
</style>
