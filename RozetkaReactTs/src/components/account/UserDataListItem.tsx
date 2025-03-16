import React, {useState} from 'react';
import arrowUp from '../../assets/icons/nav-arrow-up.svg'

interface UserDataListItemProps {
    lable: string;
    data: Record<string, string>;
}

const UserDataListItem: React.FC<UserDataListItemProps> = ({lable, data}) => {

    const [isRotated, setIsRotated] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку

    const handleClick = () => {
        setIsRotated(!isRotated);
        setIsOpen(!isOpen);// перемикаємо стан обертання
    };

    return (
        <div
            className="main-container flex w-[1160px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] flex-col justify-end items-end flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0 mt-[4px]">
            <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap">
                <div
                    className="flex w-[281px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap">
          <span
              className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#3b3b3b] text-left whitespace-nowrap">
            {lable}
          </span>
                </div>
                <button
                    className="flex w-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap">
                    <img
                        src={arrowUp}
                        className={`w-10 h-10 transition-transform duration-300 ${isRotated ? 'rotate-0' : 'rotate-180'}`}
                        onClick={handleClick}
                    />
                </button>
            </div>

            <div
                className={`items-center self-stretch shrink-0 flex-nowrap overflow-hidden transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`} // Максимальна висота для відкриття
            >
                {isOpen && (
                    <>
                        <div
                            className="flex pt-[10px] pr-0 pb-[10px] pl-0 gap-[100px] items-center self-stretch shrink-0 flex-nowrap">
                            {Object.keys(data).map((key) => (
                                <>
                            <div
                                className="flex w-[213px] flex-col gap-[8px] items-start shrink-0 flex-nowrap">
                                        <div
                                            className="flex w-[177px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-left items-center shrink-0 flex-nowrap">
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#b5b5b5] text-left whitespace-nowrap">
              {key} {/* Ключ */}
            </span>
                                        </div>
                                        <div
                                            className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap">
                                <span
                                    className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                            {data[key]} {/* Значення для цього ключа */}
                        </span>
                                        </div>

                            </div>
                                </>
                            ))}

                        </div>
                        <div className="flex flex-row-reverse">
                            <button
                                className="flex w-[132px] h-[40px] pt-0 pr-[20px] pb-0 pl-[20px] flex-col gap-[20px] justify-center items-center shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none pointer">
                    <span
                        className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[12px] text-[#fff] text-left whitespace-nowrap">
                    Редагувати
                    </span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserDataListItem;