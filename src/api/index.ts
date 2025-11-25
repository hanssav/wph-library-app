import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { APIConfiguration } from './config';
import { store } from '@/store';
import { clearAuth } from '@/store/slices';

export const apiInstance = axios.create({
  baseURL: APIConfiguration.baseUrl,
  headers: {
    accept: 'application/json',
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response Interceptor  →automatic logout 401
apiInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth());
      localStorage.clear();
    }
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

interface ErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export function getErrorMessage(err: unknown): string {
  // Handle Axios errors
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ErrorResponse>;

    // Priority: response.data.message > response.data.error > err.message
    const message =
      axiosError.response?.data?.message ??
      axiosError.response?.data?.error ??
      axiosError.message;

    return message || 'An error occurred';
  }

  // Handle standard Error objects
  if (err instanceof Error) {
    return err.message;
  }

  // Handle string errors
  if (typeof err === 'string') {
    return err;
  }

  // Handle object with message property
  if (err && typeof err === 'object' && 'message' in err) {
    return String(err.message);
  }

  return 'Unknown error';
}

export function isAuthError(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 401;
}
