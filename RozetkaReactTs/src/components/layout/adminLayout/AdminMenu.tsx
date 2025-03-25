import React from 'react';
import {Link} from "react-router-dom";

const adminMenu: { to: string, label: string }[] = [
    {
        to: "categories-crud",
        label: "Categories",
    },
    {
        to: "products-crud",
        label: "Products",
    },
    {
        to: "filter-crud",
        label: "Filter",
    },
    {
        to: "product-filter",
        label: "Filter product",
    },
    {
        to: "orders-crud",
        label: "Orders",
    },
    {
        to: "users-crud",
        label: "Users",
    },
]


const AdminMenu: React.FC = () => {

    return (
        <div
            className="main-container flex w-[370px] flex-col gap-[4px] items-start flex-nowrap bg-[#fff] mx-auto rounded-[8px] overflow-visible">
            {adminMenu.map((item) => {
                return (
                    <div className=" relative inline-block text-left group" key={item.to}>
                        <Link to={item.to}

                              className="flex w-[370px] h-[46px] pt-0 pr-0 pb-0 pl-[20px] items-center shrink-0 flex-nowrap bg-[#fff] hover:bg-gray-100 transition-all duration-200 hover:bg-gray-50 focus:outline-none
                                    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                            <div className="flex w-[226px] gap-[10px] items-center shrink-0 flex-nowrap">
                                        <span
                                            className="h-[20px] shrink-0 basis-auto font-['Inter'] text-[16px] font-light leading-[20px] text-[#3b3b3b] text-left whitespace-nowrap">
                  {item.label}
                </span>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};


export default AdminMenu;
