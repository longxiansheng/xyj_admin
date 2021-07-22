import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';

export interface clientUserDto {
  name: string;
  phone: string;
  gender: string;
  nickName: string;
  avatarUrl: string;
  authenticationStatus: boolean;
  idCardNumber: string;
  idCardType: string;
  unionId: string;
  openId: string;
}

export interface UserOrderDto {
  clientUserId: string;
  prePayId: string;
  orderId: string;
  packageId: string;
  personId: string;
  serviceStartTime: Date;
  serviceEndTime: Date;
  serviceDays: number;
  serviceHospitalId: string;
  serviceAreaId: string;
  userHospitalId: string;
  userHomeId: string;
  nursingPersonId: string;
  emergencyId: string;
  valid: boolean;
}

export interface ClientOrderDto {
  orderNumbers: string;
  productCategory: Number;
  needScheduling: string;
  schedulingStatus?: number;
  serviceStatus?: number;
  evaluationStatus?: boolean;
  ordersStatus?: boolean;
  paymentsStatus?: boolean;
  description: string;
  total: number;
  orderCreationTime: Date;
  orderCancelTime?: Date;
  invalidReason?: number;
}

export interface UserOrderConditionDto {
  types: string;
  ageStageStr?:string;
  ageStageid?: string;
  gender?: number;
}

export interface UserNursingPersonDto {
  name: string;
  gender: number;
  idCardNumber: string;
  birthday: Date;
  national: string;
  treatmentStatus: string;
  takingMedication: string;
  allergyHistory: string;
  familyHistory: string;
  pastHistory: string;
  contraindicated: string;
  cautions: string;
}
export interface ServiceDataDto{
  id:string;
  serviceStartTime:Date;
  serviceEndTime:Date;
  serviceDays:number;
  provinceName:string;
  cityName:string;
  countyName :string;
  serviceHospitalName:string;
  Section:string;
  BedNumber :string;
  serviceAddress :string;
  EmergencyContactName:string;
  EmergencyContactPhone :string;
}
export interface NursingDataDto{

}

export interface  OrderList {
  userOrders: UserOrderDto;
  clientOrders: ClientOrderDto;
  clientUser:clientUserDto;
}

export interface DetailOrder extends OrderList{
  userOrderConditions:UserOrderConditionDto,
  clientUserNursingPerson:UserNursingPersonDto,
  serviceData:ServiceDataDto,
  nursingData:NursingDataDto,

}

export type GetOrderListByPagedModel = BasicFetchResult<OrderList>;

export interface GetPagedParams extends BasicPageParams {
  clientUserId: string,
  orderType?: number,
  category?: number
}

export interface NursingDto{
  name:string;
  idCard:string;
  telephone:string;
  ageStageDictionary:string;
  educationDictionary:string;
  isAtHome:string;
  mechanism:string;
  nativePlace:string;
  servicePerIdentityDictionary:string;
  servicePerLevelDictionary:string;
  servicePerTypeDictionary:string;
  servicePrice:number;
  serviceTypeDictionary:string;
  sexDictionary:string;
  personalPortrait:Array<File>;
  serviceSkillDictionary:string;
  qualificationPhoto:Array<File>;
  proofOfWages:Array<any>;
  userStatus:number;
  isShow:string;
  approvalProposal:string;
  id:string;
  disable:boolean;
}

export interface File{
  name:string;
  realName:string;
  suffix:string;
  md5Code:string;
  size:string;
  path:string;
  url:string;
  type:number;
  id:string;
}

export interface SetSchedulingStatusDto{
  id:string;
  schedulingStatus?:number;
}

export type GetNursingListByPagedModel = BasicFetchResult<NursingDto>;

export interface GetNursiongPagedParams extends BasicPageParams{

}
