// middleware/jwtMiddleware.js
const jwt = require('jsonwebtoken');
const { failure } = require('../utils/response');

const jwtMiddleware = (req, res, next) => {
    const { authorization } = req.headers; // 获取token
    if (!authorization) {
        return failure(res, 'No token provided', 403);
    }
    
    jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return failure(res, 'Unauthorized', 403);
        }
        req.user = decoded; // 将解码后的用户信息附加到请求对象上
        next();
    });
};

module.exports = jwtMiddleware;