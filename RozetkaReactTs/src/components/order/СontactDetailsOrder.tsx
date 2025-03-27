import React, {useState} from 'react';

interface DetailsProps {
    // onClose?: () => void;  // Приймаємо функцію закриття через пропс
    firstName?: string | null;
    surName?: string | null;
    phoneNumber?: string | null;
    setFirstName?: React.Dispatch<React.SetStateAction<string | null>>;
    setSurName?: React.Dispatch<React.SetStateAction<string | null>>;
    setPhoneNumber?: React.Dispatch<React.SetStateAction<string | null>>;
}


const ContactDetailsOrder: React.FC<DetailsProps> = ({
                                                         firstName,
                                                         surName,
                                                         phoneNumber,
                                                         setPhoneNumber,
                                                         setFirstName,
                                                         setSurName
                                                     }) => {

    const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку

    const handleToggle = () => {
        setIsOpen(!isOpen); // Зміна стану відкриття/закриття
    };

    const [isValidNumber, setIsValidNumber] = useState<boolean>(false);


    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phonePattern = /^\+380\d{9}$/;

        if (phonePattern.test(event.target.value)) {
             // Оновлюємо стан в батьківському компоненті
            setIsValidNumber(true);
        } else {
            setIsValidNumber(false);
        }

        setPhoneNumber!(event.target.value);
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName!(event.target.value);  // Оновлюємо стан в батьківському компоненті
    };

    const handleSurNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurName!(event.target.value);  // Оновлюємо стан в батьківському компоненті
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
            1. Контактні дані
          </span>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div
                        className="flex w-[500px] pt-0 pr-[60px] pb-[40px] pl-[60px] flex-col gap-[20px] items-start shrink-0 flex-nowrap">
                        <div
                            className="flex w-[380px] flex-col gap-[20px] items-end shrink-0 flex-nowrap">
                            <div
                                className="flex flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]">
                                <input placeholder="Прізвище" value={surName!}
                                       onChange={handleSurNameChange}
                                       className="flex w-[380px] h-[40px] pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] overflow-hidden">

                                </input>
                                <input placeholder="Ім'я" value={firstName!}
                                       onChange={handleFirstNameChange}
                                       className="flex w-[380px] h-[40px] pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] overflow-hidden">

                                </input>
                                <input placeholder="+380ХХХХХХХХХ" value={phoneNumber!}
                                       onChange={handlePhoneNumberChange}
                                       className="flex w-[380px] h-[40px] pt-[20px] pr-[10px] pb-[20px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#b5b5b5] overflow-hidden">
                                </input>
                                {!isValidNumber && (<span className={"text-red-500"}>Не корректний номер "+380ХХХХХХХХХ" </span>)}
                            </div>

                            <div className="flex w-[380px] gap-[4px] items-start shrink-0 flex-nowrap">
                                <div
                                    className="flex w-[133px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
              <span
                  className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[15px] text-[#000] text-left whitespace-nowrap">
                Одержувач
              </span>
                                </div>
                                <div
                                    className="flex w-[243px] flex-col gap-[8px] items-center shrink-0 flex-nowrap">
                                    <div
                                        className="flex pt-0 pr-[10px] pb-0 pl-[10px] gap-[8px] items-center self-stretch shrink-0 flex-nowrap">
                                        <input type="radio" name="group1"/>
                                        <div
                                            className="flex w-[78px] items-center shrink-0 flex-nowrap">
                                            <div
                                                className="flex w-[78px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <span
                        className="h-[9px] shrink-0 basis-auto font-['Inter'] text-[12px] font-normal leading-[9px] text-[#3b3b3b] text-left whitespace-nowrap">
                      Я одержувач
                    </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex pt-0 pr-[10px] pb-0 pl-[10px] gap-[8px] items-center self-stretch shrink-0 flex-nowrap">
                                        <input type="radio" name="group1"/>
                                        <div
                                            className="flex w-[76px] items-center shrink-0 flex-nowrap">
                                            <div
                                                className="flex w-[76px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <span
                        className="h-[9px] shrink-0 basis-auto font-['Inter'] text-[12px] font-normal leading-[9px] text-[#3b3b3b] text-left whitespace-nowrap">
                      Інша людина
                    </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="flex w-[380px] h-[40px] flex-col gap-[20px] justify-center items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none pointer">
          <span
              className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] text-left whitespace-nowrap">
            Продовжити
          </span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ContactDetailsOrder;
