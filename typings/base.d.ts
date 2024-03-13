import { ResponseType } from "axios"

/**
 * Qdpay Config
 */
export type QdPayConfig = {
    merchantCode: string,   // 服務商戶號
    secretKey: string,  // 服務商Secret Key
    aesKey: string; // 服務商AES Key
    privateKey: string; // 服務商Private Key
}

export const enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

/**
 * 接口請求參數
 */
export type ApiRequestParams = {
    baseURL?: string, // axios baseURL
    apiUrl: string, // 接口路徑 例如: /vcc/account/balance
    method?: HttpMethod // 'POST' | 'GET' | 'PUT' | 'DELETE', // HTTP Method
    data?: any, // 請求數據
    responseType?: ResponseType, // 'arraybuffer', 'document', 'json', 'text', 'stream'。默認'json'
    merchantCode: string, //商戶號
    authentication: string, //商戶認證授權
}

/**
 * 接口調用結果數據結構
 */
export type ApiResult<T> = {
    success?: boolean,  // 接口调用是否成功 (status === 200 || status === 204)
    records?: T,    // 接口返回結果
    errCode?: string,   // 錯誤代碼
    errMsg?: string,    // 錯誤信息
    total?: numebr, //數據總數
    size?: number, //分頁，每頁數
    current?: number, //當前頁面
    pages?: number, //分頁總數
}