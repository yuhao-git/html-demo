const { User } = require('../../models');
const attributes = ['id', 'username', 'role', 'email', 'nickname', 'createdAt', 'updatedAt'];
const { Op } = require('sequelize');
const { getPaginatedData } = require('../../utils/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * 用户注册接口
 * @param {any} userData 
 * @returns {Promise<any>}
 */
exports.registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const role = '2'; // 1是管理员，2是普通用户
    return await User.create({ ...userData, password: hashedPassword, role }, { attributes: attributes });
};

/**
 * 用户登录接口
 * @param {any} userData 
 * @returns {Promise<any>}
 */
exports.loginUser = async (userData) => {
    const user = await User.findOne({ where: { username: userData.username } });
    if (!user) {
        throw new Error('用户不存在');
    }
    const isValid = await bcrypt.compare(userData.password, user.password);
    if (!isValid) {
        throw new Error('密码错误');
    }
    if (user.role != '99') {
        throw new Error('权限不足');
    }
    // 生成token secret是密钥，1h是过期时间
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
    return { token };
};

/**
 * 查询用户
 * @param {any} userData 
 * @returns {Promise<any>}
 */
exports.getUser = async (username, currentPage, pageSize) => {
    const where = { username: { [Op.like]: `%${username}%` } };
    return getPaginatedData(User, where, attributes, currentPage, pageSize);
};

