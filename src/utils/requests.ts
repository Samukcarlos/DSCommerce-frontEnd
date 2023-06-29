import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import * as authService from '../services/auth-service';

export function requestBackend(config: AxiosRequestConfig){

    const headers = config.withCredentials
        ? {                                        // ? se
            ...config.headers,
            Authorization: "Bearer " + authService.getAccessToken()
        }
        : config.headers;                          // : senão

     return axios({...config, baseURL: BASE_URL, headers});
}
