import { defHttp } from '/@/utils/http/axios';
import { Id } from '/@/api/model/baseModel';
import {
  GetPagedParams,
  GetServicePerTypedictionaryByPagedModel,
  ServicePerTypedictionary
} from './model/servicePerTypedictionaryModel';

enum Api {
  url = '/api/backendManagement/ServicePerTypeDictionary',
}


export function GetServicePerTypeDictionaryByPaged(params: GetPagedParams) {
  return defHttp.get<GetServicePerTypedictionaryByPagedModel>({
    url: Api.url,
    params
  })
}

export function CreateOrUpdateServicePerTypedictionary(params: ServicePerTypedictionary) {
  return defHttp.post<ServicePerTypedictionary>({
    url: Api.url,
    params
  })
}

export function DelServicePerTypedictionaryById(params: Id) {
  var url = Api.url + `/${params.id}`;
  return defHttp.delete<ServicePerTypedictionary>({
    url: url
  },{
    isTransformRequestResult:false
  })
}

export function getServicePerTypeList(){
  var url = Api.url + '/all';
  return defHttp.get<GetServicePerTypedictionaryByPagedModel>({
    url: url
  })
}
