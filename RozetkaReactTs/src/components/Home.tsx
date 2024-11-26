import React from 'react';
import Container from "@mui/material/Container";
import ButtonMui from "@mui/joy/Button";
import {Button} from "antd";
import ProductCardList from "./product/ProductCardList.tsx";




const Home: React.FC = () => {


    return (
        <>
              <Container maxWidth="sm">


                <ButtonMui
                    color="danger"
                    onClick={function(){}}
                    size="lg"
                >ButtonMui</ButtonMui>

                <Button color="primary" variant="dashed">
                    ButtonAntDesign
                </Button>


            </Container>

            <ProductCardList/>

        </>
    );
};

export default Home;
