import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface AgeStageDictionary {
  id: string;
  tenantId: string;
  ageStageStr: string;
}

export type GetageStageDictionaryByPagedModel = BasicFetchResult<AgeStageDictionary>;

export interface GetPagedParams extends BasicPageParams {
  ageStageStrFilter: string
}
