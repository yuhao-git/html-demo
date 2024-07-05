import {
  itemHeight,
  maxLevel,
  nodeWidth,
} from "../components/lineageGraph/registerShape.js";

/**
 * 转换数据结构。
 * 
 * 该函数接收一个数据数组，并将其转换为节点和边的集合，用于图形可视化表示。
 * 节点代表数据表或字段，边代表表间关系。
 * 
 * @param {Array} data - 原始数据数组，每个元素包含表字段和引用字段信息。
 * @returns {Object} 返回一个对象，包含转换后的节点和边数组。
 */
export const transformData = (data) => {
  // 存储最终的节点信息
  const nodes = [];
  // 使用Map存储边的信息，以去重
  // 用 map 实现对象去重
  const edgeMap = new Map();
  // 使用Set存储表字段，以去重
  // 用 set 实现表名去重
  const tableFields = new Set();

  // 遍历原始数据，处理每个项
  data.forEach((item) => {
    // 获取目标字段
    const targetField = item.targetField;
    // 处理目标字段，用于统一字段格式
    const tableField = handleTableField(targetField);
    // 将处理后的表字段添加到Set中
    tableFields.add(tableField);
    // 如果存在引用字段，则创建边的信息
    if (item.refFields) {
      createEdge(edgeMap, tableFields, tableField, item.refFields);
    }
  });

  // 根据tableFields创建节点信息
  createNode(nodes, tableFields);
  // 将edgeMap中的边信息转换为数组
  const edges = Array.from(edgeMap.values());

  // 返回包含节点和边的对象
  return {
    nodes,
    edges,
  };
};

/**
 * 创建 Edge 即连线即字段之间的连线
 */
const createEdge = (
  edgeMap,
  tableFields,
  tableField,
  refFields
) => {
  const target = getTableFieldName(tableField);
  const targetName = target.tableName;
  const targetAnchor = target.tableField;
  refFields.forEach((ref) => {
    const tableField = handleTableField(ref);
    tableFields.add(tableField);

    const source = getTableFieldName(tableField);
    const sourceName = source.tableName;
    const sourceAnchor = source.tableField;
    // 不能自连，防止绘制失败
    if (targetName === sourceName) {
      return;
    }

    const edge = {};
    edge.source = sourceName;
    edge.sourceAnchor = sourceAnchor;
    edge.target = targetName;
    edge.targetAnchor = targetAnchor;
    edge.label = ref.label;
    let key = sourceName + sourceAnchor + '-' + targetName + targetAnchor;
    edgeMap.set(key, edge);
  });
};

/**
 * 根据字段信息生成表名和字段名的组合。
 * 
 * 此函数用于处理字段名的格式化，根据字段是否为最终字段，生成不同的表名-字段名组合。
 * 如果字段是最终字段，那么只需返回字段名本身；如果不是最终字段，则返回带有层级和索引的字段名。
 * 这种格式化有助于在处理复杂数据结构时，保持字段名的可追踪性和唯一性。
 * 
 * @param {Object} item - 包含字段相关信息的对象。
 * @param {string} item.fieldName - 字段名。
 * @param {boolean} item.final - 指示字段是否为最终字段的布尔值。
 * @param {string} item.level - 字段所在的层级。
 * @param {number} item.index - 字段在当前层级中的索引。
 * @returns {string} 表名和字段名的组合，或者仅字段名。
 */
/**
 * 拼接表名+字段，逻辑可参考文档
 */
const handleTableField = (item) => {
  // 提取字段名
  const fieldName = item.fieldName;
  // 初始化表名-字段名组合的变量
  let tableField = '';
  // 如果字段是最终字段，直接使用字段名
  if (item.final) {
    tableField = fieldName;
  } else {
    // 如果字段不是最终字段，拼接层级、索引和字段名
    tableField = `${item.level}-${item.index}:${fieldName}`;
  }
  // 返回处理后的表名-字段名组合
  return tableField;
};

/**
 * 拆分字符串获取表名称，字段名称
 */
const getTableFieldName = (item) => {
  const names = item.split(':');
  let tableName = '';
  let tableField = '';
  if (names.length === 1) {
    const array = names[0].split('.');
    tableName = array[1];
    tableField = array[2];
  } else {
    const array = names[1].split('.');
    tableName = array[1] + '_' + names[0];
    tableField = array[2];
  }
  return { tableName, tableField };
};

/**
 * 解析表名获取表的层级和顺序。
 * 
 * 表名的格式假设为：level_number-order_number，此函数负责解析出层级和顺序。
 * 层级和顺序都是基于字符串的数字，需要转换为数值类型。
 * 
 * @param tableField 表的字段名，预期包含层级和顺序信息。
 * @returns {Object} 返回一个对象，包含解析出的层级（level）和顺序（order）。
 */
/**
 * 获取表层级及order
 */
const getTableLevelAndOrder = (tableField) => {
  // 初始化层级为最大层级值，订单为0
  let level = maxLevel;
  let order = 0;
  // 查找最后一个“-”的位置，用于确定层级和订单的分割点
  const endIndex = tableField.lastIndexOf('-');
  // 如果找到了“-”，说明表名中包含层级和订单信息
  if (endIndex !== -1) {
    // 查找最后一个“_”的位置，用于确定层级的起始点
    const startIndex = tableField.lastIndexOf('_');
    // 提取并转换层级字符串为数值
    level = Number(tableField.slice(startIndex + 1, endIndex));
    // 提取并转换订单字符串为数值
    order = Number(tableField.slice(endIndex + 1, tableField.length));
  }
  // 返回包含层级和订单的对象
  return { level, order };
};

/**
 * 创建节点对象并添加到节点数组中。
 * 
 * @param {Array} nodes 节点数组，用于存储创建的节点对象。
 * @param {Array} tableFields 表字段数组，每个元素代表一个表的字段信息。
 */
