import React, {Suspense} from 'react';
import {Layout as LayoutAntd} from 'antd';
import {Outlet} from "react-router-dom";
import MainLoader from "../../loaders/MainLoader.tsx";
import EasyHeader from "./EasyHeader.tsx";

const EasyLayout: React.FC = () => {

    return (
        <LayoutAntd className='Layout min-h-screen flex flex-col'>
            <EasyHeader/>
            <div className="flex justify-between m-auto px-4 align-center items-center">
                <Suspense fallback={<MainLoader/>}>
                    <Outlet/>
                </Suspense>
            </div>
        </LayoutAntd>
    );
};

export default EasyLayout;

