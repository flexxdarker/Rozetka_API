export interface IRegisterModel {
    email: string;
    password: string;
    name: string;
    surname: string;
    parentCategoryName: string;
}

export interface ILoginModel {
    email: string;
    password: string;
}

export interface IRefreshTokenModel {
    refreshToken: string;
    accessToken: string;
}