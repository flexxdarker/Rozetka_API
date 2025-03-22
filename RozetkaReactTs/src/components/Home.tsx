import React from 'react';
import Container from "@mui/material/Container";
// import ProductCardList from "./product/ProductCardList.tsx";
import ImageSliderMainBaner from "./other/ImageSliderMainBaner.tsx";
import ProductCardByCategory from "./product/ProductCardByCategory.tsx";
import {IProductModel} from "../models/productsModel.ts";
import ProductsReviewed from "./product/productsReviewed.tsx";
import useProducts from "../hooks/useProducts.ts";
import useCategories from "../hooks/useCategories.ts";
// import {Carousel} from "antd";
//
// const contentStyle: React.CSSProperties = {
//     height: '496px', // Висота контейнера
//     color: '#fff', // Колір тексту
//     lineHeight: '496px', // Висота рядка, щоб текст був по центру по вертикалі
//     textAlign: 'center', // Вирівнювання тексту по центру
//     background: '#364d79', // Основний фон
//     backgroundImage: 'url(https://static.codia.ai/image/2025-03-09/cd9311dc-4f06-441e-b875-510882af00e6.png)', // Зображення фону
//     backgroundSize: 'cover', // Розмір фону, щоб зображення покривало весь блок
//     backgroundPosition: 'center', // Центрування фону
// };




const Home: React.FC = () => {

    const images = [
        'https://static.codia.ai/image/2025-03-09/cd9311dc-4f06-441e-b875-510882af00e6.png',
        'data:image/jpeg;base64,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R6LRyrYba9t5/pdOXXt9R/8AFLrYZ628xVsdVtjbjcznkY8lOLk0pimkx5RyvTcmbk1zVvqG8cxr2lrgHN9eYWPc/MPW6xManzCPrh4kOoNcR6dZat0HyiOnLw7D8vwA5rfIZ+wrRGDtSb7V+51t1iEgyQx1EeyeNkjD1a5oIWeF2t/K+ONkTGsjaGtaMAAYACERpeiRAQEBAQEBAQEBAQEBAQEGLW0FJXxGGupoqiPOdsrA4Z+KR4+ETES9ooY4o2xxMDGNGGtaMAD0RPwjOG263Hid8qdJN8z8UlzuMODwcfRDM53Z9Ovdau2L2tflR1t33+EhXepkorVV1cMLppIIXSNjHV5AzhZo8yunxG3FeFmsbpqqSvbcoIgIMFkkTS0Anqw+oV2bFGPWpVYr2tuJbHxPpNQVmn2x6ZMvHEzTM2GQMe5mDyaSR3wevQFRgmkW/mZKzPw2OhKe70+mKOLULi64NDt+XbiBk7QT3O3GVzlms3nr8O6b6+W1fa6B9aytfRwOqmDDZiwFw+K43OtOusMscgoSqgICAgICAgICAgICAgICAgICAgptHkgYCCjY2MB2NDcnPIYTaNQrgHqiQADogqgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg//9k=',
        'https://static.codia.ai/image/2025-03-09/cd9311dc-4f06-441e-b875-510882af00e6.png',
        'data:image/jpeg;base64,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R6LRyrYba9t5/pdOXXt9R/8AFLrYZ628xVsdVtjbjcznkY8lOLk0pimkx5RyvTcmbk1zVvqG8cxr2lrgHN9eYWPc/MPW6xManzCPrh4kOoNcR6dZat0HyiOnLw7D8vwA5rfIZ+wrRGDtSb7V+51t1iEgyQx1EeyeNkjD1a5oIWeF2t/K+ONkTGsjaGtaMAAYACERpeiRAQEBAQEBAQEBAQEBAQEGLW0FJXxGGupoqiPOdsrA4Z+KR4+ETES9ooY4o2xxMDGNGGtaMAD0RPwjOG263Hid8qdJN8z8UlzuMODwcfRDM53Z9Ovdau2L2tflR1t33+EhXepkorVV1cMLppIIXSNjHV5AzhZo8yunxG3FeFmsbpqqSvbcoIgIMFkkTS0Anqw+oV2bFGPWpVYr2tuJbHxPpNQVmn2x6ZMvHEzTM2GQMe5mDyaSR3wevQFRgmkW/mZKzPw2OhKe70+mKOLULi64NDt+XbiBk7QT3O3GVzlms3nr8O6b6+W1fa6B9aytfRwOqmDDZiwFw+K43OtOusMscgoSqgICAgICAgICAgICAgICAgICAgptHkgYCCjY2MB2NDcnPIYTaNQrgHqiQADogqgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg//9k=',
    ];

    const {products} = useProducts();
    const {categories} = useCategories();

    // Перевіряємо, чи є продукти перед рендером
    if (!products) {
        return <div>Loading...</div>; // Можна додати індикатор завантаження, поки продукти не завантажено
    }

    // Групуємо продукти за categoryId
    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.categoryId]) {
            acc[product.categoryId] = [];
        }
        acc[product.categoryId].push(product);
        return acc;
    }, {} as Record<number, IProductModel[]>);

    // Перетворюємо об'єкт на масив категорій
    const result = Object.entries(groupedProducts);


    return (
        <>
            {/*<div className={"flex justify-around"}>*/}
            {/*<Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000} arrows style={{width: "1160px"}}>*/}
            {/*    <div>*/}
            {/*        <h3 style={contentStyle}>1</h3>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <h3 style={contentStyle}>2</h3>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <h3 style={contentStyle}>3</h3>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <h3 style={contentStyle}>4</h3>*/}
            {/*    </div>*/}
            {/*</Carousel>*/}
            {/*</div>*/}
              <Container maxWidth="sm">



            </Container>
            <ImageSliderMainBaner images={images} delay={4000} />

            {/*/ProductCardByCategory productsInit={products.slice(0,4)} title={"Start"}/>*/}

            {
                // Перебираємо кожну категорію та її продукти
                result.map(([categoryId, products],index) => {
                    // Знаходимо відповідну категорію за categoryId
                    const category = categories.find(c => c.id === parseInt(categoryId));

                    if (category) {
                        return (
                    <ProductCardByCategory productsInit={products.slice(0, 4)} title={category.name}
                                           categoryId={Number(categoryId)} key={index}/>
                        )} else {
                        return (
                        <ProductCardByCategory productsInit={products.slice(0, 4)} title={"Без категорії"} key={index}/>
                        )
                    }
                })
            }

            <ProductsReviewed/>
            {/*<ProductCardList productsProps={products}/>*/}


        </>
    );
};

export default Home;
