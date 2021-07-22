import { BasicFetchResult, BasicPageParams } from '/@/api/model/baseModel';


export interface CreateNusingOrderDto{
  orderId:string;
  nursingId:string;
  schedulingTime:string;
  isRecived:boolean;
  isRejected:boolean;
  serviceStartTime:Date;
  serviceEndTime:Date;
  isReplaced:boolean;
  isCompleted:boolean;
}

export interface GetNoCompletedNursingParams{
  startTime?:Date;
  endTime?:Date;
  isCompleted?:boolean;
}

export interface GetNursiongOrderPagedParams extends BasicPageParams{
  orderIdFilter:string;
}
