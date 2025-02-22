import axios from "axios";
import {ILoginModel, IRegisterModel} from "../models/accountsModel.ts";
import {IUserTokens} from "../models/tokenModel.ts";
import {TokenService} from "./tokenService.ts";
import {message} from "antd";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "Accounts",
});



//const api = `${import.meta.env.VITE_ROZETKA_API}` + "Accounts/";

export const AccountsService = {



    async register(model: IRegisterModel)  {
        // Створюємо об'єкт даних для відправки у форматі JSON
        // return api.post("register", model, {
        //     headers: {
        //         "Content-Type": "application/json", // Вказуємо, що дані передаються у JSON
        //     },
        // });
        const res = await api.post("register", model, {
                    headers: {
                        "Content-Type": "application/json", // Вказуємо, що дані передаються у JSON
                    },
                });
        if(res.status === 200){
            const mode:ILoginModel = {email: model.email, password: model.password};
            return AccountsService.login(mode);
        }

        return res;
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