import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface ServicePerLevelDictionary {
  id: string;
  typeId: string;
  levelName: string;
}

export type GetServicePerLevelDictionaryByPagedModel = BasicFetchResult<ServicePerLevelDictionary>;

export interface GetPagedParams extends BasicPageParams {
  levelNameFilter: string,
  typeIdFilter: string
}
