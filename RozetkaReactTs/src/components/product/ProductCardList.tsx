import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ProductCard from "./ProductCard.tsx";


const ProductCardList: React.FC = () => {


    return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>

                </Grid>
            </Box>
    );
};

export default ProductCardList;
