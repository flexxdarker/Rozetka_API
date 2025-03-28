import React from 'react';
import { useState } from "react";
import arrowUp from "../../../assets/icons/nav-arrow-up.svg";
import {IFilterValueModel} from "../../../models/filterModel.ts";

interface IMultipleSelectProps {
    title: string;
    values: IFilterValueModel[];
    selectedValues: IFilterValueModel[];
    onChange: (selectedValues: IFilterValueModel[]) => void;
}

const MultipleSelect: React.FC<IMultipleSelectProps> = ({title, values, selectedValues, onChange}) => {

    const [isRotated, setIsRotated] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = values.find((item) => item.value === e.target.value);
        if (selectedValue) {
            const newSelectedValues = e.target.checked
                ? [...selectedValues, selectedValue] // Додаємо нове значення
                : selectedValues.filter((item) => item.value !== e.target.value); // Видаляємо значення

            onChange(newSelectedValues); // Оновлюємо вибрані значення
        }
    };


    // const [filteredValue, setFilteredValue] = useState<IFilterValueModel[]>([]);
    // const selectFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value, checked } = e.target;
    //
    //     if (checked) {
    //         const selectedItem = values.find((item) => item.value === value);
    //         if (selectedItem && !filteredValue.some((item) => item.id === selectedItem.id)) {
    //             setFilteredValue((prevState) => [...prevState, selectedItem]);
    //         }
    //     } else {
    //         setFilteredValue((prevState) => prevState.filter((item) => item.value !== value));
    //     }
    // };
    // useEffect(() => {
    //     console.log("filteredValue", filteredValue);
    // }, [filteredValue]);


    const handleClick = () => {
        setIsRotated(!isRotated);
        setIsOpen(!isOpen); // перемикаємо стан обертання
    };

    return (
        <div
            className="main-container h-[fit-content] flex w-[376px] pt-[10px] pr-0 pb-[10px] pl-0 flex-col gap-[10px] items-start flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
            <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative">
                <div
                    className="flex pt-[10px] pr-[20px] pb-[10px] pl-[20px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <span
                        className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-bold leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                        {title}
                    </span>
                </div>
                <button type="button"
                        className="flex w-[40px] h-[40px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <img
                        src={arrowUp}
                        className={`w-10 h-10 transition-transform duration-300 ${isRotated ? '' : 'rotate-180'}`}
                        onClick={handleClick}
                    />
                </button>
            </div>
            {isOpen && (
                <div
                    className="flex flex-col pt-0 pr-[20px] pb-0 pl-[20px] gap-[0px] self-stretch shrink-0 flex-nowrap">
                    <div
                        className="flex flex-col gap-[4px] items-start self-stretch shrink-0 flex-nowrap">

                        {values.map(value =>
                        <div key={value.id}
                            className="flex pt-0 pr-[20px] pb-0 pl-[20px] items-center self-stretch shrink-0 flex-nowrap">
                            <div className="flex items-center shrink-0 flex-nowrap]">
                                <div
                                    className="flex p-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                                    <input type="checkbox" id={String(value.id)} value={value.value}
                                           checked={selectedValues.some((v) => v.value === value.value)} // Підсвічуємо, якщо вибрано
                                           onChange={handleChange}/>
                                            {/*onChange={(e) => selectFilters(e)} />*/}
                                           {/*onChange={(e) => console.log("value", e.target.value, "checked", e.target.value)} />*/}
                                    <span
                                        className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
                {value.value}
              </span>
                                </div>
                            </div>
                        </div>)}

                    </div>
                </div>
            )}
        </div>
    );
};

export default MultipleSelect;