import React, {useEffect, useState} from 'react';
import PriceFilter from "./filters/PriceFilter.tsx";

// export interface IFilter {
//     prices?: {
//         minPrice: number;
//         maxPrice: number;
//     };
// }

interface IFilterHotelsSectionProps {
    minPriceInit: number;
    maxPriceInit: number;
    //onChange?: (filter: IFilter) => void;
    onChange?: (minPrice: number, maxPrice: number) => void;
}


const FiltersProducts:React.FC<IFilterHotelsSectionProps> = (props) => {

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

    return (
        <>
            <PriceFilter maxPriceValueInit={maxPriceInit} minPriceValueInit={minPriceInit} onChange={priceValue}/>
        </>
    );
};

export default FiltersProducts;