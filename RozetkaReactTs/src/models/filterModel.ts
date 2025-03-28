export interface IFilterModel {
    id: number;
    name: string;
    values: IFilterValueModel[];
}

export interface IFilterValueModel {
    id: number;
    value: string;
    filterId: number;
    filterName: string;
}

export interface IFilterCreateModel {
    id?: number;
    name: string;
    filerValues: string[];
}