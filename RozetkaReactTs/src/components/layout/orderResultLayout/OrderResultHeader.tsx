import React from 'react';
import Box from "@mui/material/Box";
import logoBlack from "../../../assets/icons/Logo_SVG_black.svg"
import {Link} from "react-router-dom";

const OrderResultHeader: React.FC = () => {

    return (
        <Box className=" flex sticky top-0 w-full z-50 max-h-[90px] bg-[#fff] border-solid border-t border-t-[#b5b5b5] justify-center items-center">
            <div
                className="flex w-[1920px] h-[90px] justify-between items-center flex-nowrap">
                <div className="flex w-[354px] gap-[40px] items-center shrink-0 flex-nowrap">
                    <Link to={"/"}>
                    <img src={logoBlack}
                        className="w-[100px] h-[64.002px] shrink-0 overflow-hidden"/>
                    </Link>
                    <div
                        className="flex w-[214px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="flex w-[194px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[32px] font-medium leading-[20px] text-[#3b3b3b] text-center whitespace-nowrap">
              Замовлення{" "}
            </span>
                    </div>
                </div>
                <div className="flex w-[355px] flex-col gap-[8px] items-start shrink-0 flex-nowrap">
                    <div
                        className="flex w-[170px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
            <span
                className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-semibold leading-[17px] text-[#9140d3] text-left whitespace-nowrap">
              0800 500 500
            </span>
                    </div>
                    <div className="flex gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
            <span
                className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-[#000] text-left whitespace-nowrap">
              Телефонуйте цілодобово - проконсультуємо!
            </span>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default OrderResultHeader;
