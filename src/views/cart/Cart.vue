<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"

  import {mapGetters} from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    data() {
      return {

      }
    },
    computed: {
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        cartLength: 'cartLength',
        cartList: 'cartList'
      })
    },
    methods: {

    },

  }
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
