import React, {useEffect, useState} from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import Grid from "@mui/material/Grid2";
import ProductCard from "../product/ProductCard.tsx";
import Box from "@mui/material/Box";
import {WishListService} from "../../services/wishListService.ts";
import {Link} from "react-router-dom";

const WishList:React.FC = () => {

    const [products,setProducts] = useState<IProductModel[]>([]);
    const wishList:number[] = WishListService.getItems();

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
                    wishList ?
                    products.map(product => wishList.includes(product.id) ? <ProductCard key={product.id} item={product}/> :
                        null
                    ) : (
                            <Link to={"/"} className={"flex bg-[#fff] min-w-[1000px] p-[20px] rounded-[4px] items-center justify-center"}>
                                Добавте ваш перший товар!!!
                            </Link>
                        )
                }

            </Grid>
        </Box>
    );
};

export default WishList;