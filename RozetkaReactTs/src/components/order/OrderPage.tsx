import React, {useEffect, useState} from 'react';
import ContactDetailsOrder from "./СontactDetailsOrder.tsx";
import DeliveryOrder from "./DeliveryOrder.tsx";
import PaymentOrder from "./PaymentOrder.tsx";
import {IBasketModel} from "../../models/basketModel.ts";
import getWordForm from "../../functions/getWordForm.ts";
import {BasketService} from "../../services/basketService.ts";
import BasketItem from "../basket/BasketItem.tsx";
import formatPrice from "../../functions/formatPrice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {calculateTotalPrice} from "../../store/actions/basketActions.ts";
import {Link} from "react-router-dom";
import {BasketServicesApi} from "../../services/basketServiceApi.ts";
import useProducts from "../../hooks/useProducts.ts";


const OrderPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const totalPrice = useSelector((state: RootState) => state.basket.totalPrice);

    const {products} = useProducts();
    const [basket, setBasket] = useState<IBasketModel>({});
    const itemWord = getWordForm(Object.keys(basket).length, ['товар', 'товари', 'товарів']);

    const handleBasketUpdate = () => {
        const savedBasket = BasketService.getItems();
        if (savedBasket) {
            setBasket(savedBasket);
        }
    };

    useEffect(() => {
        handleBasketUpdate();
        // setBasket(BasketService.getItems());
        window.addEventListener('basket-updated', handleBasketUpdate);

        return () => {
            window.removeEventListener('basket-updated', handleBasketUpdate);
        };
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            dispatch(calculateTotalPrice(products, basket));
        }
    }, [products, basket, dispatch]);

    const pushOrder = () =>{
        BasketServicesApi.pushOrder();
    }


    return (
        <>
            <div className="flex gap-[4px]">
                <div className="flex-col w-[900px]">
                    <ContactDetailsOrder/>
                    <DeliveryOrder/>
                    <PaymentOrder/>
                </div>
                <div className="w-[648px]">
                    <div className="flex w-[100%] flex-col gap-[4px] items-start shrink-0 flex-nowrap relative">
                        <div
                            className="mb-[4px] flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-tl-[8px] rounded-tr-[8px] rounded-br-none rounded-bl-none">
                            <div
                                className="flex w-[158px] pt-[10px] pr-0 pb-[10px] pl-0 flex-col items-start shrink-0 flex-nowrap relative]">
                                <div
                                    className="flex pt-[10px] pr-[40px] pb-[10px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative">
              <span
                  className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] relative text-left whitespace-nowrap">
                Інформація про замовлення
              </span>
                                </div>
                                <div
                                    className="flex pt-[10px] pr-[40px] pb-[10px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative">
              <span
                  className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-light leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                У вашому кошику {Object.keys(basket).length} {itemWord}
              </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*items*/}
                    <div className="flex w-[100%] flex-col gap-[4px] items-start shrink-0 flex-nowrap relative">

                        {
                            Object.keys(basket).length === 0 ?
                                <Link to="/" className="w-full flex h-[40px] bg-[white] items-center justify-center">За покупками!</Link> :
                            products.map(product => basket[product.id] > 0 ? <BasketItem item={product} className="rounded-none"/> : null)
                        }

                    </div>

                    {/*start ending*/}
                    <div
                        className="mt-[4px] flex-col p-[40px] justify-between items-end self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-none rounded-br-[8px] rounded-bl-[8px] relative">
                        <div
                            className="flex w-[100%] h-[40px] pt-0 pr-0 pb-0 pl-[10px] justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#b5b5b5] relative overflow-hidden">
                            <div>
                                <input placeholder={"Введіть промокод"}
                                       className="w-[568px] h-[40px] pl-[10px] shrink-0 bg-transparent border-none absolute top-[-1px] left-[-1px] z-[5]"/>
                            </div>
                            <div>
                                <button
                                    className="flex w-[121px] h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#b5b5b5] rounded-[8px] border-none relative pointer">
            <span
                className="flex w-[101px] h-[12px] justify-center items-start shrink-0 basis-auto font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] relative text-center whitespace-nowrap">
              Застосувати
            </span>
                                </button>
                            </div>
                        </div>


                        <div
                            className="flex flex-col gap-[10px] items-start self-stretch shrink-0 flex-nowrap">
                            <div
                                className="flex justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#fff]">
                                <div
                                    className="flex w-[166px] flex-col items-start shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[166px] p-[10px] gap-[10px] items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                  Сума замовлення:
                </span>
                                    </div>
                                </div>
                                <div
                                    className="flex p-[10px] gap-[10px] shrink-0 flex-nowrap">
              <span
                  className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-semibold leading-[15px] text-[#3b3b3b] text-right whitespace-nowrap">
                {formatPrice(totalPrice)} грн
              </span>
                                </div>
                            </div>
                            <div
                                className="flex justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
                                <div
                                    className="flex w-[163px] flex-col items-start shrink-0 flex-nowrap">
                                    <div
                                        className="flex p-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap]">
                  Оплата бонусами:
                </span>
                                    </div>
                                </div>
                                <div
                                    className="flex w-[147px] p-[10px] pr-[10px] gap-[10px] justify-end items-right shrink-0 flex-nowrap">
              <span
                  className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#3b3b3b] text-right whitespace-nowrap">
                -{Math.floor(totalPrice / 100)} грн
              </span>
                                </div>
                            </div>
                            <div
                                className="flex justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] overflow-hidden">
                                <div className="flex w-[164px] flex-col items-start shrink-0 flex-nowrap">
                                    <div
                                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  Всього до оплати:
                </span>
                                    </div>
                                </div>
                                <div
                                    className="flex p-[10px] gap-[10px] shrink-0 flex-nowrap">
              <span
                  className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-semibold leading-[15px] text-[#3b3b3b] text-left whitespace-nowrap">
                {formatPrice(totalPrice-Math.floor(totalPrice / 100))} грн
              </span>
                                </div>
                            </div>
                            <button onClick={pushOrder}
                                className={`${Object.keys(basket).length === 0 ? "pointer opacity-50 pointer-events-none" : ""} flex mt-[40px] h-[40px] flex-col gap-[20px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none pointer`}>
        <span
            className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] text-left whitespace-nowrap">
          Замовлення підтверджую
        </span>
                            </button>
                        </div>


                    </div>

                </div>

            </div>

        </>
    )
        ;
};

export default OrderPage;
