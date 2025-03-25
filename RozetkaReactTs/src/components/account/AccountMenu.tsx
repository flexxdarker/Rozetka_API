import React from 'react';
import {Link} from "react-router-dom";
import {AccountsService} from "../../services/accountsService.ts";
import AccountMenuUserLabel from "./AccountMenuUserLabel.tsx";

const AccountMenu: React.FC = () => {

    const handleReload = () => {
        window.location.href = '/'; // Перехід на нову сторінку
        //window.location.reload(); // Перезавантажує сторінку
    };

    const logout = () => {
        AccountsService.logout();
        //AccountsService.logout(TokenService.getAccessToken() || "");
        handleReload();
    }

    return (
        <>
            <div  className="flex flex-col gap-[4px] w-[full]">


                <AccountMenuUserLabel/>

                <div
                    className="main-container flex w-[full]  flex-0 pt-[32px] pr-0 pb-[32px] pl-0 flex-col gap-[16px] items-start flex-nowrap bg-[#fff] my-0 rounded-[8px]">
                    <Link to="/account/orders"
                        className="w-[full] flex pt-[10px] pr-[50px] pb-[10px] pl-[50px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
        <span
            className="h-[19px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[19px] text-[#3b3b3b] text-left whitespace-nowrap">
          Мої замовлення
        </span>
                    </Link>
                    <Link to="/account/wish-list"
                        className="flex pt-[10px] pr-[50px] pb-[10px] pl-[50px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
        <span
            className="h-[19px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[19px] text-[#3b3b3b] text-left whitespace-nowrap">
          Список бажань
        </span>
                    </Link>
                    <Link to="comparison-list"
                        className="flex pt-[10px] pr-[50px] pb-[10px] pl-[50px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
        <span
            className="h-[19px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[19px] text-[#3b3b3b] text-left whitespace-nowrap">
          Список порівнянь
        </span>
                    </Link>
                    <div
                        className="flex pt-[10px] pr-[50px] pb-[10px] pl-[50px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
        <span
            className="h-[19px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[19px] text-[#3b3b3b] text-left whitespace-nowrap">
          Кошик
        </span>
                    </div>
                    <div
                        className="flex pt-[10px] pr-[50px] pb-[10px] pl-[50px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
        <span
            className="h-[19px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[19px] text-[#3b3b3b] text-left whitespace-nowrap">
          Переглянуті товари
        </span>
                    </div>
                    <button onClick={logout}
                        className="flex pt-[10px] pr-[50px] pb-[10px] pl-[50px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
        <span
            className="h-[19px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[19px] text-[#e11515] text-left whitespace-nowrap">
          Вихід
        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AccountMenu;