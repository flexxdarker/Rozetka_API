import {IUserTokens} from "../models/tokenModel.ts";
import { jwtDecode } from "jwt-decode";

interface ITokenPayload {
    [key: string]: string | number | undefined;
    id: string;
    email: string;
    dateOfBirth: string;
    role: string;
    mobilePhone: string;
}


const saveaccesstoken = import.meta.env.VITE_APP_SAVE_ACCOUNT_ACCESS;
// const saveaccesstoken = process.env.REACT_APP_SAVE_ACCOUNT_ACCESS;
const saverefreshtoken = import.meta.env.VITE_APP_SAVE_ACCOUNT_REFRESH;

export const TokenService = {
    save(model: IUserTokens) {
        localStorage.setItem(saveaccesstoken, model.accessToken);
        localStorage.setItem(saverefreshtoken, model.refreshToken);
    },

    clear() {
        localStorage.removeItem(saveaccesstoken);
        localStorage.removeItem(saverefreshtoken);
    },

    getAccessToken(): string | null {
        if (!saveaccesstoken) return null;
        return localStorage.getItem(saveaccesstoken);
    },

    getRefreshToken() {
        if (!saverefreshtoken) return null;
        return localStorage.getItem(saverefreshtoken);
    },

    isExists() {
        if(localStorage.getItem(saveaccesstoken)) {
            return true;
        }
         return  false;
    },

    getAccessTokenPayload(): ITokenPayload | null {
        const token = this.getAccessToken();

        if (!token) return null;

        try {
            // const payload = jwtDecode(token);
            const payload = jwtDecode<ITokenPayload>(token);

            return {
                id:
                    payload[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                        ] as string,
                email:
                    payload[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
                        ] as string,
                dateOfBirth:
                    payload[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth"
                        ] as string,
                role: payload[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                    ] as string,
                mobilePhone:
                    payload[
                        "exp"
                        ] as string,
                // mobilePhone:
                //     payload[
                //         "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
                //         ] as string,
            };
        } catch (error) {
            console.error("Error decoding token", error);
            return null;
        }
    },
}