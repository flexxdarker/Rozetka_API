import React, {useEffect, useState} from 'react';
import {IProductModel} from "../../models/productsModel.ts";

interface ISortProductsProps {
    productsInit: IProductModel[];
    onChange: (productsInit: IProductModel[]) => void;
}

const SortProducts:React.FC<ISortProductsProps> = ({productsInit,onChange}) => {

    const [products,setProducts] = useState<IProductModel[]>(productsInit);

    useEffect(() => {
        setProducts(productsInit); // Оновлення продуктів при зміні пропсів
    }, [productsInit]);

    const sortByPrice = (order: 'asc' | 'desc') => {
        const sortedProducts = [...products]; // Копіюємо поточний список продуктів

        sortedProducts.sort((a, b) => {
            // Перевірка наявності price у продуктів
            const priceA = a.price || 0;
            const priceB = b.price || 0;

            if (order === 'asc') {
                return priceA - priceB; // Сортуємо за зростанням
            } else {
                return priceB - priceA; // Сортуємо за зменшенням
            }
        });

        setProducts(sortedProducts); // Оновлюємо локальний стан з відсортованими продуктами
        onChange(sortedProducts); // Передаємо оновлений список в батьківський компонент
    };

    const sortByTitle = (order: 'asc' | 'desc') => {
        const sortedProducts = [...products]; // Копіюємо поточний список продуктів

        sortedProducts.sort((a, b) => {
            const titleA = a.title?.toLowerCase() || '';
            const titleB = b.title?.toLowerCase() || '';

            if (order === 'asc') {
                return titleA.localeCompare(titleB); // Сортуємо за алфавітним порядком
            } else {
                return titleB.localeCompare(titleA); // Сортуємо в зворотному алфавітному порядку
            }
        });

        setProducts(sortedProducts); // Оновлюємо локальний стан з відсортованими продуктами
        onChange(sortedProducts); // Передаємо оновлений список в батьківський компонент
    };

    const sortByDate = (order: 'asc' | 'desc') => {
        const sortedProducts = [...products]; // Копіюємо поточний список продуктів

        sortedProducts.sort((a, b) => {
            const dateA = new Date(a.date); // Конвертуємо дату продукту в об'єкт Date
            const dateB = new Date(b.date); // Конвертуємо дату продукту в об'єкт Date

            if (order === 'asc') {
                return dateA.getTime() - dateB.getTime(); // Сортуємо за зростанням
            } else {
                return dateB.getTime() - dateA.getTime(); // Сортуємо за спаданням
            }
        });

        setProducts(sortedProducts); // Оновлюємо локальний стан з відсортованими продуктами
        onChange(sortedProducts); // Передаємо оновлений список в батьківський компонент
    };


    return (
        <>
            <div
                className="main-container flex pt-[20px] pr-[20px] pb-[19px] pl-[20px] justify-between items-center flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">

                <div className="flex gap-[40px] justify-center items-center shrink-0 flex-nowrap">
                    <button type={"button"}
                            className="flex w-[155px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#fff]">
          <span
              className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
            Показати спочатку:
          </span>
                    </button>
                    <button type={"button"} onClick={() => sortByPrice('asc')}
                            className="flex w-[69px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#fff]">
          <span
              className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
            дешеві
          </span>
                    </button>
                    <button type={"button"} onClick={() => sortByPrice('desc')}
                            className="flex w-[65px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#fff]">
          <span
              className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
            дорогі
          </span>
                    </button>
                    <button type={"button"} onClick={() => sortByTitle('asc')}
                            className="flex w-[78px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#fff]">
          <span
              className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
            назва
          </span>
                    </button>
                    <button type={"button"} onClick={() => sortByDate('asc')}
                            className="flex w-[78px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#fff]">
          <span
              className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] text-left whitespace-nowrap">
            новинки
          </span>
                    </button>
                    <button type={"button"}
                            className="flex w-[89px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] relative z-[9]">
          <span
              className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] relative text-left whitespace-nowrap z-10">
            популярні
          </span>
                    </button>
                    <button type={"button"}
                            className="flex w-[101px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] relative z-[11]">
          <span
              className="h-[10px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#3b3b3b] relative text-left whitespace-nowrap z-[12]">
            з відгуками
          </span>
                    </button>
                </div>
                <div className="flex w-[79.846px] gap-[20px] items-end shrink-0 flex-nowrap relative z-[13]">
                    <div
                        className="flex w-[30px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col gap-[2px] items-start shrink-0 flex-nowrap relative z-[14] bg-red-500">
                    </div>
                    <div
                        className="flex w-[30px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] flex-col gap-[2px] items-start shrink-0 flex-nowrap relative z-[14] bg-red-500">
                    </div>
                </div>
            </div>
        </>
    );
};

export default SortProducts;