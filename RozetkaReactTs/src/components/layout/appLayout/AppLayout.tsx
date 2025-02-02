import React, {Suspense} from 'react';
import Header from "./Header/Header.tsx";
import Footer from "./Footer.tsx";
import {Layout as LayoutAntd} from 'antd';
import {Outlet} from "react-router-dom";
import MainLoader from "../../loaders/MainLoader.tsx";


const AppLayout: React.FC = () => {




    return (
        <LayoutAntd className='Layout'>
            <Header/>
            <div style={{
                justifyContent: 'space-between',
                display: "flex",
                maxWidth: '1920px',
                margin: '0 auto',
                minWidth: '1080px'
            }}>
                <Suspense fallback={<MainLoader/>}>
                    <Outlet/>
                </Suspense>

            </div>
            <Footer/>
        </LayoutAntd>
    );
};

export default AppLayout;

