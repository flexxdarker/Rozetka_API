import React from 'react';
import {IOrderByIdItemsItemsModel} from "../../models/orderModel.ts";

interface OrderCardItemProps {
    item: IOrderByIdItemsItemsModel;
}

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const OrderCardItem: React.FC<OrderCardItemProps> = ({item}) => {


    return (
        <>
            <div
                className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[9px] items-center self-stretch shrink-0 flex-nowrap">
                <div
                    className="flex w-[120px] h-[120px] flex-col gap-[16px] justify-center items-center shrink-0 flex-nowrap bg-[#fff]">
                    <img  src={`${uploadings + "200_" + item.imagePath}`}
                          alt={item.name}
                        className="w-[120px] h-[120px] shrink-0"/>
                </div>
                <div
                    className="flex justify-between items-center grow shrink-0 basis-0 flex-nowrap">
                    <div className="flex items-center w-full p-[10px] gap-[10px]">
  <span className="break-words text-[#3b3b3b] text-left w-full font-['Inter'] text-[16px] font-normal
               leading-[32px]">
    {item.name}
  </span>
                    </div>

                    <div
                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                        <div
                            className=" shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-left whitespace-nowrap">
                <span className="font-['Inter'] text-[16px] font-normal leading-[30px] text-[#000] text-left">
                  {item.price}₴{item.quantity>1 ? "x"+item.quantity : ""}
                </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderCardItem;