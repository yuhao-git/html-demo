/**
 * 查找数据中的元素，支持自定义匹配条件
 * @param list
 * @param match
 */
export function findItem(list, match) {
    list || (list = [])
    for (let i = 0, len = list.length; i < len; i++) {
        if (match(list[i])) {
            return list[i]
        }
    }
}

/**
 * 查找元素
 * @param list
 *      数组
 * @param childKey
 *      孩子节点key
 * @param match
 *      匹配函数
 * @returns {*}
 */
export function findItemByTree(list, childKey, match) {
    list || (list = [])
    for (let i = 0, len = list.length; i < len; i++) {
        if (match(list[i])) {
            return list[i]
        } else {
            if (list[i][childKey]) {
                const item = findItemByTree(list[i][childKey], childKey, match)
                if (item) {
                    return item
                }
            }
        }
    }
}

/**
 * 查找树形list key路径
 * @param list
 * @param idKey
 * @param childKey
 * @param match
 * @param path
 * @returns {Array}
 */
export function findTreeKeyPath(list, idKey, childKey, match, path = []) {
    list || (list = [])
    for (let i = 0, len = list.length; i < len; i++) {
        if (match(list[i])) {
            path.push(list[i][idKey])
            return path
        } else if (list[i][childKey]) {
            findTreeKeyPath(list[i][childKey], idKey, childKey, match, path)
            if (path.length > 0) {
                path.splice(0, 0, list[i][idKey])
                return path
            }
        }
    }
}