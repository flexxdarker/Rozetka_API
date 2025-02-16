import {IProductModel} from "../../models/productsModel.ts";
import React, {useState} from "react";
import deleteBin from '../../assets/icons/deleteBin.svg'
import minus from '../../assets/icons/minus.svg'
import plus from '../../assets/icons/plus.svg'
import {BasketService} from "../../services/basketService.ts";
import formatPrice from "../../functions/formatPrice.ts";
// import "../ProductCard/ProductCard.css"
import clsx from 'clsx';

//import Typography from '../assets/contemplative-reptile.jpg';


const BasketItem = (props: { item: IProductModel, className?: string }) => {


     const {item, className} = props;

    const [count,setCount] = useState(BasketService.getCountById(item.id));

    const addItem = () => {
        BasketService.addId(item.id);
        window.dispatchEvent(new Event('basket-updated'));
        setCount(BasketService.getCountById(item.id));
    }

    const removeItem = () => {
        BasketService.removeId(item.id);
        window.dispatchEvent(new Event('basket-updated'));
        setCount(BasketService.getCountById(item.id));
    }

    const removeAll = () => {
        BasketService.removeAllItems(item.id);
        window.dispatchEvent(new Event('basket-updated'));
        setCount(BasketService.getCountById(item.id));
    }



    return (
        <>
            {count > 0 &&
                <div
                    className={clsx("flex pt-[20px] pr-[20px] pb-[20px] pl-[20px] gap-[28px] items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px]", className)}>
                    <div
                        className="w-[120px] h-[120px] shrink-0 bg-[url(../assets/images/fc949c96e71f6b333b628591585058d10ff16daa.png)] bg-cover bg-no-repeat"/>
                    <div
                        className="flex flex-col gap-[32px] items-start grow shrink-0 basis-0 flex-nowrap">
                        <div
                            className="flex justify-between items-start self-stretch shrink-0 flex-nowrap">
                            <div
                                className="flex w-[326px] pt-[10px] pr-0 pb-[10px] pl-0 items-center shrink-0 flex-nowrap bg-[#fff]">
                                <div
                                    className="flex w-[326px] gap-[10px] items-center shrink-0 flex-nowrap">
                    <span
                        className="flex w-[326px] h-[31px] justify-start items-center shrink-0 font-['Inter'] text-[16px] font-medium leading-[31px] text-[#3b3b3b] text-left">
                        {item.title}
                    </span>
                                </div>
                            </div>
                            <button type={"button"} onClick={removeAll}
                                className="flex w-[36px] justify-center items-center shrink-0 flex-nowrap overflow-hidden">
                                <div
                                    className="flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center shrink-0 flex-nowrap">
                                    <div
                                        className="w-[20px] h-[20px] shrink-0">
                                        <img src={deleteBin}/>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div
                            className="flex pt-[10px] pr-0 pb-[10px] pl-0 justify-between items-end self-stretch shrink-0 flex-nowrap">
                            <div className="w-[154px] h-[48px] shrink-0 border-none relative pointer">
                                <button type={"button"} onClick={removeItem}
                                    className="flex w-[48px] h-[48px] pt-[14px] pr-[14px] pb-[14px] pl-[14px] justify-center items-center flex-nowrap bg-[#fff] rounded-tl-[4px] rounded-tr-none rounded-br-none rounded-bl-[4px] border-solid border border-[#b5b5b5] absolute top-0 left-0">
                                    <div
                                        className="flex w-[20px] gap-[8px] justify-center items-center shrink-0 flex-nowrap relative z-50">
                                        <div
                                            className="w-[20px] h-[20px] shrink-0 relative z-[51]">
                                            <img src={minus}/>
                                        </div>
                                    </div>
                                </button>
                                <button type={"button"} onClick={addItem}
                                    className="flex w-[48px] h-[48px] pt-[14px] pr-[14px] pb-[14px] pl-[14px] justify-center items-center flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-[4px] rounded-br-[4px] rounded-bl-none border-solid border border-[#b5b5b5] absolute top-0 left-[106px]">
                                    <div
                                        className="flex w-[20px] gap-[8px] justify-center items-center shrink-0 flex-nowrap relative">
                                        <div
                                            className="w-[20px] h-[20px] shrink-0">
                                            <img src={plus}/>
                                        </div>
                                    </div>
                                </button>
                                <div
                                    className="w-[60px] h-[48px] bg-[#fff] border-solid border border-[#b5b5b5] absolute top-0 left-[47px] overflow-hidden">
                                    <div
                                        className="flex w-[33px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] flex-col gap-[10px] items-center flex-nowrap relative overflow-hidden mt-0 mr-0 mb-0 ml-[14px]">
                      <span
                          className="h-[24px] shrink-0 basis-auto font-['Roboto'] text-[16px] font-normal leading-[24px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                        {count}
                      </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex flex-col gap-[16px] items-end shrink-0 flex-nowrap">
                                <div
                                    className="flex flex-col gap-[12px] items-end shrink-0 flex-nowrap">
                    <span
                        className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#b5b5b5] text-left whitespace-nowrap">
                      {formatPrice(item.price*count)}₴
                    </span>
                                    <div
                                        className="shrink-0 font-['Inter'] text-[20px] font-semibold leading-[15px] text-center whitespace-nowrap">
                      <span
                          className="font-['Inter'] text-[20px] font-semibold leading-[20px] text-[#3b3b3b] text-center">
                        {formatPrice((item.price-item.discount)*count)}
                      </span>
                                        <span
                                            className="font-['Inter'] text-[20px] font-semibold leading-[20px] text-[#3b3b3b] text-center lowercase">
                        ГРН
                      </span>
                                    </div>
                                </div>
                                <div
                                    className="flex gap-[10px] justify-center items-end shrink-0 flex-nowrap">
                    <span
                        className="flex h-[9px] justify-center items-center shrink-0 font-['Inter'] text-[12px] font-medium leading-[9px] text-[#3b3b3b] text-center whitespace-nowrap">
                      +{Math.floor(((item.price-item.discount)/100)*count)} грн бонуси
                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default BasketItem;
