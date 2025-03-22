import React, {useEffect, useState} from 'react';
import close from "../../assets/icons/close.svg"
import BasketItem from "./BasketItem.tsx";
import {IBasketModel} from "../../models/basketModel.ts";
import {BasketService} from "../../services/basketService.ts";
import {Link} from "react-router-dom";
import getWordForm from "../../functions/getWordForm.ts";
import formatPrice from "../../functions/formatPrice.ts";
import navArrowLeft from "../../assets/icons/nav-arrow-left.svg"
import deleteBin from "../../assets/icons/deleteBin.svg"
import {useDispatch, useSelector} from "react-redux";
import {calculateTotalPrice} from "../../store/actions/basketActions.ts";
import {AppDispatch, RootState} from "../../store";
import useProducts from "../../hooks/useProducts.ts";

interface BasketProps {
    onClose?: () => void;  // Приймаємо функцію закриття через пропс
}

const Basket: React.FC<BasketProps> = ({onClose}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [toggleClear, setToggleClear] = useState<boolean>(false);
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

    // Розрахунок загальної вартості замовлення та збереження її в Redux
    // const calculateTotalPrice = () => {
    //     const total = products.reduce((total, product) => {
    //         const quantity = basket[product.id.toString()] || 0;
    //         return total + (product.price - product.discount) * quantity;
    //     }, 0);
    //
    //     // Оновлюємо загальну ціну в Redux
    //     dispatch(setTotalPrice(total));
    //
    //     return total;
    // };

    const clearBasket = () => {
        BasketService.clearItems();
        setBasket({}); // Очищаємо стан кошика вручну
        setToggleClear(!toggleClear); // Тригеримо оновлення через toggle
    }

    useEffect(() => {
        if (products.length > 0) {
            dispatch(calculateTotalPrice(products, basket));
        }
    }, [products, basket, dispatch]);


    return (
        <>
            <div
                className="main-container flex w-[850px] flex-col gap-[40px] items-start flex-nowrap bg-[#f0f0f0] rounded-[8px] relative mx-auto my-0">
                <div className="flex flex-col gap-[40px] items-center self-stretch shrink-0 flex-nowrap relative">
                    <div
                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-tl-[8px] rounded-tr-[8px] rounded-br-none rounded-bl-none border-solid border-t border-t-[#9cc319] relative">
                        <div
                            className="flex w-[158px] pt-[10px] pr-0 pb-[10px] pl-0 flex-col items-start shrink-0 flex-nowrap relative]">
                            <div
                                className="flex pt-[10px] pr-[40px] pb-[10px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative">
              <span
                  className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#9140d3] relative text-left whitespace-nowrap">
                Кошик
              </span>
                            </div>
                            <div
                                className="flex pt-[10px] pr-[40px] pb-[10px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative">
              <span
                  className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-light leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                {Object.keys(basket).length} {itemWord}
              </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center h-full">
                            <div className="flex items-center justify-center h-full">
                                <button type={"button"} onClick={clearBasket}
                                        className="flex w-[40px] items-center shrink-0 flex-nowrap relative justify-center">
                                    <div
                                        className="flex w-[40px] h-[40px] shrink-0 rounded-[8px] relative items-center justify-center">
                                        <img src={deleteBin}/>
                                    </div>
                                </button>
                            </div>
                            <div className="flex items-center">
                                <button type={"button"} onClick={onClose}
                                        className="flex w-[40px] gap-[10px] items-center shrink-0 flex-nowrap relative">
                                    <div className="w-[40px] h-[40px] shrink-0 rounded-[8px] relative">
                                        <img src={close}/>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[760px] flex-col gap-[20px] items-start shrink-0 flex-nowrap relative">

                        {
                            Object.keys(basket).length === 0 ?
                                <Link to="/" className="w-full flex h-[40px] bg-[white] rounded-[8px] items-center justify-center" onClick={onClose}>За покупками!</Link> :
                            // productsInBasket.map(product => (<BasketItem item={product}/>))
                            products.map(product => basket[product.id] > 0 ? <BasketItem item={product} key={product.id}/> : null)
                        }

                    </div>

                </div>
                <div
                    className="flex pt-[40px] pr-[40px] pb-[40px] pl-[40px] justify-between items-end self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border-solid border-b border-b-[#9cc319] relative">
                    <div
                        className="flex w-[281px] flex-col gap-[20px] justify-center items-start shrink-0 flex-nowrap relative">
                        <div className="flex w-[207px] flex-col items-start shrink-0 flex-nowrap relative">
                            <div
                                className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative">
              <span
                  className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                Сума замовлення:
              </span>
                            </div>
                            <div
                                className="flex w-[169px] flex-col gap-[12px] items-start shrink-0 flex-nowrap relative">
                                <div
                                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative">
                <span
                    className="h-[20px] shrink-0 basis-auto font-['Inter'] text-[28px] font-medium leading-[20px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                  {formatPrice(totalPrice)} грн
                </span>
                                </div>
                                <div
                                    className="flex w-[138px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative">
                <span
                    className="flex w-[118px] h-[10px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#9140d3] relative text-center whitespace-nowrap">
                  +{Math.floor(totalPrice / 100)} грн кешбек
                </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex w-[260px] flex-col gap-[10px] items-start shrink-0 flex-nowrap relative">
                            <div
                                className="flex w-[260px] justify-center items-center shrink-0 flex-nowrap relative">
                                <div
                                    className="flex w-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap relative">
                                    <div
                                        className="w-[24px] h-[24px] shrink-0 relative overflow-hidden">
                                        <img src={navArrowLeft}/>
                                    </div>
                                </div>
                                <div
                                    className="flex w-[216px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap relative">
                <span
                    className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-semibold leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                    <Link to={"/"} onClick={onClose}>
                  Продовжити покупки
                    </Link>
                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex w-[250px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative">
                        <Link to={"order"}
                              className={`flex h-[50px] flex-col gap-[20px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none relative ${Object.keys(basket).length === 0 ? "pointer opacity-50 pointer-events-none" : ""}`}
                              onClick={onClose}>
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#fff] relative text-left whitespace-nowrap">
              Купити зараз
            </span>
                        </Link>
                        <button
                            className="flex h-[50px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#9cc319] relative pointer">
                            <div
                                className="w-[162px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[15px] relative text-center whitespace-nowrap">
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
