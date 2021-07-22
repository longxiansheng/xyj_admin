import { defHttp } from '/@/utils/http/axios';
import { Id } from '/@/api/model/baseModel';
import {
  GetPagedParams,
  GetOrderListByPagedModel,
  GetNursiongPagedParams,
  GetNursingListByPagedModel,
  DetailOrder,
  SetSchedulingStatusDto
} from './model/orderModel';

enum Api {
  url = '/api/clientManagement/UserOrders',
  ourl= 'api/clientManagement/ClientOrders',
  nurl='/api/nursingStaffManagement/nursingStaffUserExtend'
}


export function GetOrdersByPaged(params: GetPagedParams) {
  return defHttp.get<GetOrderListByPagedModel>({
    url: Api.url + '/page',
    params
  })
}

export function GetOrderDetailInfoById(params: Id) {
  var url = Api.url + `?id=${params.id}`;
  return defHttp.get<DetailOrder>({
    url: url
  },
  {
    isTransformRequestResult:false
  })
}


export function GetAllNursingPerson(params: GetNursiongPagedParams){
  return defHttp.get<GetNursingListByPagedModel>({
    url: Api.nurl + '/GetExhibitionListPagedAsync',
    params
  })
}


export function SetSchedulingStatus(params:SetSchedulingStatusDto){
  return defHttp.post<any>({
    url: Api.ourl +'/SetSchedulingStatus',
    params
  })
}
