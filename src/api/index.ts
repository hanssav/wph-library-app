import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { APIConfiguration } from './config';

export const apiInstance = axios.create({
  baseURL: APIConfiguration.baseUrl,
  headers: {
    accept: 'application/json',
  },
});

// ==== USE TOKEN FRON STORAGE EVERY REQUEST ====
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await apiInstance.get<T>(url, config);
    return res.data;
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await apiInstance.post<T>(url, data, config);
    return res.data;
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await apiInstance.patch<T>(url, data, config);
    return res.data;
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await apiInstance.put<T>(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await apiInstance.delete<T>(url, config);
    return res.data;
  },
};

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<{ message?: string }>;
    return ax.response?.data?.message ?? err.message;
  }
  return (err as { message?: string })?.message ?? 'Unknown error';
}

export function isAuthError(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 401;
}
