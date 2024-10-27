const multer = require('multer');
const path = require('path');
const { success, failure } = require('../../utils/response');
const UserService = require('../../services/admin/userService');

// 提供静态文件服务
// app.use('/avatars', express.static(path.join(__dirname, 'e://avatar')));


/**
 * 上传头像
 * @param {Request} req 
 * @param {Response} res 
 */
exports.uploadAvatar = async (req, res) => {
    try {
        // 中间件已经处理文件上传，直接检查 req.file
        if (!req.file) {
            return failure(res, 'No file uploaded.'); // 改进的错误处理
        }
        // 更新用户头像
        const userId = req.body.userId;
        const avatarPath = `${userId}/${req.file.filename}`;
        await UserService.updateUser(userId, { avatar: avatarPath }); // 使用 req.file.filename
        success(res, { message: '头像上传成功', data: { avatar: avatarPath } });
    } catch (err) {
        failure(res, err.message);
    }
}

/**
 * 获取头像
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getAvatar = (req, res) => {
    try {
        const avatarId = req.params.avatarId;
        const userId = req.params.userId;
        const avatarPath = path.join(`E://files/avatar/${userId}`, `${avatarId}`); // 构建头像文件的完整路径
        res.sendFile(avatarPath);
    } catch (err) {
        res.status(err.status).end(); // 处理错误
    }
}
