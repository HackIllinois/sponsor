import axios, { AxiosRequestConfig } from "axios";

const axiosObject = axios.create({ baseURL: "https://adonix.hackillinois.org", withCredentials:true});

axiosObject.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const errorType = error?.response?.data?.error;
    const isAuthError =
      status === 401 ||
      errorType === "NoJWT" ||
      errorType === "ExpiredJWT" ||
      errorType === "InvalidJWT";

    if (isAuthError && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

const api = {
  get: (url: string, config?: AxiosRequestConfig) => axiosObject.get(url as string, config),
  post: (url:string, data?: any, config?: AxiosRequestConfig) => axiosObject.post(url as string, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) => axiosObject.put(url as string, data, config),
  patch: (url: string, data?: any, config?: AxiosRequestConfig) => axiosObject.patch(url as string, data, config),
  delete: (url: string, config?: AxiosRequestConfig) => axiosObject.delete(url as string, config)
};

export default api;
