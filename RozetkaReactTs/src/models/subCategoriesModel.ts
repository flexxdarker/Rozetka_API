export interface ISubCategoryModel {
    id: number;
    name: string;
    image: string;
    parentCategoryId?: number;
    filters?: number[];
    subCategories?: ISubCategoryTreeModel[];
}


export interface ISubCategoryTreeModel {
    id: number;
    name: string;
    image: string;
    parentCategoryId?: number;
    filters?: number[];
    subCategories: ISubCategoryTreeModel[];
}