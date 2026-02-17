import axios, { AxiosRequestConfig } from "axios";
// import { ApiError, TypedAxiosInstance } from "./type-wrapper";
// import Config from "./config";
// import { authRefresh } from "./auth";

// import Cookies from "js-cookie";

const axiosObject = axios.create({ baseURL: "https://adonix.hackillinois.org", withCredentials:true});

// axiosObject.interceptors.request.use((config) => {
//   const jwt = Cookies.get("jwt");

//   console.log("jwt here:")
//   console.log(jwt);
  
//   // localStorage.getItem("jwt");
//   if (jwt) {
//     config.headers.Authorization = jwt;
//   } else {
//     config.headers.Authorization = undefined;
//   }

//   return config;
// });


// axiosObject.interceptors.response.use(
//   (response) => response,
//   (error: ApiError) => {
//     const errorType = error.response?.data?.error;
//     const status = error.response?.status;

//     if (
//       status === 401 ||
//       errorType === "NoJWT" ||
//       errorType === "ExpiredJWT" ||
//       errorType === "InvalidJWT"
//     ) {
//       localStorage.removeItem("jwt");

//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }

//       return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );
// axiosObject.interceptors.response.use(
//   (response) => response,
//   (error: ApiError) => {
//     const errorType = error.response?.data?.error;

//     if (errorType === "NoJWT") {
//       localStorage.removeItem("jwt");
//       authRefresh();
//       return;
//     }

//     if (errorType === "ExpiredJWT" || errorType === "InvalidJWT") {
//       localStorage.removeItem("jwt");
//       window.location.reload();
//       return;
//     }

//     console.error("API error:", error);

//     return Promise.reject(error);
//   }
// );

const api = {
  get: (url: string, config?: AxiosRequestConfig) => axiosObject.get(url as string, config),
  post: (url:string, data?: any, config?: AxiosRequestConfig) => axiosObject.post(url as string, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) => axiosObject.put(url as string, data, config),
  patch: (url: string, data?: any, config?: AxiosRequestConfig) => axiosObject.patch(url as string, data, config),
  delete: (url: string, config?: AxiosRequestConfig) => axiosObject.delete(url as string, config)
};

export default api;
