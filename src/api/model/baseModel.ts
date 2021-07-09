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
