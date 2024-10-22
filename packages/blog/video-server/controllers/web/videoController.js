const fs = require('fs');
const path = require('path');
const { success, failure } = require('../../utils/response');
const multer = require('multer'); // 引入 multer
const VIDEO_DIRECTORY = process.env.VIDEO_DIRECTORY;
const SECRET_DIRECTORY = process.env.SECRET_DIRECTORY;
let DIRECTORY = VIDEO_DIRECTORY;


/**
 * 获取视频文件列表
 * @param {*} req 
 * @param {*} res 
 */
const getVideoFiles = (req, res) => {
    // 判断是否是精选视频
    DIRECTORY = req.query.secret == '01' ? SECRET_DIRECTORY : VIDEO_DIRECTORY;
    fs.readdir(DIRECTORY, (err, files) => {
        if (err) {
            failure(res, err);
        } else {
            const videoFiles = files.filter(file => path.extname(file) === '.mp4');
            success(res, { message: '查询成功', data: videoFiles });
        }
    });
}

/**
 * 视频文件流式传输
 * @param {*} req 
 * @param {*} res 
 */
const serveVideoFiles = (req, res) => {
    const videoPath = path.join(DIRECTORY, req.params.filename);
    const stat = fs.statSync(videoPath);

    // Handle range requests for streaming
    const range = req.headers.range;
    let headers = {
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes'
    };

    if (!range) {
        // If no range is specified, send the entire file
        headers['Content-Length'] = stat.size;
        res.writeHead(200, headers);
        const stream = fs.createReadStream(videoPath);
        stream.pipe(res);
    } else {
        // Parse the range header
        const [start, end] = range.replace(/bytes=/, "").split("-").map(v => parseInt(v, 10));
        const chunkSize = 10 ** 6; // 1MB chunk size
        const startOffset = start || 0;
        const endOffset = end || stat.size - 1;
        const contentLength = endOffset - startOffset + 1;

        // Set the content range and length
        headers['Content-Length'] = contentLength;
        headers['Content-Range'] = `bytes ${startOffset}-${endOffset}/${stat.size}`;
        res.writeHead(206, headers);

        // Create a read stream and pipe it to the response
        const stream = fs.createReadStream(videoPath, { start: startOffset, end: endOffset });
        stream.pipe(res);
    }
}

/**
 * 文件上传
 */
// 单文件上传
// const uploadVideo = (req, res) => {
//     try {
//         // 配置 multer 存储选项
//         const storage = multer.diskStorage({
//             destination: (req, file, cb) => {
//                 cb(null, "E:\\files"); // 设置上传文件的存储目录
//             },
//             filename: (req, file, cb) => {
//                 cb(null, `${Date.now()}-${file.originalname}`); // 使用时间戳和原始文件名
//             }
//         });
//         const upload = multer({ storage }); // 创建 multer `实例
//         upload.single('videoFile')(req, res, (err) => {
//             if (err) {
//                 throw new Error('Error uploading file.');
//             }
//             if (!req.file) {
//                 throw new Error('No file uploaded.');
//             }
//             res.status(200).send(`File uploaded successfully: ${req.file.path}`);
//         });
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// 多文件上传
const uploadVideo = (req, res) => {
    try {
        // 配置 multer 存储选项
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, DIRECTORY); // 设置上传文件的存储目录
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`); // 使用时间戳和原始文件名
            }
        });
        const upload = multer({ storage }); // 创建 multer 实例
        upload.array('videoFiles', 100)(req, res, (err) => { // 允许最多上传100个文件
            if (err) {
                throw new Error('Error uploading files.');
            }
            if (!req.files || req.files.length === 0) {
                throw new Error('No files uploaded.');
            }
            const filePaths = req.files.map(file => file.path).join(', ');
            success(res, { message: '文件添加成功', data: { filePaths } });
        });
    } catch (error) {
        failure(res, error);
    }
}


/**
 * 删除视频文件
 * @param {*} req 请求对象
 * @param {*} res 响应对象
 */
const deleteVideoFile = (req, res) => {
    // 构建视频文件的完整路径
    const videoPath = path.join(DIRECTORY, req.params.filename);
    // 使用fs模块的unlink方法删除文件
    fs.unlink(videoPath, (err) => {
        // 如果删除过程中发生错误
        if (err) {
            // 调用failure函数发送错误响应
            failure(res, err);
        } else {
            // 如果删除成功，调用success函数发送成功响应
            success(res, { message: '文件删除成功' });
        }
    });
}


module.exports = { getVideoFiles, serveVideoFiles, uploadVideo, deleteVideoFile };
