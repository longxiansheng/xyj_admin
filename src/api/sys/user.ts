import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoByUserIdParams,
  GetUserInfoByUserIdModel,
} from './model/userModel';

import { ErrorMessageMode } from '/@/utils/http/axios/types';

import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/connect/token',
  GetUserInfoById = '/getUserInfoById',
  GetPermCodeByUserId = '/getPermCodeByUserId',
  GetPermissions = '/api/abp/application-configuration'
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  var __tenant = '';
  if (params.tenant && params.tenant.trim() != '') {
    __tenant = "?__tenant="+params.tenant
  }
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login + __tenant,
      params,
      headers:{ 'Content-Type': ContentTypeEnum.FORM_URLENCODED }
    },
    {
      errorMessageMode: mode,
      isTransformRequestResult:false
    }
  );
}

/**
 * @description: getUserInfoById
 */
export function getUserInfoById(params: GetUserInfoByUserIdParams) {
  return defHttp.get<GetUserInfoByUserIdModel>({
    url: Api.GetUserInfoById,
    params,
  });
}

export function getPermCodeByUserId(params: GetUserInfoByUserIdParams) {
  return defHttp.get<string[]>({
    url: Api.GetPermCodeByUserId,
    params,
  });
}

export function getPermissions() {
  return defHttp.get<string>({
    url: Api.GetPermissions
  })
}
