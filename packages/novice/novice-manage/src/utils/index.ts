/**
 * @returns GUID 如 e2530f27-27f0-af1a-aa1d-01eb4c7491c6
 */
export function getGUID(): string {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * 用于vue设置高亮字符串
 * @param text 目标字符串
 * @param keyWord 匹配字段，空格分割可多次匹配
 * @param className 高亮样式
 * @returns 替换text中的keyWord, 需要设置className样式
 */
export function getHighlight(text: string, keyWord: string, className: string = "list-retrieval-highlight"): string {
  const keyWordList = keyWord?.split(" ").filter((item: string) => { return !!item; });
  const regList = keyWordList?.map((keyWord) => new RegExp(keyWord, "g"));
  let res = text;
  regList?.forEach((reg, index) => { 
    res = res?.replace(reg, `<span class="${className}">${keyWordList[index]}</span>`); 
  });
  return res;
}


/**
 * 防抖函数
 * @param fn 
 * @param delay 
 */
export function deounce(fn:Function,delay:number) {
  let timer:any = null;
  return function(){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
    },delay)
  }
}