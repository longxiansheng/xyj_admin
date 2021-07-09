import { defHttp } from '/@/utils/http/axios';
import { Id } from '/@/api/model/baseModel';
import {
  GetPagedParams,
  GetServicePerLevelDictionaryByPagedModel,
  ServicePerLevelDictionary
} from './model/servicePerLevelDictionaryModel';

enum Api {
  url = '/api/backendManagement/ServicePerLevelDictionary',
}


export function GetServicePerLevelDictionaryByPaged(params: GetPagedParams) {
  return defHttp.get<GetServicePerLevelDictionaryByPagedModel>({
    url: Api.url,
    params
  })
}

export function CreateOrUpdateServicePerLevelDictionary(params: ServicePerLevelDictionary) {
  return defHttp.post<ServicePerLevelDictionary>({
    url: Api.url,
    params
  })
}

export function DelServicePerLevelDictionaryById(params: Id) {
  var url = Api.url + `/${params.id}`;
  return defHttp.delete<ServicePerLevelDictionary>({
    url: url
  },{
    isTransformRequestResult:false
  })
}
