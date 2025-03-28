import React from 'react';



const OrderCardDelivery: React.FC = () => {

        return (
        <div className={"flex flex-col gap-[4px]"}>


                    <div className={"flex gap-[4px]"}>
                        <div
                            className="flex w-[357px] h-full p-[20px] flex-col gap-[40px] grow items-end flex-nowrap bg-[#fff] mx-auto my-0">
                            <div
                                className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap">
                                <div
                                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap">
          <span
              className="h-[15px] grow shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
            Доставка
          </span>
                                </div>
                                <div
                                    className="flex pt-0 pr-[10px] pb-0 pl-[10px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap">
          <span
              className="h-[12px] self-stretch shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
            Самовивіз з Нової Пошти
          </span>
                                    <span
                                        className="h-[12px] self-stretch shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
            ТТН: 20400154983297
          </span>
                                </div>
                            </div>
                            <div
                                className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[192px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
          <span
              className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
            Адреса доставки
          </span>
                                </div>
                                <div
                                    className="flex pt-0 pr-[10px] pb-0 pl-[10px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap">
          <span
              className="flex w-[297px] h-[72px] justify-start items-center self-stretch shrink-0 font-['Inter'] text-[16px] font-normal leading-[30px] text-[#3b3b3b] text-left">
            Рівненська область
            <br/>
            Рівне, 6<br/>
            Київська, 44 (біля кафе Мономах)
          </span>
                                </div>
                            </div>
                            <div
                                className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[131px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
          <span
              className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
            Отримувач
          </span>
                                </div>
                                <div
                                    className="flex pt-0 pr-[10px] pb-0 pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
          <span
              className="flex w-[158px] h-[72px] justify-start items-center shrink-0 font-['Inter'] text-[16px] font-normal leading-[30px] text-[#3b3b3b] text-left">
            Леся Українка
            <br/>
            +380(97)055-55-55
            <br/>
            pokupec@gmail.com
          </span>
                                </div>
                            </div>
                        </div>




                    </div>
        </div>
    );
};

export default OrderCardDelivery;