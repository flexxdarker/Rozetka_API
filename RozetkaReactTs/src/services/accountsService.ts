import axios from "axios";
import {
    IEditUserModel,
    ILoginModel,
    IRegisterModel,
    IUserChangePassword,
    IUserModel,
    IUserNewToken
} from "../models/accountsModel.ts";
import {IUserTokens} from "../models/tokenModel.ts";
import {TokenService} from "./tokenService.ts";

const apiToken = `${import.meta.env.VITE_ROZETKA_API}` + "Accounts";

const api = axios.create({
    baseURL: apiToken,
});

axios.interceptors.request.use(
    (config) => {
        const token = TokenService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

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

    getAllUsers(){
        return axios.get<IUserModel[]>(apiToken + "/GetAllUsers")
    },

    getUserById(){
        return axios.get<IUserModel>(apiToken + "/UserById")
    },

    editUser(model: IEditUserModel){
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        if (model.avatar) {
            data.append('avatar', model.avatar as File); // додаємо кожен файл
        }

        return axios.put<IUserNewToken>(apiToken + "/edit-user", data);
    },

    changePassword(model: IUserChangePassword){

        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        return axios.post<{ message: string }>(apiToken + "/change-password",data)
    },
};