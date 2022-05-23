
// let distance = ball.currentSpeed * t; 
/**
 * 判断是否两个矩形发生碰撞
 * @param {*} sprite 
 * @param {*} otherSprite 
 * @returns 
 */
function didRectCollide(sprite, otherSprite) {
  let horizontal = sprite.left + sprite.width > otherSprite.left && sprite.left < otherSprite.left + otherSprite.width;
  let vertical = sprite.top < otherSprite.top + otherSprite.height && sprite.top + sprite.height > otherSprite.top;
  return horizontal && vertical;
}

/* 判断是否两个圆发生碰撞 */
function didCircleCollide(sprite, otherSprite) {
  return distance(sprite.x, sprite.y, otherSprite.x, otherSprite.y) < sprite.radius + otherSprite.radius;
}

/* 判断是否矩形和圆形发生碰撞 */
function didRectWidthCircleCollide(rectSprite, circleSprite) {
  let closePoint = { x: undefined, y: undefined };
  if (circleSprite.x < rectSprite.left) {
    closePoint.x = rectSprite.left;
  } else if (circleSprite.x < rectSprite.left + rectSprite.width) {
    closePoint.x = circleSprite.x;
  } else {
    closePoint.x = rectSprite.left + rectSprite.width;
  }
  if (circleSprite.y < rectSprite.top) {
    closePoint.y = rectSprite.top;
  } else if (circleSprite.y < rectSprite.top + rectSprite.height) {
    closePoint.y = circleSprite.y;
  } else {
    closePoint.y = rectSprite.top + rectSprite.height;
  }
  return distance(circleSprite.x, circleSprite.y, closePoint.x, closePoint.y) < circleSprite.radius;
}

/**
 * 获取像素比
 * @param {*} context 
 * @returns 
 * 使用 var ratio = getPixelRatio(ctx);
 * 
 */
function getPixelRatio(context) {
  var backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
};

/** * 
* @param canvas 为获取的canvas的dom实例 
* @param clientX EventObj.clientX
* @param clientY EventObj.clientY */
function winCoordinate2CanvasCoordinate(canvas, clientX, clientY) {
  letclientRect = canvas.getBoundingClientRect();
  return {
    x: (clientX - clientRect.left) * (canvas.width / clientBox.width),
    y: (clientY - clientRect.top) * (canvas.height / canvas.height),
  }
}
/**
 * 光线投射算法
 * 是否发生碰撞
 * @param {*} ball 
 * @param {*} bucket 
 * @returns 
 */
function didCollide(ball, bucket) {
  let k1 = ball.verticalVelocity / ball.horizontalVelocity;
  let b1 = ball.y - k1 * ball.x;
  let inertSectionY = bucket.mockTop; //计算交点Y坐标
  let insertSectionX = (inertSectionY - b1) / k1; //计算交点X坐标
  return (
    insertSectionX > bucket.mockLeft &&
    insertSectionX < bucket.mockLeft + bucket.mockWidth &&
    ball.x > bucket.mockLeft &&
    ball.x < bucket.mockLeft + bucket.mockWidth &&
    ball.y > bucket.mockTop &&
    ball.y < bucket.mockTop + bucket.mockHeight
  );
}

export default didCollide

// ctx.isPointInPath(30,50) 路径内
// isPointInStroke() 边上
// isPointInPath()不支持canvas自带的两个方法fillRect(),strokeRect();
// ctx.rect(x,y,w,h);
// ctx.stroke(); //替代strokeRect();

// ctx.rect(x,y,w,h);
// ctx.fill(); //替代fillRect();