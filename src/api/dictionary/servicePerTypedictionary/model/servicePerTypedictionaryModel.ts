import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface ServicePerTypedictionary {
  id: string;
  typeName: string;
}

export type GetServicePerTypedictionaryByPagedModel = BasicFetchResult<ServicePerTypedictionary>;

export interface GetPagedParams extends BasicPageParams {
  id: number,
  typeNameFilter: string
}
