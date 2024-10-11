/**
 * 防抖
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
function debounce(fn, delay) {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay);
  }
}

// 测试
const test = throttle((name, obj) => {
  console.log(name)
}, 150)

function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

async function d() {
  await delay(50);
  test('1');
  await delay(50);
  test('2');
  await delay(50);
  test('3');
  await delay(50);
  test('4');
}

d();