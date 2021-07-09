import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface Mechanism {
  id: string;
  tenantId: string;
  mechanismName: string;
  mechanismCode: string;
  mechanismAddress: string;
  mechanismPersonInCharge: string;
  mechanismContactNumber: string;
}

export type GetMechanismByPagedModel = BasicFetchResult<Mechanism>;

export interface GetPagedParams extends BasicPageParams {
  mechanismNameFilter: string;
  mechanismCodeFilter: string;
  mechanismAddressFilter: string;
  mechanismPersonInChargeFilter: string;
  mechanismContactNumberFilter: string;
}
