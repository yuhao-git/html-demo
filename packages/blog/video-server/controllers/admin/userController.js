const UserService = require('../../services/admin/userService');
const { success, failure } = require('../../utils/response');
const { decryptData } = require("../../utils/utils.js")

/**
 * 用户注册接口
 * @param {Request} req 
 * @param {Response} res 
 */
exports.register = async (req, res) => {
    try {
        const { username, password, email, nickname } = req.body;
        const decryptPassword = decryptData(password)
        await UserService.registerUser({ username, password: decryptPassword, email, nickname });
        const info = await UserService.loginUser({ username, password: decryptPassword });
        success(res, { message: '注册成功', data: { token: info.token } });
    } catch (error) {
        failure(res, error.message);
    }
};

/**
 * 用户登录接口
 * @param {Request} req 
 * @param {Response} res 
 */
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const decryptPassword = decryptData(password)
        const info = await UserService.loginUser({ username, password: decryptPassword });
        success(res, { message: '登录成功', data: { userInfo: info.user, token: info.token } });
    } catch (error) {
        failure(res, error.message);
    }
};

/**
 * 查询用户接口
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getUser = async (req, res) => {
    try {
        const { username = '', currentPage, pageSize } = req.body;
        const user = await UserService.getUser(username, currentPage, pageSize);
        success(res, { message: '查询成功', data: user });
    } catch (error) {
        failure(res, error);
    }
};


