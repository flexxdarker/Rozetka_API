import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from "react-router-dom";
import { IProductModel } from "../../models/productsModel.ts";
import deleteBin from "../../assets/icons/deleteBin.svg";
import ComparisonCard from "./ComparisonCard.tsx";
import ComparisonProductValue from "./ComparisonProductValue.tsx";

interface GroupedValues {
    filterName: string;
    valueName: string[];
}

const ComparisonProductsPage: React.FC = () => {
    const location = useLocation();
    const [groupedValues, setGroupedValues] = useState<GroupedValues[]>([]);

    // Мемоізація значення products, щоб уникнути змін при кожному рендері
    const products: IProductModel[] = useMemo(() => {
        // Якщо location.state містить масив продуктів, повертаємо його, інакше порожній масив
        return location.state ? (location.state as IProductModel[]) : [];
    }, [location.state]);  // Залежність від location.state

    useEffect(() => {
        const groupedValues: Record<string, string[]> = {};

        // Проходимо по кожному продукту
        products.forEach((product) => {
            // Якщо у продукту є values
            if (product.values) {
                product.values.forEach((value) => {
                    // Якщо такого filterName ще немає в групуванні, ініціалізуємо масив
                    if (!groupedValues[value.filterName]) {
                        groupedValues[value.filterName] = [];
                    }

                    // Додаємо значення для цього filterName для поточного товару
                    const valueName = value.valueName;
                    groupedValues[value.filterName].push(valueName);
                });
            }
        });

        // Тепер створюємо масив для повернення, де кожен елемент це {filterName, valueName}
        const result: GroupedValues[] = Object.keys(groupedValues).map((filterName) => {
            // Масив значень для даного filterName
            //const valueNames = groupedValues[filterName];

            // Заповнюємо відсутні значення дефісами для кожного товару
            const filledValues = products.map((product) => {
                // Знайдемо чи є це значення для поточного товару
                const matchingValue = product.values?.find((v) => v.filterName === filterName);
                return matchingValue ? matchingValue.valueName : "-";
            });

            return {
                filterName,
                valueName: filledValues
            };
        });

        // Оновлюємо стан з результатом
        setGroupedValues(result);
        //console.log("groupedValues",groupedValues);
    }, [products]);



    // Якщо продукти не передано, показуємо повідомлення
    if (!products || products.length === 0) {
        return <div>Немає продуктів для порівняння!</div>;
    }

    return (
        <>
            <div className={"flex flex-col gap-[4px]"}>
                <div
                    className="main-container flex min-w-[1080px] h-[82px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] justify-between items-center flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
                    <div
                        className="flex w-[233px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                        <span
                            className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#000] text-left whitespace-nowrap">
                            Cписки порівнянь {products[0].categoryId}
                        </span>
                    </div>
                    <button type={"button"} className="flex w-[132px] items-center shrink-0 flex-nowrap">
                        <div
                            className="flex w-[36px] justify-center items-center shrink-0 flex-nowrap overflow-hidden">
                            <div
                                className="flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center shrink-0 flex-nowrap">
                                <img src={deleteBin} className="w-[20px] h-[20px] shrink-0" />
                            </div>
                        </div>
                        <div
                            className="flex w-[96px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
                            <span
                                className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
                                Видалити
                            </span>
                        </div>
                    </button>
                </div>

                <div className={"flex gap-[4px]"}>
                    {
                        products.map(product => <ComparisonCard product={product} key={product.id} />)
                    }
                </div>

                <div className={"flex flex-col"}>
                    {groupedValues.length >= 0 ?
                        groupedValues.map(((group, index) => <ComparisonProductValue groupedValues={group} key={index}/>)) : ""
                    }
                </div>
            </div>
        </>
    );
}

export default ComparisonProductsPage;



//
//
// import React, {useEffect, useState} from 'react';
// import { useLocation } from "react-router-dom";
// import { IProductModel } from "../../models/productsModel.ts";
//
// const ComparisonProductsPage: React.FC = () => {
//     const location = useLocation();
//
//     const [products2, setProducts2] = useState<IProductModel[]>([])
//     // Перевірка наявності state
//     const products:   IProductModel[]  = location.state as  IProductModel[]  || [];  // Захист від undefined
//
//     // Логування location для перевірки
//     useEffect(() => {
//         console.log("Location object:", location);
//         setProducts2(location.state as IProductModel[]);
//         console.log("location.state as IProductModel[]:", location.state as IProductModel[]);
//         console.log("products2:", products2);
//     }, [location]);
//
//     // Перевірка наявності state
//     // useEffect(() => {
//     //     if (location.state && Array.isArray(location.state.products)) {
//     //         setProducts(location.state.products);
//     //     }
//     // }, [location.state.products]);
//
//
//
//     // Додаткове логування для перевірки
//     useEffect(() => {
//         console.log("Products from state:", products);
//     }, [products]);
//
//     // Якщо products не передано, показуємо повідомлення або обробляємо помилку
//     if (!products || products.length === 0) {
//         return <div>Немає продуктів для порівняння!</div>;
//     }
//
//     return (
//         <div>
//             <h1>Сторінка порівняння продуктів</h1>
//             {products.length > 0 ? (
//                 <div>
//                     {products.map((product) => (
//                         <div key={product.id}>
//                             <h2>{product.title}</h2>
//                             <p>{product.description}</p>
//                             <p>Ціна: {product.price} грн</p>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>Немає продуктів для порівняння</p>
//             )}
//         </div>
//     );
// }
//
// export default ComparisonProductsPage;
//
