import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
// import { checkJWTValidity } from "../utils/check-jwt-validity";
// import { urlInException } from "../utils/url-in-exception";
// import { appLocalStorage, lskeys } from "./local";

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

// const axiosInterceptors = (reInitializeCB = () => {}) => {
//   axiosInstance.interceptors.request.use(async (config) => {
//     if (!urlInException(config.url!)) {
//       const accessToken = appLocalStorage.get(lskeys.authenticationToken);

//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//     }

//     return config;
//   });

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       const urls = ["/authentication/sign-in", "/authentication/sign-up", "/authentication/tokens"];

//       if (response.config.url && urls.includes(response.config.url)) {
//         handleHeaderTokens(response.headers as AxiosResponseHeaders, reInitializeCB);
//       }

//       return response;
//     },

//     async (error) => {
//       if (error?.response?.status === 401) {
//         const accessToken = appLocalStorage.get(lskeys.authenticationToken);
//         if (accessToken && !checkJWTValidity(accessToken)) {
//           reInitializeCB();
//         }
//       }

//       return Promise.reject(new Error(error.message));
//     }
//   );
// };

// const handleHeaderTokens = (headers: AxiosResponseHeaders, reInitializeCB: () => void) => {
//   const authentication = headers["x-authentication-token"];
//   const refresh = headers["x-refresh-token"];

//   if (authentication !== null && authentication !== undefined) {
//     appLocalStorage.save({ [lskeys.authenticationToken]: authentication });
//   } else {
//     reInitializeCB();
//   }

//   if (refresh !== null && refresh !== undefined) {
//     appLocalStorage.save({ [lskeys.refreshToken]: refresh });
//   }
// };

const handleAxiosResponse = (response: AxiosResponse) => {
  const { status, message, data } = response.data;

  if (status === "error") throw Error(message);

  return { message, data };
};

export {
  axiosInstance,
  //  axiosInterceptors,
  handleAxiosResponse,
};
