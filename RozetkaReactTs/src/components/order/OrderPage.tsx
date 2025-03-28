import React, {useEffect, useState} from 'react';
import ContactDetailsOrder from "./СontactDetailsOrder.tsx";
import DeliveryOrder from "./DeliveryOrder.tsx";
import PaymentOrder from "./PaymentOrder.tsx";
import {IBasketItemsModel, IBasketModel} from "../../models/basketModel.ts";
import getWordForm from "../../functions/getWordForm.ts";
import {BasketService} from "../../services/basketService.ts";
import BasketItem from "../basket/BasketItem.tsx";
import formatPrice from "../../functions/formatPrice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {calculateTotalPrice} from "../../store/actions/basketActions.ts";
import {Link, useNavigate} from "react-router-dom";
import {BasketServicesApi} from "../../services/basketServiceApi.ts";
import useProducts from "../../hooks/useProducts.ts";
import {AccountsService} from "../../services/accountsService.ts";
import {IUserModel} from "../../models/accountsModel.ts";
import useIsLogin from "../../hooks/useIsLogin.ts";
import deleteBin from "../../assets/icons/deleteBin.svg";
import useBasket from "../../hooks/useBasket.ts";


export interface Recipient {
    recipientName: string | null;
    recipientSurName: string | null;
    recipientCity: string | null;
    recipientStreet: string | null;
    recipientHouse: string | null;
    recipientFlat: string | null;
    recipientDeliveryType: string | null;
    recipientPayType: string | null;
}


const OrderPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const totalPrice = useSelector((state: RootState) => state.basket.totalPrice);
    const navigate = useNavigate();

    const {isLogin} = useIsLogin();

    const {products} = useProducts();
    const [basket, setBasket] = useState<IBasketModel>({});
    const itemWord = getWordForm(Object.keys(basket).length, ['товар', 'товари', 'товарів']);

    const [itemsFromBasketApi, setItemsFromBasketApi] = useState<IBasketItemsModel[]>([]);
    const {BasketClear} = useBasket();

    const loadBasketItems = async () => {
        const res = await BasketServicesApi.getBasketItems()
        if(res.status === 200)
        {
            setItemsFromBasketApi(res.data)
        }
    }

    useEffect(() => {
        BasketService.clearItems();
        console.log("items", itemsFromBasketApi);
        itemsFromBasketApi.forEach(item => {
            item.items.forEach(item => {
                if (item.id && item.quantity) {
                    BasketService.addId(item.id, item.quantity);
                }
            });
        });
        const savedBasket = BasketService.getItems();
        if (savedBasket) {
            setBasket(savedBasket);
        }
    }, [itemsFromBasketApi]);

    const [userName, setUserName] = useState<string | null>(null);
    const [userSurName, setUserSurName] = useState<string | null>(null);
    const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(null);

    const [recipient, setRecipient] = useState<Recipient>({
        recipientName: null,
        recipientSurName: null,
        recipientCity: null,
        recipientStreet: null,
        recipientHouse: null,
        recipientFlat: null,
        recipientDeliveryType: null,
        recipientPayType: null,
    });


    const [userInfo,setUserInfo] = useState<IUserModel | undefined>(undefined);
    const loadUser = async () => {
        const res = await AccountsService.getUserById();
        if(res.status === 200)
        {
            setUserInfo(res.data);
        }
    }



    useEffect(() => {
        // const payload = TokenService.getAccessTokenPayload();
        // if (payload) {
        //     setUserName(payload.name);
        //     setUserSurName(payload.surName);
        //     setUserPhoneNumber(payload.phoneNumber);
        // }
        loadUser();
        loadBasketItems();
    }, []);

    useEffect(() => {
        console.log("items" , itemsFromBasketApi);
    }, [itemsFromBasketApi]);


    useEffect(() => {
        if(userInfo) {
            //console.log("user", userInfo)
            setUserName(userInfo!.firstName);
            setUserSurName(userInfo!.lastName);
            setUserPhoneNumber(userInfo!.phoneNumber);

            setRecipient(prevState => ({
                ...prevState,
                recipientName: userInfo!.firstName,
                recipientSurName: userInfo!.lastName,
            }));
        }
    }, [userInfo]);

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

    const pushOrder = async () =>{
        const res = await BasketServicesApi.pushOrder();
            if(res.status === 200)
            {
                BasketService.clearItems();
                setBasket({});
                navigate("/order-result", {state: {order:res.data, recipient: recipient}});
            }
    }

    const clearBasket = () => {
        BasketClear();
        window.dispatchEvent(new Event('basket-updated'));
        setBasket({}); // Очищаємо стан кошика вручну
        //setToggleClear(!toggleClear); // Тригеримо оновлення через toggle
    }


    return (
        <>
            <div className="flex gap-[4px]">
                {isLogin &&(
                <div className="flex-col w-[900px]">
                    <ContactDetailsOrder firstName={userName} setFirstName={setUserName}
                                         surName={userSurName} setSurName={setUserSurName}
                                         phoneNumber={userPhoneNumber} setPhoneNumber={setUserPhoneNumber}/>

                    <DeliveryOrder recipient={recipient} setRecipient={setRecipient}/>

                    <PaymentOrder setRecipient={setRecipient}/>
                </div>
                )}
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
                            <div>
                                <button type={"button"} onClick={clearBasket}
                                        className="flex w-[40px] items-center shrink-0 flex-nowrap relative justify-center">
                                    <div
                                        className="flex w-[40px] h-[40px] shrink-0 rounded-[8px] relative items-center justify-center">
                                        <img src={deleteBin}/>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                    {/*items*/}
                    <div className="flex w-[100%] flex-col gap-[4px] items-start shrink-0 flex-nowrap relative">

                        {
                            Object.keys(basket).length === 0 ?
                                <Link to="/" className="w-full flex h-[40px] p-[40px] bg-[white] items-center justify-center">За
                                    покупками!</Link> :
                                products.map(product => basket[product.id] > 0 ?
                                    <BasketItem item={product} key={product.id} className="rounded-none"/> : null)
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
                                    className="flex w-[121px] h-[40px] p-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#b5b5b5] rounded-[8px] border-none relative pointer">
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
    );
};

export default OrderPage;