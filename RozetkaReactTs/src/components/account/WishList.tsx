import React, {useEffect, useState} from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import Grid from "@mui/material/Grid2";
import ProductCard from "../product/ProductCard.tsx";
import Box from "@mui/material/Box";
import BasketItem from "../basket/BasketItem.tsx";
import {WishListService} from "../../services/wishListService.ts";

const WishList:React.FC = () => {

    const [products,setProducts] = useState<IProductModel[]>([]);
    const wishList = WishListService.getItems();

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                {
                    products.map(product => wishList[product.id] > 0 ? <ProductCard key={product.id} item={product}/> : null)
                }

            </Grid>
        </Box>
    );
};

export default WishList;