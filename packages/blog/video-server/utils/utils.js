const fs = require('fs')
const crypto = require("crypto")
const path = require('path'); // 添加 path 模块
const privateKey = fs.readFileSync(path.resolve(__dirname, '../rsa/private.pem'), 'utf8'); // 使用 path.resolve
const publicKey = fs.readFileSync(path.resolve(__dirname, '../rsa/public.pem'), 'utf8'); // 使用 path.resolve


/**
 * 解密数据
 * @param {*} encryptedData 
 * @returns 
 */
exports.decryptData = (encryptedData) => {
    try {
        const buffer = Buffer.from(encryptedData, 'base64');
        const decrypted = crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, buffer);
        return decrypted.toString('utf8');
    } catch (error) {
        console.error('解密异常:', error);
        throw new Error('Failed to decrypt data');
    }
};

/**
 * 加密数据
 * @param {string} data 
 * @returns 
 */
exports.encryptData = (data) => {
    try {
        const buffer = Buffer.from(data, 'utf8');
        const encrypted = crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, buffer);
        return encrypted.toString('base64');
    } catch (error) {
        console.error('加密异常:', error);
        throw new Error('Failed to encrypt data');
    }
};