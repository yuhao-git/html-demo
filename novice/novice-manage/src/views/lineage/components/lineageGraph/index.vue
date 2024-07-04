<!--  -->
<template>
  <div class="container">
    <toolbar :onFieldLineage="onFieldLineage"></toolbar>
    <div ref="container" class="container">
      <div ref="toolbarRef" class="g6-component-toolbar"></div>
    </div>
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
} from "../../utils/common.js";
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
  resetGraphSize, // 设置大小
} from "../../utils/graphUtil.js";

import toolbar from "./components/Toolbar/index.vue";
const currentHighlightColor = "#ff0000";
export default {
  components: { toolbar },
  props: {},
  data() {
    return {
      // graph: null,
      fieldChecked: true,
      wholeChecked: true,
    };
  },
  computed: {},
  mounted() {
    this.drawChart();
    window.addEventListener("resize", this.updateSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateSize);
    this.destroy();
  },
  methods: {
    // 调整尺寸
    updateSize() {
      resetGraphSize(this.graph, this.$refs.container);
    },
    // 销毁对象
    destroy() {
      if (this.graph) {
        this.graph.clear?.();
        this.graph.destroy?.();
        this.graph = null;
      }
    },
    // 字段、表血缘切换
    onFieldLineage(checked) {
      this.fieldChecked = checked;
      let lineageWholeData = sourceData.data.withProcessData;
      if (!lineageWholeData) {
        return;
      }
      let data = null;
      if (this.fieldChecked) {
        data = transformData(lineageWholeData.data);
      } else {
        data = collapseData(lineageWholeData.data);
      }
      renderGraph(this.graph, data);
    },
    // // 字段、表血缘切换
    // onFieldLineage(checked) {
    //   this.fieldChecked = checked;
    //   let lineageWholeData = sourceData.data.withProcessData;
    //   let lineagePartData = sourceData.data.noProcessData;

    //   if (!lineageWholeData || !lineagePartData) {
    //     return;
    //   }
    //   let data;
    //   if (this.fieldChecked) {
    //     data = transformData(lineageWholeData.data);
    //   } else {
    //     data = collapseData(lineageWholeData.data);
    //   }
    //   // if (this.fieldChecked) { // 字段
    //   //   if (this.wholeChecked) { // 全链路
    //   //     data = transformData(lineageWholeData.data);
    //   //   } else {
    //   //     data = transformData(lineagePartData.data);
    //   //   }
    //   // } else {
    //   //   if (this.wholeChecked) {
    //   //     data = collapseData(lineageWholeData.data);
    //   //   } else {
    //   //     data = collapseData(lineagePartData.data);
    //   //   }
    //   // }
    //   renderGraph(this.graph, data);
    // },
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
            // stroke: "#6C6B6B", // 默认填充色
            // lineWidth: 2, // 默认线宽
            stroke: "#999", // 默认填充色
            lineWidth: 1, // 默认线宽
            endArrow: true,
          },
        },
      });
    },
    // 渲染数据
    drawChart() {
      // 初始化图形
      this.graph = this.initGraph();
      // 获取数据
      const wholeData = sourceData.data.withProcessData.data;
      const data = transformData(wholeData);
      console.log(JSON.parse(JSON.stringify(data)));
      // 渲染数据
      renderGraph(this.graph, data);
      // 绑定节点点击事件
      this.bindEvents(this.graph);
    },
    // 处理连线点击事件
    handleEdgeClick(graph, item, name) {
      const sourceNode = item.getSource();
      const sourceModel = sourceNode.getModel();
      const sourceEdges = sourceNode.getInEdges();

      // 获取当前连线的 source 节点
      const sourceAnchor = item.getModel()["sourceAnchor"];
      const leftActiveEdges = [];
      leftActiveEdges.push(item);

      getLeftRelation(sourceEdges, sourceModel, sourceAnchor, leftActiveEdges);
      const targetNode = item.getTarget();
      const targetModel = targetNode.getModel();
      const targetEdges = targetNode.getOutEdges();

      // 获取当前连线的 target 节点
      const targetAnchor = item.getModel()["targetAnchor"];
      const rightActiveEdges = [];
      rightActiveEdges.push(item);

      getRightRelation(
        targetEdges,
        targetModel,
        targetAnchor,
        rightActiveEdges
      );

      // 清除状态
      clearAllStats(graph);

      // 设置左关联边及节点状态
      setLeftStats(
        graph,
        leftActiveEdges,
        currentHighlightColor,
        name
      );

      // 设置右关联边及节点状态
      setRightStats(
        graph,
        rightActiveEdges,
        currentHighlightColor,
        name
      );
    },
    // 处理节点点击事件
    handleNodeClick(graph, item, currentAnchor, name) {
      
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
          this.handleEdgeClick(graph, item, "highlight");
        } else {
          this.handleEdgeClick(graph, item, "tableHighlight");
        }
      });

      //监听只在 canvas 空白处点击事件
      graph.off("canvas:click").on("canvas:click", (ev) => {
        // 清除状态
        clearAllStats(graph);
      });
    },
  },
};
</script>
<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>

<style>
.g6-minimap {
  width: 200px;
  height: 120px;
  position: absolute;
  bottom: 60px !important;
  right: 24px !important;
  left: unset !important;
  top: unset !important;
  background: #fff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
    0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
}

.g6-component-toolbar {
  position: absolute;
  bottom: 0;
  right: 0;
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