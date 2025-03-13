export interface IRegisterModel {
    email: string;
    password: string;
    name: string;
    surname: string;
    birthdate: string;
    avatar: File;
    phoneNumber: string
    // birthdate: dayjs.Dayjs;
}

export interface ILoginModel {
    email: string;
    password: string;
}

export interface IRefreshTokenModel {
    refreshToken: string;
    accessToken: string;
}