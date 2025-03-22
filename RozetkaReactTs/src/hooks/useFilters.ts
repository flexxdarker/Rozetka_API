import { useState, useEffect } from 'react';
import {FilterServices} from "../services/filterService.ts";
import {IFilterModel} from "../models/filterModel.ts";

const useFilters = () => {
    const [filters, setFilters] = useState<IFilterModel[]>([]);

    const loadFilters = async () => {
        const res = await FilterServices.getAll();
        if(res.status === 200){
            setFilters(res.data);
        } else {
            console.log("error download filters")
        }
    };

    useEffect(() => {
        loadFilters();
    }, []);

    return {filters, setFilters};
};

export default useFilters;
