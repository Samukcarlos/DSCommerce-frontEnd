import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";
import { getAccessTokenPayload } from "./auth-service";

export function findMe() {

    const config : AxiosRequestConfig = {
        url: "/users/me",
        withCredentials: true
    }
    return requestBackend(config);
}

export function isAuthenticated(): boolean {
    let tokenPayload = getAccessTokenPayload();
    return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false;
    }