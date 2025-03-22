import React from 'react';
import arrowRight from '../../../assets/icons/nav-arrow-right.svg';
import {Link} from "react-router-dom";
import useCategories from "../../../hooks/useCategories.ts";

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const MenuByCategory: React.FC = () => {

    const {categories} = useCategories();

    return (
        <div
            className="main-container flex w-[370px] flex-col gap-[4px] items-start flex-nowrap bg-[#fff] mx-auto rounded-[8px] overflow-visible">
            {categories.map(category => {
                if (category.parentCategoryId === null) {
                    return (<Link to={`subcategories/${category.id}`} key={category.id} state={category.name}>
                            <div className=" relative inline-block text-left group" >
                                <button

                                    className="flex w-[370px] h-[46px] pt-0 pr-0 pb-0 pl-[20px] items-center shrink-0 flex-nowrap bg-[#fff] hover:bg-gray-100 transition-all duration-200 hover:bg-gray-50 focus:outline-none
                                    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                >
                                    <div className="flex w-[226px] gap-[10px] items-center shrink-0 flex-nowrap">
                                        <img
                                            src={`${uploadings + "200_" + category.image}`}
                                            alt="немає зображення"
                                            className="w-[24px] h-[24px] shrink-0 overflow-hidden"
                                        />
                                        <span
                                            className="h-[20px] shrink-0 basis-auto font-['Inter'] text-[16px] font-light leading-[20px] text-[#3b3b3b] text-left whitespace-nowrap">
                  {category.name}
                </span>
                                    </div>
                                    <div
                                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-end items-center grow shrink-0 basis-0 flex-nowrap">
                                        <img src={arrowRight} className="w-[24px] h-[24px] shrink-0 overflow-hidden"/>
                                    </div>

                                </button>

                                {/*це мало бути випадаюче меню*/}
                                    {/*<div*/}
                                    {/*    className="absolute -right-48 top-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0*/}
                                    {/*    group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200 ease-out z-[2]">*/}
                                    {/*    <div >*/}
                                    {/*        <a href="#"*/}
                                    {/*           className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">*/}
                                    {/*            Пункт 1*/}
                                    {/*        </a>*/}
                                    {/*        <a href="#"*/}
                                    {/*           className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">*/}
                                    {/*            Пункт 2*/}
                                    {/*        </a>*/}
                                    {/*        <a href="#"*/}
                                    {/*           className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">*/}
                                    {/*            Пункт 3*/}
                                    {/*        </a>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}


                                {/* Випадаюче меню */}

                            </div>


                        </Link>
                    )
                        ;
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default MenuByCategory;
