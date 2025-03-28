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

export interface IUserModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    password: string;
    avatar: string;
    lockoutEnabled: boolean;
    lockoutEnd: string;
    roles: string;
}

export interface IEditUserModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthdate: string;
    avatar?: File;
}

export interface IUserNewToken {
    token: string;
}

export interface IUserChangePassword {
    currentPassword: string;
    newPassword: string;
}