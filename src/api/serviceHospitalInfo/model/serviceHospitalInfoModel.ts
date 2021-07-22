import { BasicFetchResult } from '/@/api/model/baseModel';

export interface ServiceHospitalInfo{
  id: string
  hospitalName: string,
  provinceCode: number,
  cityCode: number,
  countyCode: number,
  introduction: string,
  buildingTime: string,
  endingTime: string,
  contractsFilePath: string
}

export type GetServiceHospitalInfoByPagedModel = BasicFetchResult<ServiceHospitalInfo>;
