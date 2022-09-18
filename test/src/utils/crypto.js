import CryptoJS from 'crypto-js';

let defKey = "vfybd4lpB4MI1coiqhBNtg==";

/**
 * aes加密
 * @param {Object} str
 * 		待加密字符串
 * @param {Object} token
 * 		加密key(base64编码后的)
 */
export function encryptByAES(str, token){
    if (!token) token = defKey;
    let key = CryptoJS.enc.Base64.parse(token);   //加密密钥
    let srcs = CryptoJS.enc.Utf8.parse(str);
    let encrypt = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypt.toString();
}
/**
 * 解密函数AES
 * @param {Object} str
 * 		待解密字符串
 * @param {Object} token
 * 		解密key
 */
export function decryptByAES(str, token){
    if (!token) token = defKey;
    let key = CryptoJS.enc.Base64.parse(token);   //加密密钥
    let decrypt = CryptoJS.AES.decrypt(str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt);
}


/**
 * 编码为base64
 * @param word
 */
export function encodeBase64(word) {
    let wordBytes = CryptoJS.enc.Utf8.parse(word);
    return CryptoJS.enc.Base64.stringify(wordBytes);
}

/**
 * 解码base64
 * @param word
 */
export function decodeBase64(word) {
    let keyBytes = CryptoJS.enc.Base64.parse(word);
    return CryptoJS.enc.Utf8.stringify(keyBytes);
}
