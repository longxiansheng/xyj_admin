import { defHttp } from '/@/utils/http/axios';
import { Id } from '/@/api/model/baseModel';
import {
  GetPagedParams,
  GetageStageDictionaryByPagedModel,
  AgeStageDictionary
} from './model/ageStageDictionaryModel';

enum Api {
  url = '/api/backendManagement/ageStageDictionary',
}


export function GetAgeStageDictionaryByPaged(params: GetPagedParams) {
  return defHttp.get<GetageStageDictionaryByPagedModel>({
    url: Api.url,
    params
  })
}

export function CreateOrUpdateAgeStageDictionary(params: AgeStageDictionary) {
  return defHttp.post<AgeStageDictionary>({
    url: Api.url,
    params
  })
}

export function DelAgeStageDictionaryById(params: Id) {
  var url = Api.url + `?id=${params.id}`;
  return defHttp.delete<AgeStageDictionary>({
    url: url
  },{
    isTransformRequestResult:false
  })
}
