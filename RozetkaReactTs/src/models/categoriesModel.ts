export interface ICategoryModel {
    id: number;
    name: string;
    image: string;
    parentCategoryId?: number;
    //parentCategoryName: string;
}


export interface ICreateCategoryModel {
    id?: number;
    name: string;
    parentCategoryId?: number;
    image: File;
}

export interface ICategoryName {
    id: number;
    name: string;
}

export interface IUploadedFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}