const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const avatarPath = path.join('E://files/avatar', `${req.body.userId}`);
        /**
         * req 获取 参数失败：可能原因
         * 1. 没有解析 body 参数
         *   app.use(express.json()); // 使用 express 内置的 json 解析
         *   app.use(express.urlencoded({ extended: true })); // 使用 express 内置的 urlencoded 解析
         * 2. 前端传递参数的顺序原因。。。
         *   formData.append('filename', file.name);
         *   formData.append('avatar', file);  //  这种传递顺序只能获取到 filename 参数
         *   formData.append('userId', userStore.userInfo.id);
         *  */ 
        if (!fs.existsSync(avatarPath)) {
            fs.mkdirSync(avatarPath, { recursive: true });
        }
        cb(null, avatarPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;