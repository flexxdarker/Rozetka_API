import React, {useState} from 'react';
import arrowUp from '../../assets/icons/nav-arrow-up.svg'
import {IOrderByIdModel, IOrderInfoItemsModel} from "../../models/orderModel.ts";
import {OrderServices} from "../../services/orderServices.ts";
import OrderCardItem from "./OrderCardItem.tsx";

interface OrderItemProps {
    item: IOrderInfoItemsModel;
}

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const OrderCard: React.FC<OrderItemProps> = ({item}) => {

    const [isRotated, setIsRotated] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку

    const [isLoadOrder, setIsLoadOrder] = useState(false);
    const [order, setOrder] = useState<IOrderByIdModel | undefined>(undefined);

    const loadOrder = async ()=> {
        try {
            if (!isLoadOrder) {
                console.log(item.id); // Для відлагодження
                const res = await OrderServices.getByIdByUser(item.id); // Отримуємо замовлення за ID
                console.log("data", res.data); // Для відлагодження
                if (res.status === 200) {
                    setOrder(res.data); // Оновлюємо стан замовлення
                    setIsLoadOrder(true); // Вказуємо, що завантаження завершено
                }
            }
        } catch (error) {
            console.error("Error loading order:", error); // Обробка помилок
        }
    }


    const handleClick  = () => {
        setIsRotated(!isRotated);
        setIsOpen(!isOpen);// перемикаємо стан обертання

        loadOrder();
    };



    return (
        <div className={"flex flex-col gap-[4px]"}>
            <div
                className="main-container flex w-[1160px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] justify-between items-center flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
                <div className="flex gap-[80px] items-center shrink-0 flex-nowrap">
                    <div className="flex w-[281px] flex-col gap-[20px] items-start shrink-0 flex-nowrap">
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap">
                            <div
                                className="w-[267px] shrink-0 font-['Inter'] text-[20px] font-medium leading-[15px]  text-left whitespace-nowrap">
              <span className="font-['Inter'] text-[20px] font-medium leading-[30px] text-[#3b3b3b] text-left">
                №{item.id}
              </span>
                                <span
                                    className="font-['Inter'] text-[20px] font-medium leading-[30px] text-[#000] text-left">
                {" "}
              </span>
                                <span
                                    className="font-['Inter'] text-[16px] font-light leading-[30px] text-[#000] text-left">
                від 12 липня 2020
              </span>
                            </div>
                        </div>
                        <div
                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-semibold leading-[15px] text-[#9cc319] text-left whitespace-nowrap">
              {item.status}
            </span>
                        </div>
                    </div>
                </div>


                <div className="flex gap-[80px] items-center flex-nowrap overflow-x-auto mr-auto">
                    <div
                        className="flex w-full h-[120px] gap-[16px] justify-center items-center flex-nowrap bg-[#fff] overflow-x-auto">
                        {
                            item.orderItems.map((item, index) => (
                                <img
                                    src={`${uploadings + "200_" + item.imagePath}`}
                                    alt={item.imagePath}
                                    className="w-[120px] h-[120px] shrink-0"
                                    key={index}
                                />
                            ))
                        }
                    </div>
                </div>


                <div className="flex w-[40px] justify-center items-center shrink-0 flex-nowrap">
                    <div
                        className="flex w-[40px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[10px] items-center shrink-0 flex-nowrap">

                        <button
                            className="flex w-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap">
                            <img
                                src={arrowUp}
                                className={`w-10 h-10 transition-transform duration-300 ${isRotated ? 'rotate-0' : 'rotate-180'}`}
                                onClick={handleClick}
                            />
                        </button>
                    </div>
                </div>
            </div>
            {/*/////2*/}


            {isOpen && order &&
                <>
                    <div className={"flex gap-[4px]"}>
                        <div
                            className="flex w-[357px] h-full p-[20px] flex-col gap-[40px] grow items-end flex-nowrap bg-[#fff] mx-auto my-0">
                            <div
                                className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap">
                                <div
                                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap">
          <span
              className="h-[15px] grow shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
            Доставка
          </span>
                                </div>
                                <div
                                    className="flex pt-0 pr-[10px] pb-0 pl-[10px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap">
          <span
              className="h-[12px] self-stretch shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
            Самовивіз з Нової Пошти
          </span>
                                    <span
                                        className="h-[12px] self-stretch shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
            ТТН: 20400154983297
          </span>
                                </div>
                            </div>
                            <div
                                className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[192px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
          <span
              className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
            Адреса доставки
          </span>
                                </div>
                                <div
                                    className="flex pt-0 pr-[10px] pb-0 pl-[10px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap">
          <span
              className="flex w-[297px] h-[72px] justify-start items-center self-stretch shrink-0 font-['Inter'] text-[16px] font-normal leading-[30px] text-[#3b3b3b] text-left">
            Рівненська область
            <br/>
            Рівне, 6<br/>
            Київська, 44 (біля кафе Мономах)
          </span>
                                </div>
                            </div>
                            <div
                                className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[131px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
          <span
              className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
            Отримувач
          </span>
                                </div>
                                <div
                                    className="flex pt-0 pr-[10px] pb-0 pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
          <span
              className="flex w-[158px] h-[72px] justify-start items-center shrink-0 font-['Inter'] text-[16px] font-normal leading-[30px] text-[#3b3b3b] text-left">
            Леся Українка
            <br/>
            +380(97)055-55-55
            <br/>
            pokupec@gmail.com
          </span>
                                </div>
                            </div>
                        </div>


                        <div
                            className="main-container flex w-[799px] pt-0 pr-[20px] pb-0 pl-[20px] flex-col items-start flex-nowrap bg-[#fff] mx-auto my-0">
                            <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap">

                                {order!.items.map(item=> <OrderCardItem item={item.items[0]} key={item.id}/>)}

                            </div>
                            <div
                                className="flex flex-col items-start self-stretch shrink-0 flex-nowrap">
                                <div
                                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] justify-between items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[92px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
              Оплата
            </span>
                                    </div>
                                    <div
                                        className="flex w-[163px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-[#000] text-left whitespace-nowrap">
              Оплата через Visa
            </span>
                                    </div>
                                </div>
                                <div
                                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] justify-between items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[164px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
              Статус оплати
            </span>
                                    </div>
                                    <div
                                        className="flex w-[97px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-[#9cc319] text-left whitespace-nowrap">
              Сплачено
            </span>
                                    </div>
                                </div>
                                <div
                                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] justify-between items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[114px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
              Доставка
            </span>
                                    </div>
                                    <div
                                        className="flex w-[58px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-[#000] text-left whitespace-nowrap">
              0₴
            </span>
                                    </div>
                                </div>
                                <div
                                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] justify-between items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[82px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
              Разом
            </span>
                                    </div>
                                    <div
                                        className="flex w-[75px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-[#000] text-left whitespace-nowrap">
              {item.totalPrice}₴
            </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>


                    <div
                        className="main-container flex w-[1160px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] gap-[74px] items-center flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-none rounded-br-[8px] rounded-bl-[8px] mx-auto my-0">
                        <div
                            className="flex w-[320px] h-[40px] flex-col gap-[20px] justify-center items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px]">
        <span
            className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] text-left whitespace-nowrap">
          Залишити відгук
        </span>
                        </div>
                    </div>
                </>}
        </div>
    );
};

export default OrderCard;