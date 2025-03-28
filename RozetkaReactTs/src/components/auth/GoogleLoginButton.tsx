import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import { LoginButtonProps } from "./types.ts";
import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import './GoogleLoginButton.css';

const GoogleLoginButton: React.FC<LoginButtonProps> = ({ 
    title = 'Увійти з Google', 
    icon, 
    onLogin 
}) => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse);
            onLogin(tokenResponse.access_token);
        },
        onError: error => console.error(error),
    });

    return (
        <Button className="google-login-btn" icon={icon} onClick={() => login()}>
            {title}
        </Button>
    );
};

export default GoogleLoginButton;
