
import axios from "axios";
import {ILoginModel, IRegisterModel} from "../models/accountsModel.ts";
import {IUserTokens} from "../models/tokenModel.ts";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "Accounts",
});

//const api = `${import.meta.env.VITE_ROZETKA_API}` + "Accounts/";

export const AccountsService = {
    register(model: IRegisterModel) {
        return api.post<IUserTokens>("register", model);
    },
    login(model: ILoginModel) {
        return api.post("login", model);
    },
    logout(refreshToken: string) {
        return api.post("logout", { refreshToken: refreshToken});
    },
};