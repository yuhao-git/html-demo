
import { Base } from '@antv/layout/lib/layout/base';

import { maxLevel, nodeWidth } from '../../registerShape.js';

/**
 * 默认从左到右（maxLayer--->minLayer)
 * 默认居中对齐
 */
class CustomDagreLayout extends Base {
  constructor(options) {
    super();
    this.begin = [0, 0]; /** 布局的起始（左上角）位置 */
    this.nodesep = 150; // 节点水平间距(px)
    this.ranksep = 500; // 每一层节点之间间距
    this.updateCfg(options);
  }


  getDefaultCfg() {
    return {
      nodesep: 200, // 节点水平间距(px)
      ranksep: 600, // 每一层节点之间间距
      begin: [0, 0], // 布局的起点位置
    };
  }

  /**
   * 执行布局算法。
   * 该方法通过计算节点和边的位置，来布局整个图。它使用了层遍历的方法，将节点按层级进行排列。
   * 层与层之间的距离由ranksep决定，同一层内节点之间的距离由nodesep决定。
   * 开始布局的位置由begin参数指定。
   */
  execute() {
    // 保存当前实例的引用
    const self = this;
    // 解构获取节点、边、以及布局参数
    const { nodes, edges, ranksep, nodesep, begin } = self;
    // 如果没有节点，则直接返回
    if (!nodes) return;
    // 使用Map来存储按层级划分的节点
    const layerMap = new Map();
    // 遍历所有节点，按层级归类
    nodes.forEach((item, index, arr) => {
      if (!layerMap.has(item.level)) {
        layerMap.set(
          item.level,
          arr.filter((node) => node.level === item.level)
        );
      }
    });

    // 初始化布局的起始位置和最大宽度、高度
    // TODO 重新调整层级
    const startX = begin[0];
    const startY = begin[1];
    const size = layerMap.size;
    const nodeWidth = 100; // 假设每个节点的宽度
    const maxWidth = size * nodeWidth + (size - 1) * ranksep;
    // 计算每一层的高度，并找出最大高度
    const hr = Array.from(layerMap.values()).map((list) => {
      const sum = list.reduce((pre, curr) => {
        return pre + curr.size[1];
      }, 0);
      return sum + (list.length - 1) * nodesep;
    });
    const maxHeight = Math.max(...hr);
    // 计算布局的结束位置
    const offsetX = startX + maxWidth;
    const offsetY = startY + maxHeight;
    // 计算中间线的位置，用于垂直居中布局
    const centerLine = offsetY - maxHeight / 2;

    // 遍历每一层，计算每个节点的最终位置
    layerMap.forEach((value, key) => {
      // 根据层级计算偏移量
      let d = key === maxLevel ? size - 1 : key;
      const x = offsetX - d * (nodeWidth + ranksep);
      const y = centerLine + hr[d] / 2;
      // 在同一层内，按节点的order排序
      const sortNodes = value.sort((x, y) => y.order - x.order);
      let preY = y;
      // 遍历当前层的每个节点，计算其位置
      sortNodes.forEach((e, index) => {
        const { size } = e;
        const margin = index === 0 ? 0 : nodesep;
        preY = preY - size[1] - margin;
        e.x = x;
        e.y = preY;
      });
    });
    // 如果定义了布局结束的回调函数，则调用它
    if (self.onLayoutEnd) self.onLayoutEnd();
  }

  getType() {
    return 'lineageLayout';
  }
}

export default CustomDagreLayout;





