
import axios from "axios";
import {ILoginModel, IRegisterModel} from "../models/accountsModel.ts";
import {IUserTokens} from "../models/tokenModel.ts";
import {TokenService} from "./tokenService.ts";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "Accounts",
});

//const api = `${import.meta.env.VITE_ROZETKA_API}` + "Accounts/";

export const AccountsService = {
    register(model: IRegisterModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }
        return api.post("register", data);
        // return api.post<IUserTokens>("register", data);
    },

    login(model: ILoginModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }
        return api.post<IUserTokens>("login", data);
    },

    logout(refreshToken: string) {
        TokenService.clear();
        return api.post("logout", { refreshToken: refreshToken});
    },
};