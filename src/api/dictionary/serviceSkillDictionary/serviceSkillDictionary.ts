import { defHttp } from '/@/utils/http/axios';
import { Id } from '/@/api/model/baseModel';
import {
  GetPagedParams,
  GetServiceSkillDictionaryByPagedModel,
  ServiceSkillDictionary
} from './model/serviceSkillDictionaryModel';

enum Api {
  url = '/api/backendManagement/ServiceSkillDictionary',
}


export function GetServiceSkillDictionaryByPaged(params: GetPagedParams) {
  return defHttp.get<GetServiceSkillDictionaryByPagedModel>({
    url: Api.url,
    params
  })
}

export function CreateOrUpdateServiceSkillDictionary(params: ServiceSkillDictionary) {
  return defHttp.post<ServiceSkillDictionary>({
    url: Api.url,
    params
  })
}

export function DelServiceSkillDictionaryById(params: Id) {
  var url = Api.url + `/${params.id}`;
  return defHttp.delete<ServiceSkillDictionary>({
    url: url
  },{
    isTransformRequestResult:false
  })
}
