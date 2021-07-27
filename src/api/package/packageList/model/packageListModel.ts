import { BasicFetchResult, BasicPageParams, FileInfo } from '/@/api/model/baseModel';

export interface PackageList{
  id?:string,
  packageName:string,
  packageIntroduction:string,
  packageTypeId:string,
  packageAddressType:number,
  serviceScope:string,
  price:number,
  serviceLength:number,
  unit:number,
  details:string,
  userNotice:string,
  recommendation:number,
  status:boolean,
  serviceHospitalInfo:Array<string>,
  serviceArea:Array<string>,
  personType:Array<string>,
  thumbnail:string,
  fileLists:Array<string>
  serviceItem:Array<string>
}


export interface PackageDto{
  package: Package;
  packType: PackType;
  personType: Array<personType>;
  items: Array<items>;
  hospitals: Array<hospitals>;
  areas: any;
  thumbnail: FileInfo;
  packageDisplay: Array<FileInfo>;
}

export type GetPackageByPagedModel = BasicFetchResult<PackageDto>;

export interface GetPagedParams extends BasicPageParams {

}

export interface Package{
  id: string;
  packageName: string;
  packageIntroduction: string;
  packageTypeId:string;
  packageAddressType: number;
  serviceScope: string;
  price: number;
  serviceLength: number;
  unit: number;
  details: string;
  userNotice: string;
  recommendation: string;
  status: boolean;
}

export interface PackType{
  type: type,
  parentType: parentType,
  childType: any
}

export interface type{
  id: string;
  parentId: string;
  typeName: string;
}

export interface parentType {
  type: type;
  parentType: any,
  childType: any
}

export interface personType{
  typeName: string;
  id : string;
}

interface items{
  item: item;
  childs: Array<items>;
}

interface item{
  parentItemId: string;
  serviceItemName: string;
  serviceItemContent: string;
  fromPerson: number;
  status: number;
  id: string;
}

interface hospitals{
  hospitalName : string;
  provinceCode: number;
  cityCode: number;
  countyCode: number;
  introduction: string;
  buildingTime: any;
  endingTime: any;
  contractsFilePath: string;
  id: string;
}
