import * as CryptoJS from 'crypto-js'


export function computeHmacSha256(message: string, secret: string): string{  
    const hash = CryptoJS.HmacSHA256(message, secret);  
    return hash.toString();
}

export function aesEncrypt(keyBase64: string, plaintext: string): string{
    // Decode Base64 key
    const key = CryptoJS.enc.Base64.parse(keyBase64);

    // Create a random Initialization Vector (IV)
    const iv = CryptoJS.lib.WordArray.random(16);

    // Encrypt the plaintext with AES-CBC
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Combine IV and ciphertext
    const combined = iv.concat(encrypted.ciphertext);

    // Encode the combined IV and ciphertext to Base64
    return combined.toString(CryptoJS.enc.Base64);
}