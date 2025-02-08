import React, {useEffect, useState} from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import close from "../../assets/icons/close.svg"
import BasketItem from "./BasketItem.tsx";
import {IBasketModel} from "../../models/basketModel.ts";
import {BasketService} from "../../services/basketService.ts";
import {Link} from "react-router-dom";


const Basket: React.FC = () => {

    const [products, setProducts] = useState<IProductModel[]>([]);
    const [basket, setBasket] = useState<IBasketModel[]>([]);

    const [productsInBasket, setProductsInBasket] = useState<IProductModel[]>([]);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
        setBasket(BasketService.getItems());
        const basketItems = BasketService.getItems();

        const updatedProductsInBasket = products.filter(product =>
            basketItems[product.id] > 0 // Перевірка на наявність товару і його кількість
        );
        setProductsInBasket(updatedProductsInBasket); // Оновити список продуктів в кошику
    },[]);

    useEffect(() => {

        const basketItems = BasketService.getItems();

        const updatedProductsInBasket = products.filter(product =>
            basketItems[product.id] > 0 // Перевірка на наявність товару і його кількість
        );
        setProductsInBasket(updatedProductsInBasket);

    }, [products, basket]);

    return (
        <>
            <div
                className="main-container flex w-[850px] flex-col gap-[40px] items-start flex-nowrap bg-[#f0f0f0] rounded-[8px] relative mx-auto my-0">
                <div className="flex flex-col gap-[40px] items-center self-stretch shrink-0 flex-nowrap relative">
                    <div
                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-tl-[8px] rounded-tr-[8px] rounded-br-none rounded-bl-none border-solid border-t border-t-[#9cc319] relative z-[1]">
                        <div
                            className="flex w-[158px] pt-[10px] pr-0 pb-[10px] pl-0 flex-col items-start shrink-0 flex-nowrap relative z-[2]">
                            <div
                                className="flex pt-[10px] pr-[40px] pb-[10px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[3]">
              <span
                  className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#9140d3] relative text-left whitespace-nowrap z-[4]">
                Кошик
              </span>
                            </div>
                            <div
                                className="flex pt-[10px] pr-[40px] pb-[10px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative z-[5]">
              <span
                  className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-light leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[6]">
                2 товари
              </span>
                            </div>
                        </div>
                        <div className="flex w-[40px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[7]">
                            <div
                                className="w-[40px] h-[40px] shrink-0 rounded-[8px] relative z-[8]">
                                <img src={close}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[760px] flex-col gap-[20px] items-start shrink-0 flex-nowrap relative z-[9]">

                        {
                            productsInBasket.map(product => (<BasketItem item={product}/>))
                        }

                    </div>

                    </div>
                    <div
                        className="flex pt-[40px] pr-[40px] pb-[40px] pl-[40px] justify-between items-end self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border-solid border-b border-b-[#9cc319] relative z-[64]">
                        <div
                            className="flex w-[281px] flex-col gap-[20px] justify-center items-start shrink-0 flex-nowrap relative z-[65]">
                            <div className="flex w-[207px] flex-col items-start shrink-0 flex-nowrap relative z-[66]">
                                <div
                                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[67]">
              <span
                  className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[68]">
                Сума замовлення:
              </span>
                                </div>
                                <div
                                    className="flex w-[169px] flex-col gap-[12px] items-start shrink-0 flex-nowrap relative z-[69]">
                                    <div
                                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[70]">
                <span
                    className="h-[20px] shrink-0 basis-auto font-['Inter'] text-[28px] font-medium leading-[20px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[71]">
                  23 798 грн
                </span>
                                    </div>
                                    <div
                                        className="flex w-[138px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[72]">
                <span
                    className="flex w-[118px] h-[10px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#9140d3] relative text-center whitespace-nowrap z-[73]">
                  +238 грн кешбек
                </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex w-[260px] flex-col gap-[10px] items-start shrink-0 flex-nowrap relative z-[74]">
                                <div
                                    className="flex w-[260px] justify-center items-center shrink-0 flex-nowrap relative z-[75]">
                                    <div
                                        className="flex w-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[76]">
                                        <div
                                            className="w-[24px] h-[24px] shrink-0 bg-[url(../assets/images/987886f4-eadf-4dfe-99df-ed615ad9cd41.png)] bg-cover bg-no-repeat relative overflow-hidden z-[77]"/>
                                    </div>
                                    <div
                                        className="flex w-[216px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[78]">
                <span
                    className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-semibold leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[79]">
                    <Link to={"/"}>
                  Продовжити покупки
                    </Link>
                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex w-[250px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[80]">
                            <button
                                className="flex h-[50px] flex-col gap-[20px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none relative z-[81] pointer">
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#fff] relative text-left whitespace-nowrap z-[82]">
              Купити зараз
            </span>
                            </button>
                            <button
                                className="flex h-[50px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#9cc319] relative z-[83] pointer">
                                <div
                                    className="w-[162px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[15px] relative text-center whitespace-nowrap z-[84]">
              <span
                  className="font-['Inter'] text-[20px] font-medium leading-[24px] text-[#3b3b3b] relative text-center">
                Купити в кредит
              </span>
                                    <span
                                        className="font-['Inter'] text-[16px] font-medium leading-[16px] text-[#3b3b3b] relative text-center">
                {" "}
              </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

            </>
            );
            };

            export default Basket;
