import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
  } from 'axios';
  import Router from 'next/router';
  
  /**
   * use apiClient to enable interceptors defined in useAxiosInterceptor.ts
   */
  export const apiClient = axios.create({
    headers: { 'Content-Type': 'application/json' },
  });
  
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  
  // Remove extra data from request
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response?.data?.error) {
        return Promise.reject(response.data);
      }
      return Promise.resolve(response.data);
    },
    (error) => {
      // logout if session expired
      if (error?.response?.status === 401) {
        // Router.push('/logout');
        return;
      }
  
      // Reject promise if usual erro
      return Promise.reject(error?.response?.data);
    }
  );
  