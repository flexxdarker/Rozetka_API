import React, {useState} from 'react';
import {Recipient} from "./OrderPage.tsx";

interface DeliveryProps {
    recipient: Recipient; // Приймає об'єкт recipient
    setRecipient: React.Dispatch<React.SetStateAction<Recipient>>; // Функція для оновлення стейту
}

const DeliveryOrder: React.FC<DeliveryProps> = ({ recipient, setRecipient}) => {
    const [isOpen, setIsOpen] = useState(true); // Стан для відкриття/закриття списку

    const handleToggle = () => {
        setIsOpen(!isOpen); // Зміна стану відкриття/закриття
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecipient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecipient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    return (
        <>
            <div className="rounded-[8px] bg-[#fff] mb-[4px]">
                <div onClick={handleToggle}
                     className="main-container flex w-[900px] p-[40px] flex-col gap-[40px] items-start flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
                    <div
                        className="flex w-[207px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                        <div
                            className="w-[207px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[17px] text-left whitespace-nowrap">
          <span className="font-['Inter'] text-[24px] font-medium leading-[28.8px] text-[#9cc319] text-left">
            2. Доставка
          </span>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div
                        className="flex pt-0 pr-[60px] pb-[40px] pl-[60px] flex-col gap-[32px] items-start self-stretch shrink-0 flex-nowrap">
                        <div
                            className="flex w-[500px] justify-between items-center shrink-0 flex-nowrap">
                            <div
                                className="flex w-[304px] flex-col gap-[32px] items-start shrink-0 flex-nowrap">
                                <div className="flex w-[234px] items-center shrink-0 flex-nowrap">
                                    <input type="radio" name="recipientDeliveryType" value={"З магазину BuyZone"}
                                           onChange={handleRadioChange}/>
                                    <div className="flex w-[218px] items-center shrink-0 flex-nowrap">
                                        <div
                                            className="flex w-[218px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                  <span
                      className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#3b3b3b] text-left whitespace-nowrap">
                    З магазину BuyZone
                  </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center self-stretch shrink-0 flex-nowrap">
                                    <input type="radio" name="recipientDeliveryType" value={"З відділення «Нова Пошта»"}
                                           onChange={handleRadioChange}/>
                                    <div className="flex w-[288px] items-center shrink-0 flex-nowrap">
                                        <div
                                            className="flex w-[288px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                  <span
                      className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#3b3b3b] text-left whitespace-nowrap">
                    З відділення «Нова Пошта»
                  </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-[206px] items-center shrink-0 flex-nowrap">
                                        <input type="radio" name="recipientDeliveryType" value={"Доставка за адресою"}
                                               onChange={handleRadioChange}/>
                                    <div className="flex w-[190px] items-center shrink-0 flex-nowrap">
                                        <div
                                            className="flex w-[190px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                  <span
                      className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                    Доставка за адресою
                  </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex w-[144px] flex-col gap-[32px] items-start shrink-0 flex-nowrap">
                                <div className="flex items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[144px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  БЕЗКОШТОВНО
                </span>
                                    </div>
                                </div>
                                <div className="flex items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[144px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  БЕЗКОШТОВНО
                </span>
                                    </div>
                                </div>
                                <div className="flex items-center self-stretch shrink-0 flex-nowrap">
                                    <div
                                        className="flex w-[144px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                <span
                    className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                  БЕЗКОШТОВНО
                </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div
                            className="flex w-[500px] flex-col gap-[20px] items-start shrink-0 flex-nowrap">
                            <div
                                className="flex w-[380px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap">
                                <div
                                    className="flex flex-col gap-[24px] items-start self-stretch shrink-0 flex-nowrap">
                                    <input placeholder="Введіть ім’я" value={recipient.recipientName!} onChange={handleNameChange} name={"recipientName"}
                                        className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5]">
                                    </input>

                                    <input placeholder="Введіть прізвище" value={recipient.recipientSurName!} onChange={handleNameChange} name={"recipientSurName"}
                                        className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5]">
                                    </input>

                                    <input placeholder="Введіть назву міста" value={recipient.recipientCity!} onChange={handleNameChange} name={"recipientCity"}
                                        className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5]">
                                    </input>

                                    <input placeholder="Введіть назву вулиці" value={recipient.recipientStreet!} onChange={handleNameChange} name={"recipientStreet"}
                                        className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5]">
                                    </input>

                                    <div
                                        className="flex justify-between items-center self-stretch shrink-0 flex-nowrap">
                                        <input  placeholder="Будинок" value={recipient.recipientHouse!} onChange={handleNameChange} name={"recipientHouse"}
                                            className="flex w-[50%] pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5]">
                                        </input>
                                        <input placeholder="Квартира" value={recipient.recipientFlat!} onChange={handleNameChange} name={"recipientFlat"}
                                            className="flex w-[50%] pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5]">
                                        </input>
                                    </div>
                                </div>

                                <div className="flex w-[395px] items-center shrink-0 flex-nowrap">
                                    <input type="checkbox"/>
                                    <div className="flex w-[379px] items-center shrink-0 flex-nowrap relative z-[54]">
                                        <div
                                            className="flex w-[379px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                                            <div
                                                className="w-[359px] shrink-0 font-['Inter'] text-[16px] font-normal leading-[12px] text-left whitespace-nowrap">
                    <span
                        className="font-['Inter'] text-[16px] font-normal leading-[19.364px] text-[#3b3b3b] text-left">
                      Підйом на поверх{" "}
                    </span>
                                                <span
                                                    className="font-['Inter'] text-[12px] font-normal leading-[19.364px] text-[#3b3b3b] text-left">
                      (Вартість пдйому згідно тарифікації)
                    </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button"
                                    // className="flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] relative z-[34]">
                                        className="h-[12px] flex pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px]">
            <span
                className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] text-left whitespace-nowrap">
            Далі
          </span>
                                </button>

                            </div>

                        </div>

                    </div>
                )}
            </div>
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