<template>
  <div id="tab-content">
    <goods-list :goods="categoryDetail"></goods-list>
  </div>
</template>

<script>
  import GoodsList from 'components/content/goods/GoodsList'

  export default {
    name: "CateTabDetail",
    components: {
      GoodsList
    },
    props: {
      categoryDetail: {
        type: Array,
        default(){
          return []
        }
      }
    }

  }
</script>

<style scoped>

</style>
