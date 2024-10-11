/**
 * 类型判断
 * @param {*} param 待判断对象
 * @param {*} type 要判断的类型 "object" | "array" ... 
 * @returns boolean 对象类型和预期是否一致
 */
function typeJudgment(param, type) {
  let res = Object.prototype.toString.call(param);
  let _type = res.match(/\[object (.*?)\]/)[1].toLowerCase();
  return type === _type
};

function createTestType() {
  let mapData = {
    "isObject": "object",
    "isArray": "array",
    "isNumber": "number",
    "isNull": "null",
    "isUndefined": "undefined",
    "isRegex": "regex",
    "isDate": "date",
    "isString": "string",
    "isBoolean": "boolean",
    "isError": "error"
  }
  for (let key in mapData) {
    let str = `
    function ${key}(param) {
      return typeJudgment(param, '${mapData[key]}')
    }    
    `
    // console.log(str)
  }
}

function isObject(param) {
  return typeJudgment(param, 'object')
}


function isArray(param) {
  return typeJudgment(param, 'array')
}


function isNumber(param) {
  return typeJudgment(param, 'number')
}


function isNull(param) {
  return typeJudgment(param, 'null')
}


function isUndefined(param) {
  return typeJudgment(param, 'undefined')
}


function isRegex(param) {
  return typeJudgment(param, 'regex')
}


function isDate(param) {
  return typeJudgment(param, 'date')
}


function isString(param) {
  return typeJudgment(param, 'string')
}


function isBoolean(param) {
  return typeJudgment(param, 'boolean')
}


function isError(param) {
  return typeJudgment(param, 'error')
}

export {
  isObject,
  isArray,
  isNumber,
  isNull,
  isUndefined,
  isRegex,
  isDate,
  isString,
  isBoolean,
  isError
}