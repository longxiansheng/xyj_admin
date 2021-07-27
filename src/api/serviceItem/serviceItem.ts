import { defHttp } from '/@/utils/http/axios';
import { Id } from '/@/api/model/baseModel';

import {
  GetPagedParams,
  GetServiceItemByPagedModel,
  ServiceItem,
  ServiceItemDto,
  GetServiceItemListModel
} from './model/serviceItemModel';

enum Api {
  url = '/api/backendManagement/ServiceItemInfo',
}


export function GetServiceItemByPaged(params: GetPagedParams) {
  return defHttp.get<GetServiceItemByPagedModel>({
    url: Api.url + '/tree',
    params
  })
}

export function CreateOrUpdateServiceItem(params: ServiceItemDto) {
  return defHttp.post<ServiceItemDto>({
    url: Api.url,
    params
  })
}

export function DelServiceItemById(params: Id) {
  var url = Api.url+ "/" + `${params.id}`;
  return defHttp.delete<ServiceItem>({
    url: url
  },{
    isTransformRequestResult:false
  })
}

export function GetServiceItemList() {
  return defHttp.get<GetServiceItemListModel>({
    url: Api.url + '/treeall'
  })
}
