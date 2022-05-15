/**
 * 自增序列 a -> zzzz...
 * @param {*} index 从1开始
 * @param {*} code 
 * @returns 
 */
 function getCodeChar(index, code = "a") {
    if (!index || index < 1) {
        return ""
    }
    index = parseInt(index)
    let baseIndex = code.charCodeAt()
    let result = ""
    if (index <= 26) {
        return String.fromCharCode(index + baseIndex - 1)
    }
    let radix26 = index.toString(26)
    radix26.split("").forEach(item => {
        result += String.fromCharCode(parseInt(item, 26) + baseIndex - 1)
    })
    return result
}

