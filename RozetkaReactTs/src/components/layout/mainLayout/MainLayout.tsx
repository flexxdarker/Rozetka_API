import React, {Suspense} from 'react';
import {theme} from 'antd';
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import MainMenu from "./MainMenu.tsx";
import MainLoader from "../../loaders/MainLoader.tsx";
import Breadcrumbs from "../../other/Breadcrumbs.tsx";


const MainLayout: React.FC = () => {

    const {
        token: {borderRadiusLG},
        //token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();


    return (
        <>
            <div >
                <MainMenu/>
            </div>
            <Content className='Main'
                     style={{
                         padding: '0 0px',
                         marginTop: 0,
                         marginBottom: 0,
                     }}>
                <div
                    style={{
                        // background: colorBgContainer,
                        minHeight: 800,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Breadcrumbs/>
                    <Suspense fallback={<MainLoader/>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </Content>
        </>
    )
        ;
};

export default MainLayout;