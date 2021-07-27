import { BasicFetchResult } from '/@/api/model/baseModel';

export interface ServicePackType {
  id: string;
  name: string;
  children: Array<ServicePackType>;
}

export type GetServicePackTypeByPagedModel = BasicFetchResult<ServicePackType>;

export type GetServicePackTypeModel = Array<ServicePackType>;
