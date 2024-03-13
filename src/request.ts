import axios from "axios";
import { ApiRequestParams, ApiResult } from "../typings";
import constant from "./constant";

/**
 * 接口請求
 * @param params
 */
export async function apiRequest<T>(params: ApiRequestParams): Promise<ApiResult<T>> {
  try{
    const result = await axios({
      baseURL: params.baseURL ? params.baseURL : constant.BASE_URL,
      url: params.apiUrl,
      method: params.method ? params.method : 'POST',
      data: params.method === 'GET' ? undefined : params.data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'MerchantCode': params.merchantCode,
        'Authentication': `${params.authentication}`,
      },
      responseType: params.responseType ? params.responseType : 'json'
    });
    if(result.status === 200 || result.status === 204){
      return {
        success: true,
        records: result.data as T,
      };
    }
    else{
      return {
        success: false,
        records: result.data,
        // errCode: String(result.status),
        // errMsg: result.statusText
      }
    }
  }
  catch(error: any){
    // console.error(error)
    if(error.response && error.response.data){
      return {
        success: false,
        // errCode: error.response.data.code,
        // errMsg: error.response.data.message
      }
    }
    return {
      success: false,
      errCode: '0',
      errMsg: error.message
    }
  }
}