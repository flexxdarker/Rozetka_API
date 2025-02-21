import React, {useState} from 'react';
import PriceFilter from "./filters/PriceFilter.tsx";



const FiltersProducts:React.FC = () => {

    const [minPrice, setMinPrice] = useState<number | null>();
    const [maxPrice, setMaxPrice] = useState<number | null>();

    const priceValue = (minPrice:number | null, maxPrice:number | null) =>{
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    }


    return (
        <>
            <PriceFilter maxPriceValue={1000} minPriceValue={100} onChange={priceValue}/>
        </>
    );
};

export default FiltersProducts;