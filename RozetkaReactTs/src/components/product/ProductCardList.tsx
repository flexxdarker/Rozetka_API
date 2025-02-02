import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ProductCard from "./ProductCard/ProductCard.tsx";
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";


const ProductCardList: React.FC = () => {

    const [products,setProducts] = useState<IProductModel[]>([]);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    {
                        products.map(item => <ProductCard key={item.id} item={item}/>)
                    }

                </Grid>
            </Box>
    );
};

export default ProductCardList;
