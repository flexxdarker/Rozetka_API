import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import userIcon from "../../assets/icons/user.svg"
import {Link} from "react-router-dom";
import {ITokenPayload, TokenService} from "../../services/tokenService.ts";
import {AccountsService} from "../../services/accountsService.ts";



const AccountMenu: React.FC = () => {

    const [tokenPayload, setTokenPayload] = useState<ITokenPayload | null>(null);

    const handleReload = () => {
        window.location.href = '/'; // Перехід на нову сторінку
        //window.location.reload(); // Перезавантажує сторінку
    };

    const loadPayload = () =>{
        setTokenPayload(TokenService.getAccessTokenPayload());
    }

    useEffect(() => {
        loadPayload();

        window.addEventListener('storageSaveToken', loadPayload);

        // Очищаємо слухача при демонтажі компонента
        return () => {
            window.removeEventListener('storageSaveToken', loadPayload);
        };

    }, []);

    const logout = () => {
        AccountsService.logout(TokenService.getAccessToken() || "");
        handleReload();
    }

    return (
        <>
            <Paper sx={{maxWidth: '100%'}} className="flex flex-col gap-[4px]">

                <Link to="/account/data"
                    className="main-container flex w-[388px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] items-center flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
                    <div
                        className="flex w-[32px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[10px] items-center shrink-0 flex-nowrap">
                        <img src={userIcon}/>
                    </div>
                    <div
                        className="flex w-[143px] p-[4px] flex-col gap-[12px] items-start shrink-0 flex-nowrap">
        <span
            className="h-[12px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-left whitespace-nowrap">
          {tokenPayload?.name} {tokenPayload?.surName}
        </span>
                        {/*text-[#9140d3]*/}
                        <span
                            className="h-[10px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-left whitespace-nowrap">
          {tokenPayload?.phoneNumber || "no phone number"}
        </span>
                    </div>
                </Link>

                <div
                    className="main-container flex w-[388px] pt-[32px] pr-0 pb-[32px] pl-0 flex-col gap-[16px] items-start flex-nowrap bg-[#fff] mx-auto my-0">
                    <Link to="/account/orders"
                        className="flex pt-[10px] pr-[50px] pb-[10px] pl-[50px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
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
            </Paper>
        </>
    );
};

export default AccountMenu;