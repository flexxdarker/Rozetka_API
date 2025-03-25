import {IUserTokens} from "../models/tokenModel.ts";
import { jwtDecode } from "jwt-decode";

export interface ITokenPayload {
    [key: string]: string | number | undefined;
    id: string;
    name:string;
    surName:string;
    email: string;
    phoneNumber: string;
    image?: string;
    birthdate: string;
    exp: number;
    role?: string;
}


const saveaccesstoken = import.meta.env.VITE_APP_SAVE_ACCOUNT_ACCESS;
//const saverefreshtoken = import.meta.env.VITE_APP_SAVE_ACCOUNT_REFRESH;

export const TokenService = {
    save(model: IUserTokens) {
        localStorage.setItem(saveaccesstoken, model.accessToken);
        window.dispatchEvent(new Event('storageChangeToken'));
    },

    saveTokenString(token: string) {
        localStorage.setItem(saveaccesstoken, token);
        window.dispatchEvent(new Event('storageChangeToken'));
    },

    clear() {
        localStorage.removeItem(saveaccesstoken);
        window.dispatchEvent(new Event('storageChangeToken'));
        //localStorage.removeItem(saverefreshtoken);
    },

    getAccessToken(): string | null {
        if (!saveaccesstoken) return null;
        return localStorage.getItem(saveaccesstoken);
    },

    // getRefreshToken() {
    //     if (!saverefreshtoken) return null;
    //     return localStorage.getItem(saverefreshtoken);
    // },

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
                        "id"
                        ] as string,
                name:
                    payload[
                        "Name"
                        ] as string,
                surName:
                    payload[
                        "SurName"
                        ] as string,
                email:
                    payload[
                        "email"
                        ] as string,
                phoneNumber:
                    payload[
                        "phoneNumber"
                        ] as string,
                avatar:
                    payload[
                        "avatar"
                        ] as string,
                birthdate:
                    payload[
                        "birthdate"
                        ] as string,
                roles: payload[
                    "roles"
                    ] as string,
                exp:
                    payload[
                        "exp"
                        ] as number,
            };
        } catch (error) {
            console.error("Error decoding token", error);
            return null;
        }
    },
}