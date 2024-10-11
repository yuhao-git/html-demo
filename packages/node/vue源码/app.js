let obj = {
  arr:[],
  name: "12", info: {
    address: "地址"
  }
}

let arr = ["jjk"]

// 监听数组
const oldArrayProperty = Array.prototype;
// 创建新对象，指向 oldArrayProperty ，扩展新方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach((methodName) => {
  arrProto[methodName] = function () {
    // 触发试图更新
    updateView()
    oldArrayProperty[methodName].call(this, ...arguments)
  }
})


// 视图更新
function updateView() {
  console.log("视图更新")
}

// 核心api
function defineReactive(target, key, value) {
  // 深度监听
  observer(value)

  Object.defineProperty(
    target,
    key,
    {
      get() {
        console.log('获取', value)
        return value
      },
      set(newValue) {
        observer(newValue)
        value = newValue
        console.log(newValue)
        updateView()
      }
    })
}


// 监听对象属性
function observer(target) {
  //  不是对象或数组则不处理
  if (typeof target !== 'object' || target === null) {
    return target
  }

  // 数组处理 
  if (Array.isArray(target)) {
    target.__proto__ = arrProto
  }
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}
observer(obj)

obj.arr.push('wangba')

