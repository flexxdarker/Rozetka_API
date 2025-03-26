import React, {useEffect, useState} from 'react';
import PriceFilter from "./filters/PriceFilter.tsx";
// import MultipleSelect from "./filters/MultipleSelect.tsx";
// import {ProductServices} from "../../services/productService.ts";
import MultipleSelect from "./filters/MultipleSelect.tsx";
import useFilters from "../../hooks/useFilters.ts";
import {IFilterModel, IFilterValueModel} from "../../models/filterModel.ts";


interface IFilterHotelsSectionProps {
    minPriceInit: number;
    maxPriceInit: number;
    onChange?: (minPrice: number, maxPrice: number) => void;
    onChangeFilters?: (newFilters: IFilterModel[]) => void;
}

const FiltersProducts:React.FC<IFilterHotelsSectionProps> = (props) => {

    const {filters} = useFilters();

    const [minPriceInit, setMinPriceInit] = useState<number>(props.minPriceInit);
    const [maxPriceInit, setMaxPriceInit] = useState<number>(props.maxPriceInit);
    // //Відслідковуємо зміни у пропсах і оновлюємо локальний стан
    useEffect(() => {
        setMinPriceInit(props.minPriceInit);
        setMaxPriceInit(props.maxPriceInit);
    }, [props.minPriceInit, props.maxPriceInit]); // Оновлюємо стан, коли пропси змінюються


    const [minPrice ,setMinPrice ] = useState<number>(0);
    const [maxPrice ,setMaxPrice ] = useState<number>(0);
    const priceValue = (minPrice:number, maxPrice:number) =>{
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        props.onChange!(minPrice,maxPrice);
    }
    useEffect(() => {
        props.onChange!(minPrice,maxPrice);
    }, [minPrice, maxPrice]); // Оновлюємо стан, коли пропси змінюються


    const [selectedValues, setSelectedValues] = useState<Map<number, IFilterValueModel[]>>(new Map());

    const handleSelectChange = (filterId: number, selected: IFilterValueModel[]) => {
        setSelectedValues((prevState) => {
            const newState = new Map(prevState);
            newState.set(filterId, selected);
            return newState;
        });
    };

    // Функція для обчислення відфільтрованих значень
    const getFilteredData = (): IFilterModel[] => {
        return filters.map((filter) => {
            const selectedFilterValues = selectedValues.get(filter.id) || [];
            return {
                ...filter,
                values: filter.values.filter((value) =>
                    selectedFilterValues.some((selected) => selected.value === value.value)
                )
            };
        }).filter((filter) => filter.values.length > 0); // Фільтруємо порожні фільтри
    };

    useEffect(() => {
        //console.log('Filtered Data:', getFilteredData());
        if (props.onChangeFilters) {
            props.onChangeFilters(getFilteredData());
        }
    }, [selectedValues]);

    return (
        <div className={"flex flex-col gap-[4px]"}>
            <PriceFilter maxPriceValueInit={maxPriceInit} minPriceValueInit={minPriceInit} onChange={priceValue}/>
            {filters.map(filter => <MultipleSelect title={filter.name} values={filter.values} key={filter.id}
                                                   selectedValues={selectedValues.get(filter.id) || []}
                                                   onChange={(selectedValues) => handleSelectChange(filter.id, selectedValues)}/>)
            }
        </div>
    );
};

export default FiltersProducts;