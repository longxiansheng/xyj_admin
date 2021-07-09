import { defHttp } from '/@/utils/http/axios';
import { Id } from '/@/api/model/baseModel';
import {
  GetPagedParams,
  GetServicePerIdentityDictionaryByPagedModel,
  ServicePerIdentityDictionary
} from './model/serviceperidentitydictionaryModel';

enum Api {
  url = '/api/backendManagement/servicePerIdentityDictionary',
}


export function GetServicePerIdentityDictionaryByPaged(params: GetPagedParams) {
  return defHttp.get<GetServicePerIdentityDictionaryByPagedModel>({
    url: Api.url,
    params
  })
}

export function CreateOrUpdateServicePerIdentityDictionary(params: ServicePerIdentityDictionary) {
  return defHttp.post<ServicePerIdentityDictionary>({
    url: Api.url,
    params
  })
}

export function DelServicePerIdentityDictionaryById(params: Id) {
  var url = Api.url + `?id=${params.id}`;
  return defHttp.delete<ServicePerIdentityDictionary>({
    url: url
  },{
    isTransformRequestResult:false
  })
}
