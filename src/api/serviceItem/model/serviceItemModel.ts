import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface ServiceItemDto{
  parentItemId:string;
  serviceItemName:string;
  serviceItemContent:string;
  fromPerson:number;
  status:number;
}

export interface ServiceItem {
  item: ServiceItemDto;
  childs: Array<ServiceItem>;
}

export interface ServiceItemListDictionary {
  id: string,
  fromPerson?: number;
  parentItemId?: string;
  serviceItemContent?: string;
  serviceItemName: string;
  children: Array<ServiceItemListDictionary>;
}

export type GetServiceItemByPagedModel = BasicFetchResult<ServiceItem>;
export type GetServiceItemListModel = BasicFetchResult<ServiceItemListDictionary>;

export interface GetPagedParams extends BasicPageParams {
  typeIdFilter: string,
  parentFilter: string,
  serviceTypeNameFilter: string
}
