import { defHttp } from '/@/utils/http/axios';
import { PackageList } from './model/packageListModel'

enum Api {
  url ='/api/backendManagement/ServicePackagInfo'
}


export function CreateOrUpdate(params:PackageList){
  return defHttp.post<PackageList>({
    url: Api.url,
    params
  })
}
