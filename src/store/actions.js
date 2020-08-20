import {
  ADD_COUNTER,
  ADD_CART
} from "./mutation-types"

export default {
  addToCart(context, payload) {
    return new Promise((resolve, reject) => {
      /*let oldProduct = null
    for(let item of state.cartList){
      if(item.iid === payload.iid){
        oldProduct = item
      }
    }
    if(payload){
      oldProduct.count += 1
    }else{
      payload.count = 1
      state.cartList.push(payload)
    }*/

      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品在购物车中数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_CART, payload)
        resolve('当前商品已经加入购物车')
      }
    })
  }
}
