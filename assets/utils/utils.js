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

/**
 * 树遍历来源
 * https://blog.csdn.net/weixin_42069147/article/details/115534398
 */
/**
 * 深度优先遍历
 * @param {*} tree 
 * @param {*} func 
 * @param {*} times 
 * @returns 
 */
function treeFilter(tree, func, times = 0) {
    if (times > 1) { // 限制递归次数
        return false;
    }
    times++;
    // 使用map复制一下节点，避免修改到原树
    return tree
        .map((node) => ({ ...node }))
        .filter((node) => {
            node.children = node.children && treeFilter(node.children, func, times);
            return func(node) || (node.children && node.children.length);
        });
}


/**
 * 广度优先遍历
 * @param {*} tree 
 * @param {*} func 
 */
function treeForeachBreadth(tree, func) {
    let node, list = [...tree]
    while (node = list.shift()) {
        func(node)
        node.children && list.push(...node.children)
    }
}

/**
 * 先序遍历
 * @param {*} tree 
 * @param {*} func 
 */
function firstSequenceTraversal(tree, func) {
    tree.forEach(data => {
        func(data)
        data.children && firstSequenceTraversal(data.children, func) // 遍历子树
    })
}

/**
 * 后序遍历
 * @param {*} tree 
 * @param {*} func 
 */
function afterSequenceTraversal(tree, func) {
    tree.forEach(data => {
        data.children && afterSequenceTraversal(data.children, func) // 遍历子树
        func(data)
    })
}

/**
 * 路径 
 * @param {*} tree 
 * @param {*} func 
 * @param {*} path 
 * @param {*} result 
 * @returns 
 */
function treeFindPath(tree, func, path = [], result = []) {
    for (const data of tree) {
        path.push(data.id)
        func(data) && result.push([...path])
        data.children && treeFindPath(data.children, func, path, result)
        path.pop()
    }
    return result
}

/**
 * canvas 大小自适应
 * @param {*} renderer cenvas父容器
 */
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    returnneedResize;
}


