import React, {useEffect, useState} from 'react';
import userIcon from "../../assets/icons/user.svg"
import userIconWhite from "../../assets/icons/user-white.svg"
import {Link, useLocation} from "react-router-dom";
import {ITokenPayload, TokenService} from "../../services/tokenService.ts";

const AccountMenuUserLabel: React.FC = () => {
    const location = useLocation();
    const [isMain, setIsMain] = useState<boolean>();

    const [tokenPayload, setTokenPayload] = useState<ITokenPayload | null>(null);

    const loadPayload = () =>{
        setTokenPayload(TokenService.getAccessTokenPayload());
    }

    useEffect(() => {
        loadPayload();
        window.addEventListener('storageChangeToken', loadPayload);
        // Очищаємо слухача при демонтажі компонента

        if(location.pathname === "/") {
            setIsMain(true);
        }

        return () => {
            window.removeEventListener('storageChangeToken', loadPayload);
        };
    }, []);


    return (
        <div className={`flex w-[full] ${isMain ? ("bg-gradient-to-b from-[#000] via-[#381753] to-[#381753]") 
            : (
            "bg-[#fff]"
        )}  rounded-[8px]`}>
                <Link to="/account/data"
                      className="main-container flex w-[full] p-[20px] items-center flex-nowrap my-0">
                    <div
                        className="flex w-[32px] p-[4px] gap-[10px] items-center shrink-0 flex-nowrap">
                        {isMain ? (<img src={userIconWhite}/>) : (<img src={userIcon}/>)}
                    </div>
                    <div
                        className="flex p-[4px] flex-col gap-[12px] items-start shrink-0 flex-nowrap">
        <span
            className={`h-[12px] self-stretch shrink-0 basis-auto font-['Inter'] ${isMain && ("text-[#fff]")} text-[16px] font-normal leading-[12px] text-left whitespace-nowrap`}>
          {tokenPayload?.name} {tokenPayload?.surName}
        </span>
                        {/*text-[#9140d3]*/}
                        {isMain ? (
                        <span
                            className="h-[10px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#fff] text-left whitespace-nowrap">
          {tokenPayload?.email}
        </span>) : (<span
                            className="h-[10px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px]  text-left whitespace-nowrap">
          {tokenPayload?.phoneNumber || "no phone number"}
                            </span>
                        )}
                    </div>
                </Link>
        </div>
    );
};

export default AccountMenuUserLabel;