import { useState, useEffect } from 'react';
import {ProductServices} from "../services/productService.ts";
import {IProductModel} from "../models/productsModel.ts";

const useLoadProducts = () => {
    const [products, setProducts] = useState<IProductModel[]>([]);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        if(res.status === 200){
            setProducts(res.data);
        } else {
            console.log("error download products")
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return products;
};

export default useLoadProducts;
