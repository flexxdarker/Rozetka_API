import React, {Suspense} from 'react';
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Layout as LayoutAntd} from 'antd';
import {Outlet} from "react-router-dom";
import MainLoader from "../../loaders/MainLoader.tsx";


const AppLayout: React.FC = () => {




    return (
        <LayoutAntd className='Layout min-h-screen flex flex-col'>
            <Header/>
            <div className="flex-grow flex justify-between mx-auto px-4">
                <Suspense fallback={<MainLoader/>}>
                    <Outlet/>
                </Suspense>

            </div>
            <Footer/>
        </LayoutAntd>
    );
};

export default AppLayout;

