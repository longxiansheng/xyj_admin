import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface ServicePerIdentityDictionary {
  id: string;
  tenantId: string;
  identityName: string;
}

export type GetServicePerIdentityDictionaryByPagedModel = BasicFetchResult<ServicePerIdentityDictionary>;

export interface GetPagedParams extends BasicPageParams {
  identityNameFilter: string
}
