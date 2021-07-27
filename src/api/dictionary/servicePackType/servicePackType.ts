import { defHttp } from '/@/utils/http/axios';

import {
  GetServicePackTypeModel,
} from './model/servicePackTypeModel';

enum Api {
  url = '/api/backendManagement/GetTypeTreeForBackend'
}

export function getTypeTreeForBackend() {
  return defHttp.get<GetServicePackTypeModel>({
    url: Api.url
  })
}
