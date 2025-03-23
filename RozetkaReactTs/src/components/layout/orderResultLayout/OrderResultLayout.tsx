import React, {Suspense} from 'react';
import {Layout as LayoutAntd} from 'antd';
import {Outlet} from "react-router-dom";
import MainLoader from "../../loaders/MainLoader.tsx";
import OrderResultHeader from "./OrderResultHeader.tsx";

const OrderResultLayout: React.FC = () => {

    return (
        <LayoutAntd className='Layout min-h-screen flex flex-col'>
            <OrderResultHeader/>
            <div className="flex-grow flex justify-between mx-auto px-4">
                <Suspense fallback={<MainLoader/>}>
                    <Outlet/>
                </Suspense>
            </div>
        </LayoutAntd>
    );
};

export default OrderResultLayout;

