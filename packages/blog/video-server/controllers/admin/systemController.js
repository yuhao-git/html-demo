const { exec } = require('child_process');
const { success, failure } = require('../../utils/response');
/**
 * 一键关闭windows
 */
exports.shutdownSystem = async (req, res) => {
    exec('shutdown /s /t 0', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            failure(res, "关机失败！")
            return;
        }
        failure(res, "关机成功！")
    });
}
