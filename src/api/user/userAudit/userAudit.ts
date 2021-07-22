import { defHttp } from '/@/utils/http/axios';

import {
  GetPagedParams,
  GetUserAuditByPagedModel,
  Approval
} from './model/userAuditModel';

enum Api {
  getAll = '/api/nursingStaffManagement/nursingStaffUserExtend/GetAll',
  approval ='/api/nursingStaffManagement/nursingStaffUserExtend/Approval'
}


export function GetUserAuditByPaged(params: GetPagedParams) {
  return defHttp.get<GetUserAuditByPagedModel>({
    url: Api.getAll,
    params
  })
}

export function Approval(params: Approval) {
  return defHttp.post<any>({
    url: Api.approval,
    params
  },{
    isTransformRequestResult:false
  })
}
