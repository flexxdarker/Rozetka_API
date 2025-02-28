import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ProductCard from "./ProductCard.tsx";
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
// import {TokenService} from "../../services/tokenService.ts";

interface ProductCardListProps {
    productsProps ?: IProductModel[];
}


const ProductCardList: React.FC<ProductCardListProps> = ({productsProps}) => {

    const [products,setProducts] = useState<IProductModel[] | undefined>(productsProps);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
    };



    useEffect(() => {
        if (productsProps === undefined) {
            loadProducts(); // Завантажуємо продукти, якщо пропси не передано
        } else {
            setProducts(productsProps); // Якщо пропси передано, використовуємо їх

        }

        // const jwtDecode = TokenService.getAccessTokenPayload();
        // console.log("jwtDecode:" ,jwtDecode);
    }, [productsProps]); // Додаємо залежність від пропсів

    // Перевіряємо, чи є продукти перед рендером
    if (!products) {
        return <div>Loading...</div>; // Можна додати індикатор завантаження, поки продукти не завантажено
    }

    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    {
                        products.map(item => <ProductCard key={item.id} item={item}/>)
                    }

                </Grid>
            </Box>

        </>
    );
};

export default ProductCardList;