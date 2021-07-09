import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface ServiceSkillDictionary {
  id: string;
  name: string;
}

export type GetServiceSkillDictionaryByPagedModel = BasicFetchResult<ServiceSkillDictionary>;

export interface GetPagedParams extends BasicPageParams {
  id: number,
  nameFilter: string
}
