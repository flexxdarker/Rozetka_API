import React from 'react';
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Layout as LayoutAntd, theme } from 'antd';
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";


const Layout: React.FC = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
        <LayoutAntd className='Layout'>

            <Header />

            <Content className='Main'
                     style={{
                         padding: '0 48px',
                         marginTop: 28,
                         marginBottom: 0,
                     }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 800,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            <Footer />

        </LayoutAntd>
    );
};

export default Layout;

