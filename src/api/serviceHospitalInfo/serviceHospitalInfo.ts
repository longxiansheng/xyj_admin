import { defHttp } from '/@/utils/http/axios';
import {
  GetServiceHospitalInfoByPagedModel,
} from './model/serviceHospitalInfoModel';

enum Api {
  url = '/api/backendManagement/ServiceHospitalInfo/all',
}

export function GetServiceHospitalInfoList() {
  return defHttp.get<GetServiceHospitalInfoByPagedModel>({
    url: Api.url
  })
}
