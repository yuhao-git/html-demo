
const multer = require('multer');
const path = require('path');
const { success, failure } = require('../../utils/response');
const UserService = require('../../services/admin/userService');

// 提供静态文件服务
// app.use('/avatars', express.static(path.join(__dirname, 'e://avatar')));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'E://files/avatar/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/**
 * 上传头像
 * @param {Request} req 
 * @param {Response} res 
 */
exports.uploadAvatar = async (req, res) => {
    try {
        upload.single('avatar')(req, res, async (err) => {
            if (err) {
                throw new Error("Error uploading files.");
            }
            if (!req.file) {
                throw new Error('No file uploaded.');
            }
            // 更新用户头像
            await UserService.updateUser(req.body.userId, { avatar: req.body.filename });
            success(res, { message: '头像上传成功', data: { avatar: req.body.filename } });
        });
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
        const avatarPath = path.join('E://files/avatar', `${avatarId}`); // 构建头像文件的完整路径
        res.sendFile(avatarPath);
    } catch (err) {
        res.status(err.status).end(); // 处理错误
    }
}