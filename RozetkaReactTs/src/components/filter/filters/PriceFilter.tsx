import React, { useState } from 'react';
import arrowUp from '../../../assets/icons/nav-arrow-up.svg'

interface IPriceFilterProps {
    minPriceValue: number;
    maxPriceValue: number;
    onChange?: (minPrice: number | null, maxPrice: number | null) => void;
}

const PriceFilter: React.FC<IPriceFilterProps> = ({ minPriceValue, maxPriceValue, onChange }) => {
    const minPriceInitValue = minPriceValue;
    const maxPriceInitValue = maxPriceValue;

    const [isRotated, setIsRotated] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Стан для відкриття/закриття списку

    const handleClick = () => {
        setIsRotated(!isRotated);
        setIsOpen(!isOpen); // перемикаємо стан обертання
    };

    const [minPrice, setMinPrice] = useState(minPriceValue);
    const [maxPrice, setMaxPrice] = useState(maxPriceValue);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        if (value > maxPrice) {
            value = maxPrice; // Мінімум не може бути більшим за максимум
        }
        setMinPrice(value);
        onChange?.(value, maxPrice); // Оновлення в батьківський компонент
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        if (value > maxPriceInitValue) {
            value = maxPriceInitValue; // Максимум не може бути більшим за maxPriceInitValue
        }
        setMaxPrice(value); // Лише оновлюємо стан
    };

    // Функція, яка буде викликатись після завершення введення
    const handleMaxPriceBlur = () => {
        // Перевірка на мінімум/максимум після введення значення
        if (maxPrice < minPrice) {
            setMaxPrice(minPrice); // Якщо максимальна ціна менше мінімальної, то встановлюємо максимум = мінімум
        }
        onChange?.(minPrice, maxPrice); // Оновлення в батьківський компонент після втрати фокусу
    };

    const handleMinPriceBlur = () => {
        // Перевірка на мінімум/максимум після введення значення
        if (minPrice < minPriceInitValue) {
            setMinPrice(minPriceInitValue); // Якщо мінімум менший за стартове значення, встановлюємо стартове
        }
        if (minPrice > maxPrice) {
            setMinPrice(maxPrice); // Якщо мінімум більше максимального, встановлюємо мінімум = максимум
        }
        onChange?.(minPrice, maxPrice); // Оновлення в батьківський компонент після втрати фокусу
    };

    return (
        <div className="main-container h-[fit-content] flex w-[376px] pt-[10px] pr-0 pb-[10px] pl-0 flex-col gap-[10px] items-start flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
            <div className="flex justify-between items-center self-stretch shrink-0 flex-nowrap bg-[#fff] relative">
                <div className="flex w-[76px] pt-[10px] pr-[20px] pb-[10px] pl-[20px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                    <span className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-bold leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                        Ціна
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
                <div className="flex h-[40px] pt-0 pr-[20px] pb-0 pl-[20px] gap-[27px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff]">
                    <input
                        type="number"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        onBlur={handleMinPriceBlur}
                        className="flex w-[120px] text-center h-[40px] pt-[16px] pr-[10px] pb-[16px] pl-[10px] flex-col gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#3b3b3b] pointer"
                    />
                    <span className="flex w-[16px] h-[12px] justify-center items-center shrink-0 font-['Inter'] text-[16px] font-black leading-[12px] text-[#3b3b3b] text-center whitespace-nowrap">
                        —
                    </span>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        onBlur={handleMaxPriceBlur}
                        className="flex w-[120px] text-center h-[40px] pt-[16px] pr-[10px] pb-[16px] pl-[10px] flex-col gap-[10px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] border-solid border border-[#3b3b3b] pointer"
                    />
                </div>
            )}
        </div>
    );
}

export default PriceFilter;
