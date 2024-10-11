// 定义响应体对象
const responseBody = {
  message: '', // 响应消息
  timestamp: 0, // 时间戳
  result: null as unknown, // 结果数据
  code: 0, // 状态码
}

// 构建响应体的函数
export function builder(data: unknown, message = 'success', code = 0) {
  // 设置结果数据
  responseBody.result = data

  // 如果消息不为空，则设置消息
  if (message !== undefined && message !== null)
    responseBody.message = message

  // 如果状态码不为0，则设置状态码
  if (code !== undefined && code !== 0)
    responseBody.code = code

  // 设置当前时间戳
  responseBody.timestamp = new Date().getTime()
  // 返回响应体
  return responseBody
}
