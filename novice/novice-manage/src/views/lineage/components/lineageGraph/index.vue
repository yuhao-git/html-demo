<!--  -->
<template>
  <div ref="container" class="container">
    <div ref="toolbarRef" class="g6-component-toolbar"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import "./registerShape.js"; // 注册形状
import "./registerLayout.js"; // 注册布局
import sourceData from "../../test/data.json";
import {
  collapseData, // 表血缘、字段血缘切换
  getLeftRelation, // 获取选中 label 的所有左关联边
  getRightRelation,
  transformData, // 数据转换
} from "../../utils/common";
import {
  clearAllStats, // 清除所有状态
  handleAutoZoom, // 自适应canvas大小
  handleDownloadImage, //下载图片
  handleEnterFullscreen, //全屏查看
  handleExitFullscreen, // 退出全屏
  handleHighlightColor, // 设置连线高亮颜色
  handleRealZoom, // 实际大小
  handleRefreshLayout, // 恢复布局
  handleZoomIn, // 缩小
  handleZoomOut, // 放大
  renderGraph, // 渲染视图
  setLeftStats, // 设置左边关联节点及边状态
  setRightStats, // 设置右边关联节点及边状态
} from "../../utils/graphUtil.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      graph: null,
      fieldChecked: true,
    };
  },
  computed: {},
  mounted() {
    this.drawChart();
  },
  methods: {
    // 初始化图形
    initGraph() {
      const container = this.$refs.container;
      const width = container.scrollWidth;
      const height = container.scrollHeight || 500;
      const grid = new G6.Grid();
      // 实例化 Minimap
      const minimap = new G6.Minimap();
      // 工具栏
      const toolbar = new G6.ToolBar({
        getContent: () => {
          return this.$refs.toolbarRef || "";
        },
      });
      return new G6.Graph({
        container: container || "",
        width: width,
        height: height,
        plugins: [grid, minimap, toolbar],
        fitView: true,
        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node"],
        },
        // 布局配置
        layout: {
          type: "lineageLayout",
          controlPoints: true,
          nodesep: 200,
          ranksep: 600,
          begin: [1000, 1000],
        },
        defaultNode: {
          // size: [300, 800],
          type: "dice-er-box",
          color: "#096DD9",
          boxStyle: {
            stroke: "#096DD9",
            lineWidth: 6,
            radius: 4,
          },
          style: {
            fill: "#096DD9",
          },
          labelCfg: {
            style: {
              fill: "#ffffff",
              fontSize: 20,
            },
          },
        },
        defaultEdge: {
          type: "dice-er-edge",
          style: {
            stroke: "#6C6B6B", // 默认填充色
            lineWidth: 2, // 默认线宽
            endArrow: true,
          },
        },
      });
    },
    // 渲染数据
    drawChart() {
      // 初始化图形
      const graph = this.initGraph();
      // 获取数据
      const wholeData = sourceData.data.withProcessData.data;
      const data = transformData(wholeData);
      // 渲染数据
      renderGraph(graph, data);
      // 绑定节点点击事件
      this.bindEvents(graph);
    },
    // 处理节点点击事件
    handleNodeClick(graph, item, currentAnchor, name) {
      const currentHighlightColor = "red";
      const model = item.getModel();
      const edges = item.getEdges();

      const leftActiveEdges = [];

      getLeftRelation(edges, model, currentAnchor, leftActiveEdges);

      const rightActiveEdges = [];

      getRightRelation(edges, model, currentAnchor, rightActiveEdges);

      // 清除状态
      clearAllStats(graph);

      // 设置当前节点状态
      graph.setItemState(item, name + "-" + currentAnchor, true);

      // 设置左关联边及节点状态
      setLeftStats(graph, leftActiveEdges, currentHighlightColor, name);

      // 设置右关联边及节点状态
      setRightStats(graph, rightActiveEdges, currentHighlightColor, name);
    },
    // 绑定点击事件
    bindEvents(graph) {
      // 监听节点点击事件
      graph.off("node:click").on("node:click", (evt) => {
        const { item, target } = evt;
        const currentAnchor = target.get("name");
        if (!currentAnchor) return;

        if (this.fieldChecked) {
          this.handleNodeClick(graph, item, currentAnchor, "highlight");
        } else {
          this.handleNodeClick(graph, item, currentAnchor, "tableHighlight");
        }
      });

      // 监听连线点击事件
      graph.off("edge:click").on("edge:click", (evt) => {
        const { item } = evt;
        if (this.fieldChecked) {
          handleEdgeClick(graph, item, "highlight");
        } else {
          handleEdgeClick(graph, item, "tableHighlight");
        }
      });

      //监听只在 canvas 空白处点击事件
      graph.off("canvas:click").on("canvas:click", (ev) => {
        // 清除状态
        clearAllStats(graph);
      });
    },
    // 
  },
};
</script>
<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.g6-component-toolbar {
  background: rgb(255, 255, 255);
  position: absolute;
  left: unset !important;
  bottom: unset !important;
  top: 10px !important;
  right: 24px !important;
  padding: 0px !important;
  text-align: center;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
</style>