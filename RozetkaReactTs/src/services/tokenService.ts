import {IUserTokens} from "../models/tokenModel.ts";


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

    getAccessToken() {
        if (!saveaccesstoken) return null;
        return localStorage.getItem(saveaccesstoken);
    },

    getRefreshToken() {
        if (!saverefreshtoken) return null;
        return localStorage.getItem(saverefreshtoken);
    },

    isExists() {
        return localStorage.getItem(saveaccesstoken) != null;
    }
}