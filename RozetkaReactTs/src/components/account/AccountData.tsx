import React from 'react';
import AccountDataUserInfo from "./AccountDataUserInfo.tsx";
import AccountChangePassword from "./AccoutChangePassword.tsx";


const AccountData: React.FC = () => {

        return (
            <div className={"flex flex-col gap-[4px]"}>
                <div
                    className="main-container flex w-[1160px] h-[82px] pt-0 pr-[20px] pb-0 pl-[20px] gap-[40px] items-center flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
                    <div
                        className="flex w-[184px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap overflow-hidden">
                    <span
                        className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#3b3b3b] text-left whitespace-nowrap">
          Особисті дані
        </span>
                    </div>
                </div>
                <AccountDataUserInfo/>
                <AccountChangePassword/>
            </div>
        );
    }
;

export default AccountData;