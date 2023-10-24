import { AxiosRequestConfig } from 'axios';

import requestManager from '@/lib/requestManager/requestManager';

export const get = (path: string, params?: any) => {
  const requestOptions: AxiosRequestConfig = {};
  if (params) {
    requestOptions.params = params;
  }

  return requestManager('get', path, requestOptions);
};

export const post = (path: string, params: any) => {
  const requestOptions: AxiosRequestConfig = { data: params };

  return requestManager('post', path, requestOptions);
};
