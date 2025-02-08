import {IProductModel} from "../../models/productsModel.ts";
import React from "react";
import deleteBin from '../../assets/icons/deleteBin.svg'
import minus from '../../assets/icons/minus.svg'
import plus from '../../assets/icons/plus.svg'
// import "../ProductCard/ProductCard.css"

//import Typography from '../assets/contemplative-reptile.jpg';


const BasketItem = (props: { item: IProductModel }) => {

     const {item} = props;

    return (
        <>
                <div
                    className="flex pt-[20px] pr-[20px] pb-[20px] pl-[20px] gap-[28px] items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] relative z-[37]">
                    <div
                        className="w-[120px] h-[120px] shrink-0 bg-[url(../assets/images/fc949c96e71f6b333b628591585058d10ff16daa.png)] bg-cover bg-no-repeat relative z-[38]"/>
                    <div
                        className="flex flex-col gap-[32px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[39]">
                        <div
                            className="flex justify-between items-start self-stretch shrink-0 flex-nowrap relative z-40">
                            <div
                                className="flex w-[326px] pt-[10px] pr-0 pb-[10px] pl-0 items-center shrink-0 flex-nowrap bg-[#fff] relative z-[41]">
                                <div
                                    className="flex w-[326px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[42]">
                    <span
                        className="flex w-[326px] h-[31px] justify-start items-center shrink-0 font-['Inter'] text-[16px] font-medium leading-[31px] text-[#3b3b3b] relative text-left z-[43]">
                        {item.title}
                    </span>
                                </div>
                            </div>
                            <div
                                className="flex w-[36px] justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[44]">
                                <div
                                    className="flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center shrink-0 flex-nowrap relative z-[45]">
                                    <div
                                        className="w-[20px] h-[20px] shrink-0 relative z-[46]">
                                        <img src={deleteBin}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex pt-[10px] pr-0 pb-[10px] pl-0 gap-[180px] justify-end items-end self-stretch shrink-0 flex-nowrap relative z-[47]">
                            <button className="w-[154px] h-[48px] shrink-0 border-none relative z-[48] pointer">
                                <div
                                    className="flex w-[48px] h-[48px] pt-[14px] pr-[14px] pb-[14px] pl-[14px] justify-center items-center flex-nowrap bg-[#fff] rounded-tl-[4px] rounded-tr-none rounded-br-none rounded-bl-[4px] border-solid border border-[#b5b5b5] absolute top-0 left-0 z-[49]">
                                    <div
                                        className="flex w-[20px] gap-[8px] justify-center items-center shrink-0 flex-nowrap relative z-50">
                                        <div
                                            className="w-[20px] h-[20px] shrink-0 relative z-[51]">
                                            <img src={minus}/>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex w-[48px] h-[48px] pt-[14px] pr-[14px] pb-[14px] pl-[14px] justify-center items-center flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-[4px] rounded-br-[4px] rounded-bl-none border-solid border border-[#b5b5b5] absolute top-0 left-[106px] z-[52]">
                                    <div
                                        className="flex w-[20px] gap-[8px] justify-center items-center shrink-0 flex-nowrap relative z-[53]">
                                        <div
                                            className="w-[20px] h-[20px] shrink-0 bg-[url(../assets/images/4a4c0091-1e9f-4b58-81d4-2d62968e4eee.png)] bg-cover bg-no-repeat relative z-[54]">
                                            <img src={plus}/>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="w-[60px] h-[48px] bg-[#fff] border-solid border border-[#b5b5b5] absolute top-0 left-[47px] overflow-hidden z-[55]">
                                    <div
                                        className="flex w-[33px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] flex-col gap-[10px] items-start flex-nowrap relative overflow-hidden z-[56] mt-0 mr-0 mb-0 ml-[14px]">
                      <span
                          className="h-[24px] shrink-0 basis-auto font-['Roboto'] text-[16px] font-normal leading-[24px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[57]">
                        1
                      </span>
                                    </div>
                                </div>
                            </button>
                            <div
                                className="flex w-[105px] flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[58]">
                                <div
                                    className="flex w-[91px] flex-col gap-[12px] items-start shrink-0 flex-nowrap relative z-[59]">
                    <span
                        className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#b5b5b5] relative text-left whitespace-nowrap z-[60]">
                      {item.price}₴
                    </span>
                                    <div
                                        className="w-[91px] shrink-0 font-['Inter'] text-[20px] font-semibold leading-[15px] relative text-center whitespace-nowrap z-[61]">
                      <span
                          className="font-['Inter'] text-[20px] font-semibold leading-[20px] text-[#3b3b3b] relative text-center">
                        {item.price-item.discount}
                      </span>
                                        <span
                                            className="font-['Inter'] text-[20px] font-semibold leading-[20px] text-[#3b3b3b] relative text-center lowercase">
                        ГРН
                      </span>
                                    </div>
                                </div>
                                <div
                                    className="flex w-[90px] gap-[10px] justify-center items-end shrink-0 flex-nowrap relative z-[62]">
                    <span
                        className="flex w-[90px] h-[9px] justify-center items-center shrink-0 font-['Inter'] text-[12px] font-medium leading-[9px] text-[#3b3b3b] relative text-center whitespace-nowrap z-[63]">
                      +{Math.floor((item.price-item.discount)/100)} грн бонуси
                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default BasketItem;
