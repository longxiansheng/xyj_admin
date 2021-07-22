export interface BasicPageParams {
  page: number;
  pageSize: number;
  sorting: string;
}

export interface BasicFetchResult<T extends any> {
  items: T;
  total: number;
}

export interface Id {
  id: any;
}

export interface FileInfo {
  id: string;
  tenantId?: string;
  name: string;
  realName: string;
  suffix: string;
  md5Code: string;
  size: string;
  path: string;
  url: string;
}
