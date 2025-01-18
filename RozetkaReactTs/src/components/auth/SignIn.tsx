import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Flex, type FormProps} from 'antd';
import {Link} from "react-router-dom";
import EditorTiny from "../other/EditorTiny.tsx";

type FieldTypeSignIn = {
    username?: string;
    password?: string;
    remember?: string;
    tiny?: string;
};

const SignIn: React.FC = () => {
    const onFinish: FormProps<FieldTypeSignIn>['onFinish'] = (values) => {
        console.log('Received values of form: ', values);
    };

    const onFinishFailed: FormProps<FieldTypeSignIn>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const GoogleSignIn = () => {
        console.log('Google SignIn');
    };

    return (
        <>
            <div style={{minWidth:"300px", maxWidth: "fit-content", height: "fit-content", backgroundColor: "blue", alignItems: "center", margin: "auto",  display: 'flex', flexDirection: 'column', position: "absolute",
                        left: 0, right: 0, top: 0, bottom: 0 }}>
                <h1>SignIn page</h1>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 , margin: "20px", width: "300px" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            SignIn
                        </Button>
                        or
                        {/*<a href="">Register now!</a>*/}
                        <Link to="/signup">SignUp!</Link>
                    </Form.Item>

                    <Form.Item
                        name="tiny"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <EditorTiny/>
                    </Form.Item>


                    <Button block type="primary" htmlType="button" onClick={GoogleSignIn}>
                        SignIn with Google
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default SignIn;
