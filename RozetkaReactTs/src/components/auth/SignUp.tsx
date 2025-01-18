import React from 'react';
import {FormProps} from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import {LockOutlined, UserOutlined,MailOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";

type FieldTypeSignUp = {
    // username?: string;
    email?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldTypeSignUp>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldTypeSignUp>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const GoogleSignUp = () => {
    console.log('Google SignUp');
};

const SignUp: React.FC = () => {


    return (
        <>
            <div style={{minWidth:"300px", maxWidth: "fit-content", height: "fit-content", backgroundColor: "red", alignItems: "center", margin: "auto",  display: 'flex', flexDirection: 'column', position: "absolute",
                left: 0, right: 0, top: 0, bottom: 0 }}>
                <h1>SignUp page</h1>
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
                        name="email"
                        rules={[{ required: true, message: 'Please input your E-mail!' },
                                {type: 'email',message: 'The input is not valid E-mail!',}
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="E-mail" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Confirm Password" />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            SignUp
                        </Button>
                        or
                        {/*<a href="">Register now!</a>*/}
                        <Link to="/signin">SignIn!</Link>
                    </Form.Item>

                    <Button block type="primary" htmlType="button" onClick={GoogleSignUp}>
                        SignUp with Google
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default SignUp;
