import React, {useState} from 'react';



const DeliveryOrder: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку

    const handleToggle = () => {
        setIsOpen(!isOpen); // Зміна стану відкриття/закриття
    };

    return (
        <>
            <h1>Delivery</h1>
            <button onClick={handleToggle}
                className="border-2 border-gray-500 p-4 main-container flex w-[900px] h-[100px] pt-[40px] pr-[40px] pb-[40px] pl-[40px] flex-col gap-[40px] items-start flex-nowrap bg-[#fff] rounded-[8px] relative overflow-hidden mx-auto my-0">
                <div className="flex w-[149px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative">
        <span
            className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#9cc319] relative text-left whitespace-nowrap">
          Доставка
        </span>
                </div>

            </button>

            {isOpen && (
                <div
                    className="flex pt-0 pr-[60px] pb-0 pl-[60px] flex-col gap-[32px] items-start self-stretch shrink-0 flex-nowrap relative z-[2]">
                    <div className="flex w-[500px] justify-between items-center shrink-0 flex-nowrap relative z-[3]">
                        <div
                            className="flex w-[304px] flex-col gap-[32px] items-start shrink-0 flex-nowrap relative z-[4]">
                            <div className="flex w-[234px] items-center shrink-0 flex-nowrap relative z-[5]">
                                <div
                                    className="flex w-[16px] h-[16px] flex-col justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border border-[#3b3b3b] relative z-[6]"/>
                                <div className="flex w-[218px] items-center shrink-0 flex-nowrap relative z-[7]">
                                    <div
                                        className="flex w-[218px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[8]">
                  <span
                      className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[9]">
                    З магазину BuyZone
                  </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center self-stretch shrink-0 flex-nowrap relative z-10">
                                <div
                                    className="flex w-[16px] h-[16px] flex-col justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border border-[#3b3b3b] relative z-[11]"/>
                                <div className="flex w-[288px] items-center shrink-0 flex-nowrap relative z-[12]">
                                    <div
                                        className="flex w-[288px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[13]">
                  <span
                      className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[14]">
                    З відділення «Нова Пошта»
                  </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-[206px] items-center shrink-0 flex-nowrap relative z-[15]">
                                <div
                                    className="flex w-[16px] h-[16px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border border-[#b5b5b5] relative z-[16]">
                                    <div
                                        className="w-[18px] h-[18px] shrink-0 bg-[url(../assets/images/31ac6468-198f-4d0a-a731-3cf6085bdb69.png)] bg-cover bg-no-repeat relative z-[17]"/>
                                </div>
                                <div className="flex w-[190px] items-center shrink-0 flex-nowrap relative z-[18]">
                                    <div
                                        className="flex w-[190px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[19]">
                  <span
                      className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap z-20">
                    Доставка за адресою
                  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex w-[144px] flex-col gap-[32px] items-start shrink-0 flex-nowrap relative z-[21]">
                            <div className="flex items-center self-stretch shrink-0 flex-nowrap relative z-[22]">
                                <div
                                    className="flex w-[144px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[23]">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[24]">
                  БЕЗКОШТОВНО
                </span>
                                </div>
                            </div>
                            <div className="flex items-center self-stretch shrink-0 flex-nowrap relative z-[25]">
                                <div
                                    className="flex w-[144px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[26]">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[27]">
                  БЕЗКОШТОВНО
                </span>
                                </div>
                            </div>
                            <div className="flex items-center self-stretch shrink-0 flex-nowrap relative z-[28]">
                                <div
                                    className="flex w-[144px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[29]">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap z-30">
                  БЕЗКОШТОВНО
                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex w-[500px] flex-col gap-[20px] items-start shrink-0 flex-nowrap relative z-[31]">
                        <div
                            className="flex flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[32]">
                            <div
                                className="flex flex-col gap-[24px] items-start self-stretch shrink-0 flex-nowrap relative z-[33]">
                                <div
                                    className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] relative z-[34]">
                                    <input placeholder={"Введіть ім’я"}
                                           className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#b5b5b5] relative text-left whitespace-nowrap z-[35]">

                                    </input>
                                </div>
                                <div
                                    className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] relative z-[36]">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#b5b5b5] relative text-left whitespace-nowrap z-[37]">
                  Введіть прізвище
                </span>
                                    <span
                                        className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#000] relative text-left whitespace-nowrap z-[38]">
                  {" "}
                </span>
                                </div>
                                <div
                                    className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] relative z-[39]">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#b5b5b5] relative text-left whitespace-nowrap z-40">
                  Введіть назву міста
                </span>
                                    <span
                                        className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#000] relative text-left whitespace-nowrap z-[41]">
                  {" "}
                </span>
                                </div>
                                <div
                                    className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] relative z-[42]">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#b5b5b5] relative text-left whitespace-nowrap z-[43]">
                  Введіть назву вулиці
                </span>
                                    <span
                                        className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#000] relative text-left whitespace-nowrap z-[44]">
                  {" "}
                </span>
                                </div>
                                <div
                                    className="flex justify-between items-center self-stretch shrink-0 flex-nowrap relative z-[45]">
                                    <div
                                        className="flex w-[220px] pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] relative z-[46]">
                  <span
                      className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#b5b5b5] relative text-left whitespace-nowrap z-[47]">
                    Будинок
                  </span>
                                        <span
                                            className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#000] relative text-left whitespace-nowrap z-[48]">
                    {" "}
                  </span>
                                    </div>
                                    <div
                                        className="flex w-[220px] pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] relative z-[49]">
                  <span
                      className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#b5b5b5] relative text-left whitespace-nowrap z-50">
                    Квартира
                  </span>
                                        <span
                                            className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#000] relative text-left whitespace-nowrap z-[51]">
                    {" "}
                  </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-[395px] items-center shrink-0 flex-nowrap relative z-[52]">
                                <div
                                    className="flex w-[16px] h-[16px] flex-col justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[4px] border-solid border border-[#3b3b3b] relative z-[53]"/>
                                <div className="flex w-[379px] items-center shrink-0 flex-nowrap relative z-[54]">
                                    <div
                                        className="flex w-[379px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative z-[55]">
                                        <div
                                            className="w-[359px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] relative text-left whitespace-nowrap z-[56]">
                    <span
                        className="font-['Inter'] text-[16px] font-normal leading-[19.364px] text-[#3b3b3b] relative text-left">
                      Підйом на поверх{" "}
                    </span>
                                            <span
                                                className="font-['Inter'] text-[12px] font-normal leading-[19.364px] text-[#3b3b3b] relative text-left">
                      (Вартість пдйому згідно{" "}
                    </span>
                                            <span
                                                className="font-['Inter'] text-[12px] font-normal leading-[19.364px] text-[#9140d3] relative text-left">
                      тарифікації
                    </span>
                                            <span
                                                className="font-['Inter'] text-[12px] font-normal leading-[19.364px] text-[#3b3b3b] relative text-left">
                      )
                    </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                // className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] relative z-[34]">
                                 className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] relative z-[57]">
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#fff] relative text-left whitespace-nowrap z-[58]">
              Далі
            </span>
                            </div>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
};
export default DeliveryOrder;

//
// import React, { useState } from 'react';
//
// interface DropdownProps {
//     options: string[]; // Массив опцій для випадаючого списку
//     onSelect: (selectedOption: string) => void; // Функція для обробки вибору
// }
//
// const Dropdown: React.FC<DropdownProps> = ({onSelect }) => {
//     const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку
//     const [selectedOption, setSelectedOption] = useState<string | null>(null); // Вибрана опція
//
//     const handleToggle = () => {
//         setIsOpen(!isOpen); // Зміна стану відкриття/закриття
//     };
//
//
//     return (
//         <div className="relative inline-block text-left">
//             <div>
//                 <button
//                     type="button"
//                     className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
//                     onClick={handleToggle}
//                 >
//                     {selectedOption || 'Виберіть опцію'}
//
//                 </button>
//             </div>
//

//         </div>
//     );
// };
//
// export default Dropdown;