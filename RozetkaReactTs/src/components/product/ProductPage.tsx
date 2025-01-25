import React from 'react';
import {useParams} from "react-router-dom";


const ProductPage: React.FC = () => {

    const params = useParams();

    return(
        <>
            <h1>Product Page {params.id}</h1>
        </>
    )
}

export default ProductPage;