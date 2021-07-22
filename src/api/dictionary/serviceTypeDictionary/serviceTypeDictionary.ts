import { defHttp } from '/@/utils/http/axios';
import { Id } from '/@/api/model/baseModel';
import {
  GetPagedParams,
  GetServiceTypeDictionaryByPagedModel,
  ServiceTypeDictionary
} from './model/serviceTypeDictionaryModel';

enum Api {
  url = '/api/backendManagement/serviceTypeDictionary',
  getAllUrl = '/api/backendManagement/serviceTypeDictionary/all'
}


export function GetServiceTypeDictionaryByPaged(params: GetPagedParams) {
  return defHttp.get<GetServiceTypeDictionaryByPagedModel>({
    url: Api.url,
    params
  })
}

export function CreateOrUpdateServiceTypeDictionary(params: ServiceTypeDictionary) {
  return defHttp.post<ServiceTypeDictionary>({
    url: Api.url,
    params
  })
}

export function DelServiceTypeDictionaryById(params: Id) {
  var url = Api.url + `?id=${params.id}`;
  return defHttp.delete<ServiceTypeDictionary>({
    url: url
  },{
    isTransformRequestResult:false
  })
}

export function GetAll() {
  return defHttp.get<GetServiceTypeDictionaryByPagedModel>({
    url: Api.getAllUrl
  })
}
