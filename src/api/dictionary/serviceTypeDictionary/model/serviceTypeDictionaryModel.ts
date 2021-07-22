import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface ServiceTypeDictionary {
  typeId: string;
  parent: string;
  serviceTypeName: string;
  children: Array<ServiceTypeDictionary>;
}

export type GetServiceTypeDictionaryByPagedModel = BasicFetchResult<ServiceTypeDictionary>;

export interface GetPagedParams extends BasicPageParams {
  typeIdFilter: string,
  parentFilter: string,
  serviceTypeNameFilter: string
}
