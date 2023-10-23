import axios, {
  Method as HTTPMethod,
  ResponseType,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

import Config from '@/config/config';
import { clearToken, getToken } from '@/helpers/authentication';
import { clearAuthTokenCookie } from '@/lib/cookies';
import { refreshToken } from '@/services/refreshtoken';

export const authenticatedHeader = (): string => `Bearer ${getToken()?.accessToken}`;

export const successResponseInterceptor = (
  response: AxiosResponse<unknown>
): AxiosResponse<unknown> | Promise<AxiosResponse<unknown>> => {
  const responseData = response.data as any;
  const formattedData = responseData;
  response.data = formattedData;

  return response;
};

export const errorInterceptor = async (error: AxiosError<unknown>): Promise<unknown> => {
  if (error.response && error.config) {
    if (error.response.status === 401) {
      const tokens = getToken();
      const blankResponse = { data: {} };

      if (tokens?.refreshToken) {
        await refreshToken(tokens.refreshToken);

        error.config.headers.set('Authorization', authenticatedHeader());

        return axios.request(error.config);
      }

      clearToken();
      clearAuthTokenCookie();

      window.location.href = '/auth/login';

      return Promise.resolve(blankResponse);
    }

    const errorData = error.response.data as any;
    const formattedData = errorData;
    error.response.data = formattedData;
  }

  return Promise.reject(error);
};

export const defaultOptions = (): {
  responseType: ResponseType;
  baseURL: string;
  headers?: { [key: string]: string };
} => ({
  responseType: 'json',
  baseURL: `${Config.apiBaseUrl}/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: authenticatedHeader(),
  },
});

const requestManager = (
  method: HTTPMethod,
  endpoint: string,
  requestOptions: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  const requestParams: AxiosRequestConfig = {
    method,
    url: endpoint,
    ...defaultOptions(),
    ...requestOptions,
  };

  axios.interceptors.response.use(successResponseInterceptor, errorInterceptor);

  return axios
    .request(requestParams)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
};

export default requestManager;
