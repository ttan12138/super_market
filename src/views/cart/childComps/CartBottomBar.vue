<template>
  <div class="bottom-bar">
    <div class="check-box">
      <check-button
                  class="check-button"
                  :value="isSelectAll"
      @checkBtnClick="selectAllClick"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计: {{ totalPrice }}
    </div>
    <div class="calculate" @click="calcClick">
      去结算({{ checkLength }})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed:{
      totalPrice(){
        return this.$store.state.cartList.filter(item => item.checked).reduce((temp, item) => {
          return temp + item.price * item.count
        }, 0)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.$store.state.cartList.length === 0){ return false }

        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        return !(this.$store.state.cartList.find(item => !item.checked))

      }
    },
    methods:{
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买商品', 2000)
        }
      },
      selectAllClick(){
        if(this.isSelectAll){
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else{
          this.$store.state.cartList.filter(item => !item.checked).forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    bottom: 40px;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
    font-size: 14px;
  }

  .check-box {
    position: relative;
    top: 3px;
    display: flex;

    width: 60px;
    align-items: center;
    font-size: 12px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 5px;
  }

  .total-price {
    margin-left: 20px;
    flex: 1;
    text-align: center;
  }

  .calculate {
    width: 120px;
    text-align: center;
    background-color: rgb(255,66,0);
    color: #fff;
  }
</style>
