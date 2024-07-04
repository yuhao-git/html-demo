// 放大
export const handleZoomOut = (graph) => {
  if (!graph) return;
  const current = graph.getZoom();
  const canvas = graph.get('canvas');
  const point = canvas.getPointByClient(
    canvas.get('width') / 2,
    canvas.get('height') / 2
  );
  const pixelRatio = canvas.get('pixelRatio') || 1;
  const ratio = 1 + 0.05 * 5;
  if (ratio * current > 5) {
    return;
  }
  graph.zoom(ratio, {
    x: point.x / pixelRatio,
    y: point.y / pixelRatio,
  });
  return {
    text: `${Math.round((ratio * current) * 100)}%`,
    ratio: ratio * current,
  };
};

// 缩小
export const handleZoomIn = (graph) => {
  if (!graph) return;
  const current = graph.getZoom();
  const canvas = graph.get('canvas');
  const point = canvas.getPointByClient(
    canvas.get('width') / 2,
    canvas.get('height') / 2
  );
  const pixelRatio = canvas.get('pixelRatio') || 1;
  const ratio = 1 - 0.05 * 5;
  if (ratio * current < 0.3) {
    return;
  }
  graph.zoom(ratio, {
    x: point.x / pixelRatio,
    y: point.y / pixelRatio,
  });
  return {
    text: `${Math.round((ratio * current) * 100)}%`,
    ratio: ratio * current,
  };
};

// 实际大小
export const handleRealZoom = (graph) => {
  if (!graph) return;
  const current = graph.getZoom();
  graph.zoom(1 / current);
  graph.fitCenter();
  return {
    text: '100%',
    ratio: 1,
  };
};

// 自适应canvas大小
export const handleAutoZoom = (graph) => {
  if (!graph) return;
  const nodes = graph.getNodes();
  if (nodes.length > 0) {
    graph.fitView([20, 20]);
  }
  const current = graph.getZoom();
  return {
    text: `${Math.round(current * 100)}%`,
    ratio: current,
  };
};

// 推拽后恢复布局
export const handleRefreshLayout = (graph) => {
  if (!graph) return;
  graph.layout();
};

// 下载图片
export const handleDownloadImage = (graph) => {
  if (!graph) return;
  graph.downloadFullImage('open-lineage', 'image/png', {
    padding: [30, 15, 15, 15],
  });
};

// 全屏查看
export const handleEnterFullscreen = (container) => {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  }
};

// 退出全屏
export const handleExitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

// 渲染视图
export const renderGraph = (graph, lineageData) => {
  if (!graph || !lineageData) return;
  graph.data(lineageData);
  graph.render();
  graph.fitView();
};

// 设置文字水印
export const handleTextWaterMarker = (graph, text) => {
  if (!graph) return;
  graph.setTextWaterMarker(text);
};

// 设置连线高亮颜色
export const handleHighlightColor = (graph, color) => {
  if (!graph) return;
  const edges = graph.findAll('edge', (item) => {
    return item.getStates().length !== 0 && item.getStates()[0].startsWith('highlight');
  });
  if (edges) {
    edges.forEach((edge) => {
      graph.setItemState(edge, `highlight-${color}`, true);
    });
  }
};

// 清除状态
export const clearAllStats = (graph) => {
  if (!graph) return;
  graph.setAutoPaint(false);
  graph.getNodes().forEach((node) => {
    graph.clearItemStates(node);
  });
  graph.getEdges().forEach((edge) => {
    graph.clearItemStates(edge);
  });
  graph.paint();
  graph.setAutoPaint(true);
};

// 设置左边关联节点及边状态
export const setLeftStats = (graph, edges, color, name) => {
  if (!graph) return;
  edges.forEach((edge) => {
    graph.setItemState(edge, `highlight-${color}`, true);
    edge.toFront();
    const sourceAnchor = edge.getModel()['sourceAnchor'];
    graph.setItemState(edge.getSource(), `${name}-${sourceAnchor}`, true);
  });
};

// 设置右边关联节点及边状态
export const setRightStats = (graph, edges, color, name) => {
  if (!graph) return;
  edges.forEach((edge) => {
    graph.setItemState(edge, `highlight-${color}`, true);
    edge.toFront();
    const targetAnchor = edge.getModel()['targetAnchor'];
    graph.setItemState(edge.getTarget(), `${name}-${targetAnchor}`, true);
  });
};

// 重新设置画布大小
export const resetGraphSize = (graph, container) => {
  if (!graph || graph.get("destroyed")) return;
  if (!container || !container.scrollWidth || !container.scrollHeight) return;
  graph.changeSize(container.clientWidth, container.clientHeight);
}