/**
 * 创建 Node 即节点即表
 */
const createNode = (nodes, tableFields) => {
  // 使用 Map 数据结构存储表名及其字段列表，以便去重。
  const tables = new Map();
  
  // 遍历表字段数组，提取每个字段的信息。
  tableFields.forEach((item) => {
    // 提取表名和字段名。
    const table = getTableFieldName(item);
    const tableName = table.tableName;
    const tableField = table.tableField;

    // 如果当前表名不存在于 Map 中，则添加表名及其字段名；否则，只添加未包含的字段名。
    if (!tables.has(tableName)) {
      tables.set(tableName, [tableField]);
    } else {
      const attrs = tables.get(tableName);
      if (!attrs?.includes(tableField)) {
        attrs?.push(tableField);
        tables.set(tableName, attrs);
      }
    }
  });

  // 遍历 Map 中的每个表，为每个表创建节点对象，并添加到节点数组中。
  tables.forEach((value, key, map) => {
    // 存储每个表的属性对象。
    const attrs = [];
    // 遍历每个表的字段名，创建属性对象。
    value.forEach((attr) => {
      attrs.push({
        nodeId: key,
        key: attr,
        type: '',
      });
    });

    // 获取当前表的层级和排序。
    const { level, order } = getTableLevelAndOrder(key);
    // 计算节点的高度，包括表头。
    const height = itemHeight * (attrs.length + 1);
    // 创建节点对象，并设置各项属性。
    const obj = {
      id: key,
      key: key,
      label: key,
      x: 100,
      y: 100,
      level: level,
      order: order,
      attrs: attrs,
      size: [nodeWidth, height],
    };
    // 将节点对象添加到节点数组中。
    nodes.push(obj);
  });

};

/**
 * 处理表级数据，即当字段级血缘关系为 false 时
 */
export const collapseData = (data) => {
  const nodes = [];
  const edgeMap = new Map();
  const tableFields = new Set();
  data.forEach((item) => {
    const targetField = item.targetField;
    const tableField = handleTableField(targetField);
    tableFields.add(tableField);

    if (item.refFields) {
      createCollapsedEdge(edgeMap, tableFields, tableField, item.refFields);
    }
  });

  const edges = Array.from(edgeMap.values());
  createCollapsedNode(nodes, tableFields);

  return {
    nodes,
    edges,
  };
};

const createCollapsedEdge = (
  edgeMap,
  tableFields,
  tableField,
  refFields
) => {
  const target = getTableFieldName(tableField);
  const targetName = target.tableName;
  refFields.forEach((ref) => {
    const tableField = handleTableField(ref);
    tableFields.add(tableField);
    const source = getTableFieldName(tableField);
    const sourceName = source.tableName;
    // 不能自连，防止绘制失败
    if (targetName === sourceName) {
      return;
    }

    const edge = {};
    edge.source = sourceName;
    edge.sourceAnchor = sourceName;
    edge.target = targetName;
    edge.targetAnchor = targetName;
    edge.label = ref.label;
    let key = sourceName + '-' + targetName;
    edgeMap.set(key, edge);
  });
};

const createCollapsedNode = (nodes, tableFields) => {
  const tables = new Set();
  tableFields.forEach((item) => {
    const table = getTableFieldName(item);
    const tableName = table.tableName;
    tables.add(tableName);
  });

  tables.forEach((key, value) => {
    const { level, order } = getTableLevelAndOrder(key);
    const obj = {
      id: key,
      key: key,
      label: key,
      x: 100,
      y: 100,
      level: level,
      order: order,
      attrs: [],
      size: [nodeWidth, itemHeight],
    };
    nodes.push(obj);
  });
};

/**
 * 获取选中 label 的所有左关联边
 * @param edges node 的所有 edges
 * @param model node 的 model
 * @param sourceAnchor 选中的 label
 * @param leftActiveEdges 左关联边集合
 */
export const getLeftRelation = (
  edges,
  model,
  sourceAnchor,
  leftActiveEdges
) => {
  const source = model['id']; // 当前节点
  edges
    .filter((edge) => !leftActiveEdges.includes(edge))
    .forEach((edge) => {
      if (
        edge.getModel()['target'] === source &&
        edge.getModel()['targetAnchor'] === sourceAnchor
      ) {
        leftActiveEdges.push(edge);

        const currentNode = edge.getSource();
        const currentModel = currentNode.getModel();
        const currentEdges = currentNode.getInEdges();
        const currentSourceAnchor = edge.getModel()['sourceAnchor'];
        getLeftRelation(
          currentEdges,
          currentModel,
          currentSourceAnchor,
          leftActiveEdges
        );
      }
    });
};

/**
 * 获取选中 label 的所有右关联边
 * @param edges node 的所有 edges
 * @param model node 的 model
 * @param sourceAnchor 选中的 label
 * @param rightActiveEdges 右关联边集合
 */
export const getRightRelation = (
  edges,
  model,
  sourceAnchor,
  rightActiveEdges
) => {
  const source = model['id']; // 当前节点
  edges
    .filter((edge) => !rightActiveEdges.includes(edge))
    .forEach((edge) => {
      if (
        edge.getModel()['source'] === source &&
        edge.getModel()['sourceAnchor'] === sourceAnchor
      ) {
        rightActiveEdges.push(edge);

        const currentNode = edge.getTarget();
        const currentModel = currentNode.getModel();
        const currentEdges = currentNode.getOutEdges();
        const currentTargetAnchor = edge.getModel()['targetAnchor'];
        getRightRelation(
          currentEdges,
          currentModel,
          currentTargetAnchor,
          rightActiveEdges
        );
      }
    });
};
