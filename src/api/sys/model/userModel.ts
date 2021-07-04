/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  tenant?: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
  username: string;
  password: string;
  scope?: string;
}

/**
 * @description: Get user information
 */
export interface GetUserInfoByUserIdParams {
  userId: string | number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoByUserIdModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 介绍
  desc?: string;
}
