
// src/utils/rsaEncrypt.ts

import JSEncrypt from 'jsencrypt';
// 示例使用
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoP3v6KnfIV9zwbqgtLEx
aDtn5/VlRAzYEyu2HlwcaefSwV/TWNz06I++FXDt2CTOAS50GWhoqEaADH68tzEI
Oj6Mpim3A+BvdYZm776eVSZQUW2hQGt17h1GA5OmcPUM8uGe0VESx3tTDtroUQXs
92nLeg9w85spTgjKH8+y5vk49HXQsobam9V10POKkxgUt3LDqPZREUQOpyjaznmE
wP/rvvaXJc7TDpgU5XspNntLQnAWhzsMQ4MmJ0ngHjW7cSm1GLqUS1+vwo0PAqXz
wOPegAINvzjaWl+krhvvfT0cZXVgG09tP0mQBLdKz1xvKHRgviAT1UcP+agPdPAg
iQIDAQAB
-----END PUBLIC KEY-----`;

export function encryptWithRSA(data: string): string | null {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);

    const encrypted = encrypt.encrypt(data);
    return encrypted ? encrypted : null;
}

