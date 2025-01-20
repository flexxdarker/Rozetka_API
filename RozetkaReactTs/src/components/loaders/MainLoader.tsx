import React from 'react';
import Container from "@mui/material/Container";
import { Spin } from 'antd';

const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};

const content = <div style={contentStyle} />;

const MainLoader: React.FC = () => {


    return (
        <>
            <Container maxWidth="sm">
                <Spin tip="Loading" size="large">
                    {content}
                </Spin>
            </Container>
        </>
    );
};

export default MainLoader;
