import { defHttp } from '/@/utils/http/axios';
import { Id } from '/@/api/model/baseModel';
import {
  GetPagedParams,
  GetMechanismByPagedModel,
  Mechanism
} from './model/mechanismModel';

enum Api {
  url = '/api/backendManagement/mechanism',
}


export function GetMechanismByPaged(params: GetPagedParams) {
  return defHttp.get<GetMechanismByPagedModel>({
    url: Api.url,
    params
  })
}

export function CreateOrUpdateMechanism(params: Mechanism) {
  return defHttp.post<Mechanism>({
    url: Api.url,
    params
  })
}

export function DelMechanismById(params: Id) {
  var url = Api.url + `?id=${params.id}`;
  return defHttp.delete<Mechanism>({
    url: url
  },{
    isTransformRequestResult:false
  })
}
