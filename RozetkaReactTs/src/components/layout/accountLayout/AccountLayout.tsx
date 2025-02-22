import React, {Suspense} from 'react';
import {theme} from 'antd';
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import MainLoader from "../../loaders/MainLoader.tsx";
import AccountMenu from "../../account/AccountMenu.tsx";


const AccountLayout: React.FC = () => {

    const {
        token: {borderRadiusLG},
        // token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();


    return (
        <>
            <div style={{backgroundColor: 'blue'}}>
                <AccountMenu/>
            </div>
            <Content className='Main'
                     style={{
                         padding: '0 0px',
                         marginTop: 0,
                         marginBottom: 0,
                     }}>
                <div className="ml-[4px]"
                    style={{
                        // background: colorBgContainer,
                        minHeight: 800,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Suspense fallback={<MainLoader/>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </Content>
        </>
    )
        ;
};

export default AccountLayout;