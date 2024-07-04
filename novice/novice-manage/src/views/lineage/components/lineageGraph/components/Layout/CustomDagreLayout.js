
import { Base } from '@antv/layout/lib/layout/base';

import { maxLevel, nodeWidth } from '../../registerShape';

/**
 * 默认从左到右（maxLayer--->minLayer)
 * 默认居中对齐
 */
class CustomDagreLayout extends Base {
  constructor(options) {
    super();
    this.updateCfg(options);
    this.begin = [0, 0]; /** 布局的起始（左上角）位置 */
    this.nodesep = 150; // 节点水平间距(px)
    this.ranksep = 600; // 每一层节点之间间距
  }


  getDefaultCfg() {
    return {
      nodesep: 200, // 节点水平间距(px)
      ranksep: 600, // 每一层节点之间间距
      begin: [0, 0], // 布局的起点位置
    };
  }

  /**
   * 执行布局
   */
  execute() {
    const self = this;
    const { nodes, edges, ranksep, nodesep, begin } = self;
    if (!nodes) return;
    const layerMap = new Map();
    nodes.forEach((item, index, arr) => {
      if (!layerMap.has(item.level)) {
        layerMap.set(
          item.level,
          arr.filter((node) => node.level === item.level)
        );
      }
    });

    // TODO 重新调整层级
    const startX = begin[0];
    const startY = begin[1];
    const size = layerMap.size;
    const maxWidth = size * nodeWidth + (size - 1) * ranksep;
    const hr = Array.from(layerMap.values()).map((list) => {
      const sum = list.reduce((pre, curr) => {
        return pre + curr.size[1];
      }, 0);
      return sum + (list.length - 1) * nodesep;
    });
    const maxHeight = Math.max(...hr);
    const offsetX = startX + maxWidth;
    const offsetY = startY + maxHeight;
    const centerLine = offsetY - maxHeight / 2;

    layerMap.forEach((value, key) => {
      let d = key === maxLevel ? size - 1 : key;
      const x = offsetX - d * (nodeWidth + ranksep);
      const y = centerLine + hr[d] / 2;
      const sortNodes = value.sort((x, y) => y.order - x.order);
      let preY = y;
      sortNodes.forEach((e, index) => {
        const { size } = e;
        const margin = index === 0 ? 0 : nodesep;
        preY = preY - size[1] - margin;
        e.x = x;
        e.y = preY;
      });
    });
    if (self.onLayoutEnd) self.onLayoutEnd();
  }

  getType() {
    return 'lineageLayout';
  }
}

export default CustomDagreLayout;





