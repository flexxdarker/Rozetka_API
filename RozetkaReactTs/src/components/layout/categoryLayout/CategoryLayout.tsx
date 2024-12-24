import React, {Suspense} from 'react';
import {theme} from 'antd';
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import MainLoader from "../../loaders/MainLoader.tsx";
import Breadcrumbs from "../../other/Breadcrumbs.tsx";


const CategoryLayout: React.FC = () => {

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();


    return (
        <>

            <Content className='Main'
                     style={{
                         padding: '0 0px',
                         marginTop: 0,
                         marginBottom: 0,
                     }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        background: colorBgContainer,
                        minHeight: 800,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <h1>category layout</h1>
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

export default CategoryLayout;