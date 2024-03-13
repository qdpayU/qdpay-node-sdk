import { HttpMethod, QdPayConfig, ApiResult } from "../typings";
import { currentTimestamp, generateNonce } from "./utils";
import { computeHmacSha256, aesEncrypt } from "./encrypt";
import { apiRequest } from "./request";
import { ResponseType } from "axios";

class QdPay {
	public merchantCode: string; //服務商戶號
	public secretKey: string; // 服務商應用Key
	public aesKey: string;
	public privateKey: string;

	constructor(config: QdPayConfig){
		if(!config.secretKey){
			throw new Error('QdPay Initialization Fail, APP Key cannot be empty ');
		}
		if(!config.aesKey){
			throw new Error('QdPay Initialization Fail, AES Key cannot be empty ');
		}
		if(!config.merchantCode){
			throw new Error('QdPay Initialization Fail, Merchant Code cannot be empty ');
		}
		if(!config.privateKey){
			throw new Error('QdPay Initialization Fail, privateKey cannot be empty ');
		}
		this.merchantCode = config.merchantCode;
		this.secretKey = config.secretKey;
		this.aesKey = config.aesKey;
		this.privateKey = config.privateKey;
	}

	public buildAuthentication(params: {
		timestamp: string, //timestamp
		nonce: string, //random number
	}): string{
		const auth = `${params.timestamp}.${params.nonce}`
		const signData = {
			"signature": computeHmacSha256(auth, this.secretKey),
			"timestamp": params.timestamp,
			"nonce": params.nonce
		};
		return aesEncrypt(this.aesKey, JSON.stringify(signData));
	}


	/**
	* 調用接口
	* @param params
	* @example
	{
		method: HttpMethod, // GET | POST
		apiUrl: string, // api url Example: /test/aop
		body?: Record<string, unknown> POST body (optional)
		baseURL?: string, // Optional，Default: https://http://127.0.0.1:8019
	}
	*/
	public async callApi<T>(params: {
		method?: HttpMethod, // GET | POST
		apiUrl: string, // api url Example: /vcc/account/balance
		body?: Record<string, unknown> // POST body (optional)
		baseURL?: string, // Optional, Default：http://127.0.0.1:8019
		responseType?: ResponseType, // response type. optional: 'arraybuffer', 'document', 'json', 'text', 'stream'。 default: 'json'
	}) : Promise<ApiResult<T>>{
		// 获取签名信息
		const authentication = this.buildAuthentication({
			timestamp: currentTimestamp(),
			nonce: generateNonce(32),
		});

		// construct body
		const bodyData = JSON.stringify({
    		"payload": aesEncrypt(this.aesKey, JSON.stringify(params.body))
		})

		return await apiRequest<T>({
			apiUrl: params.apiUrl,
			method: params.method,
			data: bodyData,
			baseURL: params.baseURL,
			responseType: params.responseType,
			merchantCode: this.merchantCode,
			authentication,
		})
	}


}

export default QdPay;