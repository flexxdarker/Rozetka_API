import axios from "axios";
import {ILoginModel, IRegisterModel} from "../models/accountsModel.ts";
import {IUserTokens} from "../models/tokenModel.ts";
import {TokenService} from "./tokenService.ts";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "Accounts",
});

//const api = `${import.meta.env.VITE_ROZETKA_API}` + "Accounts/";

export const AccountsService = {



    async register(model: IRegisterModel)  {
        console.log("model: ", model);
        // const res = await api.post("register", model, {
        //             headers: {
        //                 "Content-Type": "application/json", // Вказуємо, що дані передаються у JSON
        //             },
        //         });

        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        if (model.avatar) {
                data.append('avatar', model.avatar); // додаємо кожен файл
            };


        try {
            const res = await api.post("register", data);

            if (res.status === 200) {
                // On success, attempt to login with the provided credentials
                const mode: ILoginModel = { email: model.email, password: model.password };
                return await AccountsService.login(mode);
            }

            return res; // Return the response in case of failure
        } catch (error) {
            console.error("Registration failed:", error);
            throw error; // Rethrow or handle the error as needed
        }
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