export function debounce(func, delay) {
  let timer = null

  return function (...args) {
    if(timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}

/*
* 传入date对象和结果格式，返回转换结果
* */
export function formatDate(date, fmt) {
  if(/(y+)/.test(fmt)){
    //匹配年格式y * n，将匹配到的年y * n换成换算好的年份
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  //同上年份转换，依次对其它格式进行转换
  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length ===1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
 return ('00' + str).substr(str.length)
}
