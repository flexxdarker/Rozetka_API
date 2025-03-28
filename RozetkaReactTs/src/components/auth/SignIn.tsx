import React from 'react';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, type FormProps, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { ILoginModel } from "../../models/accountsModel.ts";
import { AccountsService } from "../../services/accountsService.ts";
import { TokenService } from "../../services/tokenService.ts";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from "./GoogleLoginButton.tsx";
import './SignIn.css';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<ILoginModel>['onFinish'] = async (values) => {
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
      message.error("Помилка входу");
    }
  };

  const onLoginGoogleResult = (tokenGoogle: string) => {
    console.log("google token", tokenGoogle);
  };

  const CLIENT_ID = '234334407358-8tdcpdrksc7d9o6mv3gkm7tcnpfdg4q4.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="signin-container">
        <h1>SignIn page</h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          className="signin-form"
          onFinish={onFinish}
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
            <Flex justify="center">
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              SignIn
            </Button>
            <div className="signup-link">
              <Link to="/signup">SignUp!</Link>
            </div>
          </Form.Item>

          <GoogleLoginButton icon={<GoogleOutlined />} title='Увійти з Google' onLogin={onLoginGoogleResult} />
        </Form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
