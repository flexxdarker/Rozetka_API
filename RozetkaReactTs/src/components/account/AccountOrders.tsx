import React, {useEffect, useState} from 'react';
import {IOrderInfoModel} from "../../models/orderModel.ts";
import {OrderServices} from "../../services/orderServices.ts";
import OrderCard from "./OrderCard.tsx";
import {Link} from "react-router-dom";


const AccountOrders: React.FC = () => {

    const [ordersUser, setOrdersUser] = useState<IOrderInfoModel | null>(null);

    const loadOrders = async () => {
        const res = await OrderServices.getOrderByUser();
        setOrdersUser(res.data);
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return (
        <>
            <div className={"flex flex-col gap-[4px]"}>
            <div
                className="main-container flex w-[1160px] h-[82px] pt-0 pr-[20px] pb-0 pl-[20px] gap-[40px] items-center flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
                <div
                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap overflow-hidden">
                    <span
                        className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#3b3b3b] text-left whitespace-nowrap">
          Мої замовлення
        </span>
                </div>


            </div>

                {ordersUser?.items && ordersUser.items.length > 0 ?
                    (ordersUser.items.map(item=>  <OrderCard item={item} key={item.id}/>)) : (
                        <Link to={"/"} className={"flex bg-[#fff] w-full p-[20px] w-[1160px] h-[82px] rounded-[4px] items-center justify-center"}>
                            Зробіть ваше перше замовлення!!!
                        </Link>
                    )}

            </div>
        </>
    );
}

export default AccountOrders;