import React, {useState} from 'react';



const PaymentOrder: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку

    const handleToggle = () => {
        setIsOpen(!isOpen); // Зміна стану відкриття/закриття
    };


    return (
        <>
            <div className="rounded-[8px] bg-[#fff]">
                <div onClick={handleToggle} className="main-container flex w-[900px] p-[40px] flex-col gap-[40px] items-start flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
                    <div
                        className="flex w-[207px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                        <div
                            className="w-[207px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[17px] text-left whitespace-nowrap">
          <span className="font-['Inter'] text-[24px] font-medium leading-[28.8px] text-[#9cc319] text-left">
            3. Оплата
          </span>
                        </div>
                    </div>
                </div>
                {isOpen && (
                <div
                    className="flex pt-0 pr-[60px] pb-[40px] pl-[60px] flex-col gap-[32px] items-start self-stretch shrink-0 flex-nowrap">
                    <div
                        className="flex flex-col gap-[28px] items-start self-stretch shrink-0 flex-nowrap">
                        <div className="flex w-[302px] gap-[8px] items-center shrink-0 flex-nowrap">
                            <input type="radio" name="groupPay"/>
                            <div className="flex w-[278px] items-center shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[278px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  Оплата під час отримання готівкою
                </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[106px] gap-[8px] items-center shrink-0 flex-nowrap">
                            <input type="radio" name="groupPay"/>
                            <div className="flex w-[82px] items-center shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[82px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  GooglePay
                </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[96px] gap-[8px] items-center shrink-0 flex-nowrap">
                            <input type="radio" name="groupPay"/>
                            <div className="flex w-[72px] items-center shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[72px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  ApplePay
                </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[96px] gap-[8px] items-center shrink-0 flex-nowrap">
                            <input type="radio" name="groupPay"/>
                            <div className="flex w-[72px] items-center shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[72px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  PrivatPay
                </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[151px] gap-[8px] items-center shrink-0 flex-nowrap">
                            <input type="radio" name="groupPay"/>
                            <div className="flex w-[127px] items-center shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[127px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  Visa/MasterCard
                </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[135px] gap-[8px] items-center shrink-0 flex-nowrap">
                            <input type="radio" name="groupPay"/>
                            <div className="flex w-[111px] items-center shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[111px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  Portmone.com
                </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[261px] gap-[8px] items-center shrink-0 flex-nowrap">
                            <input type="radio" name="groupPay"/>
                            <div className="flex w-[237px] items-center shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[237px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  Кредит або оплата частинами
                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    )}
            </div>
        </>
    );
};

export default PaymentOrder;