import {
  ADD_COUNTER,
  ADD_CART
} from "./mutation-types"

export default {
  addToCart(context, payload) {
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

    let product = context.state.cartList.find(item => item.iid === payload.iid)

    if (product) {
      context.commit(ADD_COUNTER, product)
    } else {
      payload.count = 1
      context.commit(ADD_CART, product)
    }
  }
}
