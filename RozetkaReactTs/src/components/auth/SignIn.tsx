import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, type FormProps, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { ILoginModel } from "../../models/accountsModel.ts";
import { AccountsService } from "../../services/accountsService.ts";
import { TokenService } from "../../services/tokenService.ts";
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from "./GoogleLoginButton.tsx"; // Додаємо імпорт

import { GoogleOutlined } from '@ant-design/icons';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const remember = React.useRef(false);


    const onFinish: FormProps<ILoginModel>['onFinish'] = async (values) => {
        console.log('Form values:', { ...values });
        try {
            const res = await AccountsService.login(values);
            TokenService.save(res.data);

            if (res.status === 200) {
                message.success("Ви успішно увійшли в свій акаунт");
                navigate("/");
            } else {
                message.warning("Помилка авторизації");
            }
        } catch (error: any) {
            console.error("Помилка при авторизації:", error);
            message.error("Помилка входу");
        }
    };

    const onFinishFailed: FormProps<ILoginModel>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Функція для авторизації через Google
    // const glLogin = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         console.log('Google Token Response:', tokenResponse);
    //
    //         try {
    //             const result = await AccountsService.googleLogin({
    //                 token: tokenResponse.access_token,
    //                 remember: remember.current,
    //             });
    //
    //             if (result.status === 200) {
    //                 message.success("Ви успішно увійшли в свій акаунт");
    //                 navigate("/");
    //             } else {
    //                 console.error('Помилка авторизації через Google:', result.data);
    //                 if (result.status === 403) {
    //                     message.error("Підтвердіть свій Email для завершення авторизації");
    //                 } else {
    //                     message.error(`Помилка авторизації: ${result.statusText}`);
    //                 }
    //             }
    //
    //         } catch (error: any) {
    //             console.error('Помилка авторизації через Google:', error);
    //             message.error("Не вдалося авторизуватися через Google");
    //
    //             if (error.response && error.response.data) {
    //                 console.error('Помилка від сервера:', error.response.data);
    //                 message.error(`Помилка сервера: ${error.response.data.message}`);
    //             }
    //         }
    //     }
    // });


    const onLoginGoogleResult = (tokenGoogle:string) => {
        console.log("google token", tokenGoogle);
    }

    const CLIENT_ID = '234334407358-8tdcpdrksc7d9o6mv3gkm7tcnpfdg4q4.apps.googleusercontent.com';
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div style={{
            minWidth: "300px",
            maxWidth: "fit-content",
            height: "fit-content",
            backgroundColor: "blue",
            alignItems: "center",
            margin: "auto",
            display: 'flex',
            flexDirection: 'column',
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }}>
            <h1>SignIn page</h1>
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360, margin: "20px", width: "300px" }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <a href="">Forgot password</a>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        SignIn
                    </Button>
                    or
                    <Link to="/signup">SignUp!</Link>
                </Form.Item>

                <GoogleLoginButton icon={<GoogleOutlined />} title='Увійти з Google' onLogin={onLoginGoogleResult} />

            </Form>
        </div>
        </GoogleOAuthProvider>
    );
};

export default SignIn;
