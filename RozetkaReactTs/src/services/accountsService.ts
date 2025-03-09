import axios from "axios";
import { ILoginModel, IRegisterModel } from "../models/accountsModel.ts";
import { IUserTokens } from "../models/tokenModel.ts";
import { TokenService } from "./tokenService.ts";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "Accounts",
});

export const AccountsService = {

    async register(model: IRegisterModel) {
        const res = await api.post("register", model, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 200) {
            const mode: ILoginModel = { email: model.email, password: model.password };
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
        return api.post("logout", { refreshToken });
    },

    // 🆕 Доданий метод для авторизації через Google
    async googleLogin(model: { token: string; remember: boolean }) {
        try {
            const response = await api.post<IUserTokens>("GoogleSignIn", model, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;
        } catch (error) {
            console.error("Помилка авторизації через Google:", error);
            throw error;
        }
    },
};
