import React from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import {Rate} from "antd";
import {Link} from "react-router-dom";
import cart from "../../assets/icons/cart.svg"

interface ProductProps {
    product: IProductModel;
}

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const ComparisonCard: React.FC<ProductProps> = ({product}) => {
    return (
        <div
            className="main-container flex w-full pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col items-start flex-nowrap bg-[#fff] mx-auto">
            <div className="flex justify-between items-start self-stretch shrink-0 flex-nowrap">
                <div className="flex flex-col gap-[16px] h-full justify-center items-start shrink-0 flex-nowrap">
                    <div className="flex h-[7px] gap-[10px] justify-center items-start shrink-0 flex-nowrap">
        <span
            className="flex h-[7px] justify-center items-center shrink-0 font-['Inter'] text-[10px] font-normal leading-[7px] text-[#3b3b3b] text-right whitespace-nowrap">
          Код: {product.id}
        </span>
                    </div>
                </div>
                <div className="flex w-[32px] flex-col gap-[4px] items-start shrink-0 flex-nowrap">
                    <div
                        className="flex w-[32px] h-[32px] flex-col justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border border-[#b5b5b5]"/>
                </div>
            </div>
            <div className="flex flex-col gap-[24px] items-center self-stretch shrink-0 flex-nowrap">
                <Link to={`/product-page/${product.id}`} className="w-full max-w-[220px] h-[220px]">
                    <img src={`${uploadings + "400_" + product.images![0]?.name}`} alt="no image"/>
                </Link>

                <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap">
                    <div className="flex gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
        <span
            className="flex w-full justify-start items-center font-['Inter'] text-[14px] font-normal leading-[26px] text-[#3b3b3b] text-left">
          {product.title} <br/>
          Lemon Green
        </span>
                    </div>
                    <div className="flex flex-col gap-[4px] items-start self-stretch shrink-0 flex-nowrap">
                        <div className="flex gap-[4px] items-center self-stretch shrink-0 flex-nowrap">
                            <div className="flex gap-[4px] items-start shrink-0 flex-nowrap">

                                    <Rate value={4}/>

                            </div>
                            <div className="flex w-[46px] gap-[4px] items-start shrink-0 flex-nowrap">
            <span
                className="h-[20px] shrink-0 font-['Inter'] text-[10px] font-light leading-[20px] text-[#3b3b3b] text-left whitespace-nowrap">
              6 відгуків
            </span>
                            </div>
                        </div>
                        <div className="flex gap-[4px] items-center self-stretch shrink-0 flex-nowrap">
                            <div className="flex w-[66px] gap-[4px] items-start shrink-0 flex-nowrap">
            <span
                className="h-[20px] shrink-0 font-['Inter'] text-[10px] font-medium leading-[20px] text-[#9cc319] text-left whitespace-nowrap">
              Є в наявності
            </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap">
                            <div className="flex w-[66px] flex-col gap-[9px] items-start shrink-0 flex-nowrap">
            <span
                className="h-[9px] shrink-0 font-['Inter'] text-[12px] font-medium leading-[9px] text-[#3b3b3b] text-left whitespace-nowrap">
              25 999₴
            </span>
                                <span
                                    className="flex w-[65px] h-[12px] justify-center items-center font-['Inter'] text-[16px] font-semibold leading-[12px] text-[#e11515] text-center whitespace-nowrap">
              21 999₴
            </span>
                            </div>
                            <div
                                className="flex w-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border-2 border-[#9cc319]">
                                <div
                                    className="w-[24px] h-[24px]">
                                    <img src={cart}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ComparisonCard;