/**
 * This is an example of sigma showing how to snapshot the rendered graph as a
 * PNG file.
 */

import Sigma from "sigma";
import Graph from "graphology";
import ForceSupervisor from "graphology-layout-force/worker";
import saveAsPNG from "./saveAsPNG";
import dataset from './dataset'
const container = document.getElementById("sigma-container") as HTMLElement;

// Instantiate graph:
const graph = new Graph();

const RED = "#FA4F40";
const BLUE = "#727EE0";
const GREEN = "#5DB346";

// graph.addNode("John", { size: 10, label: "John", color: RED });
// graph.addNode("Mary", { size: 15, label: "Mary", color: RED });

// graph.addEdge("John", "Mary", { type: "line", label: "works with", size: 5 });

  // initializeNodePositions(dataset.nodes)
  // calculateForces(dataset.nodes,dataset.edges);
  // updatePositions(dataset.nodes);



dataset.nodes.forEach((item, i) => {
  graph.addNode(item.key, {...item,  size: item.score * 1000 });
});

dataset.edges.forEach(item => {
  graph.addEdge(item[0], item[1], { type: "arrow" });
});


// 初始化节点位置
function initializeNodePositions(nodes) {
  nodes.forEach(function (node) {
    // 随机分布节点初始位置
    node.x = Math.random() * 1000;
    node.y = Math.random() * 1000;
    node.vx  = 0;
    node.vy = 0;
  });
}

// 计算力
function calculateForces(nodes, edges) {
  var k = 0.1; // 弹簧劲度系数
  var c = 0.1; // 排斥力的常数

  nodes.forEach(function (node) {
    node.fx = 0; // 节点x轴上的受力
    node.fy = 0; // 节点y轴上的受力

    // 计算节点之间的排斥力
    nodes.forEach(function (otherNode) {
      if (node !== otherNode) {
        var dx = node.x - otherNode.x;
        var dy = node.y - otherNode.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var repulsiveForce = c / (distance * distance);

        node.fx += repulsiveForce * dx / distance;
        node.fy += repulsiveForce * dy / distance;
      }
    });

    // 计算连线之间的吸引力
    edges.forEach(function (edge) {
      if (edge[0] === node || edge[1] === node) {
        var otherNode = edge.source === node ? edge.target : edge.source;
        var dx = node.x - otherNode.x;
        var dy = node.y - otherNode.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var attractiveForce = k * distance;

        node.fx -= attractiveForce * dx / distance;
        node.fy -= attractiveForce * dy / distance;
      }
    });
  });
}

// 更新节点位置
function updatePositions(nodes) {
  var damping = 0.9; // 阻尼系数
  nodes.forEach(function (node) {
    // 施加力
    node.vx += node.fx;
    node.vy += node.fy;

    // 更新速度
    node.vx *= damping;
    node.vy *= damping;

    // 更新位置
    node.x += node.vx;
    node.y += node.vy;
  });
}

console.log(dataset.nodes)


// graph.nodes().forEach((node, i) => {
//   const angle = (i * 2 * Math.PI) / graph.order;
//   graph.setNodeAttribute(node, "x", 100 * Math.cos(angle));
//   graph.setNodeAttribute(node, "y", 100 * Math.sin(angle));
// });

const renderer = new Sigma(graph, container, {
  renderEdgeLabels: true,
});

// Create the spring layout and start it:
// const layout = new ForceSupervisor(graph);
// layout.start();

// Bind save button:
// const saveBtn = document.getElementById("save-as-png") as HTMLButtonElement;
// saveBtn.addEventListener("click", () => {
//   const layers = ["edges", "nodes", "edgeLabels", "labels"].filter(
//     (id) => !!(document.getElementById(`layer-${id}`) as HTMLInputElement).checked,
//   );

//   saveAsPNG(renderer, layers);
// });
