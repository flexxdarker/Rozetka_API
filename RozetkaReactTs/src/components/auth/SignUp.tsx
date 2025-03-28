import React from 'react';
import {Button, Form, Input, FormProps, DatePicker, message} from 'antd';
import {LockOutlined, UserOutlined, MailOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {IRegisterModel} from "../../models/accountsModel.ts";
import {AccountsService} from "../../services/accountsService.ts";
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import {TokenService} from "../../services/tokenService.ts";
import './SignUp.css';
dayjs.extend(utc);

const SignUp: React.FC = () => {

    const navigate = useNavigate();

    const onFinish: FormProps<IRegisterModel>['onFinish'] = async (values) => {
        console.log('Form values:', {...values}); 

        const selectedDate = values.birthdate;
        const utcDate = dayjs(selectedDate).utc().format()

        console.log(utcDate);
        console.log('Form values:', {...values, birthdate: utcDate});

        try {
            const res = await AccountsService.register({...values, birthdate: utcDate});
            TokenService.save(res.data);
            if (res.status === 200) {
                message.success("Register success");
                navigate('/');
            } else {
                message.warning("Warning: Something went wrong.");
            }
        } catch (error) {
            message.error("An error occurred during registration.");
        }
    };

    const GoogleSignUp = () => {
        console.log('Google SignUp');
    };

    return (
        <div className="signin-container">
            <h1>SignUp page</h1>
            <Form
                name="login"
                initialValues={{remember: true}}
                onFinish={onFinish} 
            >
                <Form.Item
                    name="name"
                    rules={[{required: true, message: 'Please input your User name!'}]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="surname"
                    rules={[{required: true, message: 'Please input your User surname!'}]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Surname" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {required: true, message: 'Please input your E-mail!'},
                        {type: 'email', message: 'The input is not valid E-mail!'}
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="E-mail" />
                </Form.Item>

                <Form.Item
                    name="birthdate"
                    rules={[{required: true, message: 'Please input your birthdate!'}]}
                >
                    <DatePicker format={'YYYY-MM-DD'} style={{width: '100%'}} placeholder="Birthdate" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {required: true, message: 'Please input your Password!'},
                        {min: 8, message: 'Password must be at least 8 characters long!'}
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {required: true, message: 'Please confirm your password!'},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        SignUp
                    </Button>
                </Form.Item>
                    <div className="signup-link">
                 <Link to="/signin">SignIn!</Link>
                </div>
            </Form>
        </div>
    );
};

export default SignUp;
