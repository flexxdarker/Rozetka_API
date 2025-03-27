import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import {IOrderInfoItemsModel} from "../../models/orderModel.ts";
import formatPrice from "../../functions/formatPrice.ts";
import {Recipient} from "./OrderPage.tsx";

interface LocationState {
    order: IOrderInfoItemsModel,
    recipient: Recipient,
}

const OrderResultPage: React.FC = () => {

    const location = useLocation();

    const { order, recipient } = location.state as LocationState;

    // const order: IOrderInfoItemsModel = useMemo(() => {
    //     // Якщо location.state містить масив продуктів, повертаємо його, інакше порожній масив
    //     return location.state as IOrderInfoItemsModel;
    // }, [location.state]);

    useEffect(() => {
        console.log("state", location.state);
    }, [location.state]);

    return (
        <div className={"flex flex-col justify-center items-center flex-nowrap gap-[4px]"}>
            <div
                className="flex w-[650px] flex-col justify-center items-center flex-nowrap rounded-[8px] bg-[#fff] border-solid border-t border-t-[#9cc319]">
                <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap">
                    <div
                        className="flex pt-[20px] pr-0 pb-[20px] pl-0 gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap">
            <span
                className="flex w-[477px] h-[47px] justify-center items-center shrink-0 font-['Inter'] text-[24px] font-medium leading-[47px] text-[#3b3b3b] text-center">
                Дякуємо!
                <br/>
                Ваше замовлення успішно оформлено!
            </span>
                    </div>
                    <div
                        className="flex pt-[20px] pr-[40px] pb-[20px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
            <span
                className="max-w-full h-[29px] grow shrink-0 basis-auto font-['Inter'] text-[12px] font-normal leading-[29px] text-[#3b3b3b] text-left break-words">
                У найближчий час ви отримаєте SMS повідомлення з інформацією щодо вашого замовлення.
                Вам може зателефонувати наш менеджер для уточнення даних.
            </span>
                    </div>
                </div>
                <div
                    className="flex pt-[20px] pr-0 pb-[20px] pl-0 flex-col gap-[10px] items-start self-stretch shrink-0 flex-nowrap">
                    <div
                        className="flex pt-[20px] pr-[40px] pb-[20px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap border-solid border-t border-t-[#b5b5b5]">
            <span
                className="flex w-[127px] h-[12px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] text-center whitespace-nowrap">
                Замовлення №{order.id}
            </span>
                    </div>
                    <div
                        className="flex pt-0 pr-[40px] pb-0 pl-[40px] flex-col gap-[10px] items-start self-stretch shrink-0 flex-nowrap">
                        <div className="flex gap-[60px] items-center self-stretch shrink-0 flex-nowrap">
                            <div
                                className="flex w-[180px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] shrink-0 font-['Inter'] text-[14px] font-light leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        Номер замовлення
                    </span>
                            </div>
                            <div
                                className="flex p-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] justify-center items-center shrink-0 font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        {order.id}
                    </span>
                            </div>
                        </div>
                        <div className="flex gap-[60px] items-center self-stretch shrink-0 flex-nowrap">
                            <div
                                className="flex w-[180px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] shrink-0 font-['Inter'] text-[14px] font-light leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        Кількість товарів
                    </span>
                            </div>
                            <div
                                className="flex p-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] justify-center items-center shrink-0 font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        1 шт.
                    </span>
                            </div>
                        </div>
                        <div className="flex gap-[60px] items-center self-stretch shrink-0 flex-nowrap">
                            <div
                                className="flex w-[180px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] shrink-0 font-['Inter'] text-[14px] font-light leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        Сума замовлення
                    </span>
                            </div>
                            <div
                                className="flex p-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] justify-center items-center shrink-0 font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        {formatPrice(order.totalPrice)} грн
                    </span>
                            </div>
                        </div>

                        <div className="flex gap-[60px] items-center self-stretch shrink-0 flex-nowrap">
                            <div
                                className="flex w-[180px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] shrink-0 font-['Inter'] text-[14px] font-light leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        Спосіб оплати
                    </span>
                            </div>
                            <div
                                className="flex p-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] justify-center items-center shrink-0 font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        {recipient.recipientPayType}
                    </span>
                            </div>
                        </div>

                        <div className="flex gap-[60px] items-center self-stretch shrink-0 flex-nowrap">
                            <div
                                className="flex w-[180px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] shrink-0 font-['Inter'] text-[14px] font-light leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        Спосіб доставки
                    </span>
                            </div>
                            <div
                                className="flex p-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] justify-center items-center shrink-0 font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        {recipient.recipientDeliveryType}
                    </span>
                            </div>
                        </div>
                        <div className="flex gap-[60px] items-start self-stretch shrink-0 flex-nowrap">
                            <div
                                className="flex w-[180px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] shrink-0 font-['Inter'] text-[14px] font-light leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        Адреса доставки
                    </span>
                            </div>
                            <div
                                className="flex p-[10px] gap-[10px] items-center grow shrink-0 basis-0 flex-nowrap">
                    <span
                        className="h-[10px] w-full grow shrink-0 basis-0 font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
                        {recipient.recipientCity}, {recipient.recipientStreet}, буд. {recipient.recipientHouse}, кв. {recipient.recipientFlat}
                        {/*м.Рівне, 6 Київська, 44 (біля кафе Мономах)*/}
                    </span>
                            </div>
                        </div>

                        <div className="flex gap-[60px] items-start self-stretch shrink-0 flex-nowrap">
                            <div
                                className="flex w-[180px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-full h-[10px] shrink-0 font-['Inter'] text-[14px] font-light leading-[10px] text-[#3b3b3b] text-center whitespace-nowrap">
                        Дата доставки
                    </span>
                            </div>
                            <div
                                className="flex p-[10px] gap-[10px] items-center grow shrink-0 basis-0 flex-nowrap">
                    <span
                        className="h-[10px] w-full grow shrink-0 basis-0 font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
                        -
                    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link to={"/"}
                  className="main-container flex w-full h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center flex-nowrap bg-[#9cc319] rounded-[8px] relative mx-auto my-0">
      <span
          className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] relative text-left whitespace-nowrap">
        Продовжити покупки
      </span>
            </Link>
        </div>
    )
        ;
};

export default OrderResultPage;
