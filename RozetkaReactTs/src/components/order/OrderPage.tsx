import React, {useEffect, useState} from 'react';
import ContactDetailsOrder from "./СontactDetailsOrder.tsx";
import DeliveryOrder from "./DeliveryOrder.tsx";
import PaymentOrder from "./PaymentOrder.tsx";
import {IProductModel} from "../../models/productsModel.ts";
import {IBasketModel} from "../../models/basketModel.ts";
import getWordForm from "../../functions/getWordForm.ts";
import {ProductServices} from "../../services/productService.ts";
import {BasketService} from "../../services/basketService.ts";
import BasketItem from "../basket/BasketItem.tsx";
import formatPrice from "../../functions/formatPrice.ts";


const OrderPage: React.FC = () => {

    const [products, setProducts] = useState<IProductModel[]>([]);
    const [basket, setBasket] = useState<IBasketModel>({});
    const itemWord = getWordForm(Object.keys(basket).length, ['товар', 'товари', 'товарів']);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
    };

    const handleBasketUpdate = () => {
        const savedBasket = BasketService.getItems();
        if (savedBasket) {
            setBasket(savedBasket);
        }
    };

    useEffect(() => {
        loadProducts();
        handleBasketUpdate();
        // setBasket(BasketService.getItems());
        window.addEventListener('basket-updated', handleBasketUpdate);

        return () => {
            window.removeEventListener('basket-updated', handleBasketUpdate);
        };
    }, []);

    const calculateTotalPrice = () => {
        return products.reduce((total, product) => {
            const quantity = basket[product.id.toString()] || 0;
            return total + (product.price - product.discount) * quantity;
        }, 0);
    };


    return (
        <>
            <h1>order page</h1>
            <div className="flex gap-[4px]">
                <div className={"w-[900px]"}>
                    <ContactDetailsOrder/>
                    <DeliveryOrder/>
                    <PaymentOrder/>
                </div>
                <div className={"w-[648px]"}>
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
                            // productsInBasket.map(product => (<BasketItem item={product}/>))
                            products.map(product => basket[product.id] > 0 ? <BasketItem item={product}/> : null)
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
                                    className="flex w-[166px] flex-col items-start shrink-0 flex-nowrap relative">
                                    <div
                                        className="flex w-[166px] p-[10px] gap-[10px] items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                  Сума замовлення:
                </span>
                                    </div>
                                </div>
                                <div
                                    className="flex w-[127px] p-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
              <span
                  className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-semibold leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                {formatPrice(calculateTotalPrice())} грн
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
                                    className="flex w-[147px] p-[10px] pr-[0px] gap-[10px] justify-end items-right shrink-0 flex-nowrap">
              <span
                  className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#3b3b3b] relative text-right whitespace-nowrap">
                -{Math.floor(calculateTotalPrice() / 100)} грн
              </span>
                                </div>
                            </div>
                            <div
                                className="flex justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative overflow-hidden">
                                <div className="flex w-[164px] flex-col items-start shrink-0 flex-nowrap relative z-20">
                                    <div
                                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                  Всього до оплати:
                </span>
                                    </div>
                                </div>
                                <div
                                    className="flex w-[127px] p-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
              <span
                  className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-semibold leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                {formatPrice(calculateTotalPrice()-Math.floor(calculateTotalPrice() / 100))} грн
              </span>
                                </div>
                            </div>
                            <button
                                className="flex mt-[40px] h-[40px] flex-col gap-[20px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none relative z-[26] pointer">
        <span
            className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] relative text-left whitespace-nowrap z-[27]">
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
