import { defHttp } from '/@/utils/http/axios';
import { PackageList, GetPackageByPagedModel, GetPagedParams } from './model/packageListModel';
import { Id } from '/@/api/model/baseModel';

enum Api {
  url ='/api/backendManagement/ServicePackagInfo'
}

export function GetPackageByPaged(params: GetPagedParams) {
  return defHttp.get<GetPackageByPagedModel>({
    url: Api.url,
    params
  })
}

export function CreateOrUpdate(params:PackageList){
  return defHttp.post<PackageList>({
    url: Api.url,
    params
  })
}


export function DelPackageById(params: Id) {
  var url = Api.url+ "/" + `${params.id}`;
  return defHttp.delete<PackageList>({
    url: url
  },{
    isTransformRequestResult:false
  })
}
