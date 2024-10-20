
const multer = require('multer');
const path = require('path');
const { success, failure } = require('../../utils/response');

// 提供静态文件服务
// app.use('/avatars', express.static(path.join(__dirname, 'e://avatar')));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'e://files/avatar/');
    },
    filename: function(req, file, cb) {
        cb(null, req.user.id + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.uploadAvatar = (req, res) => {
    upload.single('avatar')(req, res, function(err) {
        if (err) {
            failure(res, err);
        } else {
            success(res, { message: '头像上传成功', data: req.file.filename });
        }
    });
}


exports.getAvatar = (req, res) => { 
    const userId = req.params.id; // 从请求参数中获取用户ID
    const avatarPath = path.join('e://avatar', `${userId}.png`); // 构建头像文件的完整路径
    res.sendFile(avatarPath, (err) => {
        if (err) {
            res.status(err.status).end(); // 处理错误
        }
    });
}