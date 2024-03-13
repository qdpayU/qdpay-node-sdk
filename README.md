![](https://qdpay.co/static/img/qdpay-logo2.1181eb84.png)

### 簡介

Qdpay SDK for Node.js 用於 Nodejs 服務器提供調用Qdpay商戶開放平台接口功能.

### 環境要求
-  Node.js 18 以上版本
-  安裝依賴

`$ npm install qd-pay-sdk --save`

# 平台配置

先前往Qdpay開發平台完成開發者接入的準備工作，包括創建應用、獲取商戶ID, 應用KEY, 應用加密Secret Key等。

# 初始化 SDK
> 代码示例中的路径和文件名仅做示范，请根据项目实际读取文件所在的位置 请保存好私钥文件，避免信息泄露

```typescript
require QdPay
const qdPay = new QdPay({
    merchantCode: ' ',  // 商戶ID
    secretKey: ' ',         // 商戶secret
    aesKey: ' ',             // 商戶AES鈅
    privateKey: ' ',       // 私鈅
})

qdPay.callApi({
    apiUrl: '/vcc/account/balance'
}).then((result) => {
    console.log(result)
})
```