renderer.autoClear = false;
obj.layers.set(0);
objBack.layers.set(1);
 
function render(){
  requestAnimationFrame(render);
  
  renderer.clear();
  
  camera.layers.set(1);
  composer.render();
  
  renderer.clearDepth();
  camera.layers.set(0);
  renderer.render(scene, camera);
}
// 原文链接：https://blog.csdn.net/u014452812/article/details/88722552