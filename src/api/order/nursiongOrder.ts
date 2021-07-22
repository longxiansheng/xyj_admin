import { defHttp } from '/@/utils/http/axios';
import { CreateNusingOrderDto , GetNursiongOrderPagedParams,GetNoCompletedNursingParams } from './model/nursiongOrderModel'

enum Api {
  url ='api/backendManagement/nursingOrders'
}


export function CreateNusingOrder(params:CreateNusingOrderDto){
  return defHttp.post<any>({
    url: Api.url,
    params
  })
}

export function GetSchedulingInfo(params:GetNursiongOrderPagedParams){
  return defHttp.get<any>({
    url: Api.url +'/all',
    params
  })
}


export function GetNoCompletedNursing(params:GetNoCompletedNursingParams){
  return defHttp.get<Array<string>>({
    url: Api.url +'/nocom',
    params
  })
}
