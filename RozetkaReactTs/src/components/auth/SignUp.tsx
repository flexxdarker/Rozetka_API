import React from 'react';
import {Button, Form, Input, FormProps, DatePicker, message} from 'antd';
// import { Select, Button, Checkbox, Form, Input, FormProps } from 'antd';
import {LockOutlined, UserOutlined, MailOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {IRegisterModel} from "../../models/accountsModel.ts";
import {AccountsService} from "../../services/accountsService.ts";
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import {TokenService} from "../../services/tokenService.ts";

dayjs.extend(utc);


// const { Option } = Select;

const SignUp: React.FC = () => {

    const navigate = useNavigate();

    const onFinish: FormProps<IRegisterModel>['onFinish'] = async (values) => {
        console.log('Form values:', {...values}); // Обробка відправки форми з додатковими даними редактора

        const selectedDate = values.birthdate;
        const utcDate = dayjs(selectedDate).utc().format()


        console.log(utcDate)
        console.log('Form values:', {...values, birthdate: utcDate});

        const res = await AccountsService.register({...values, birthdate: utcDate});
        TokenService.save(res.data);
        if (res.status == 200) {
            message.success("register success");
            navigate('/');
        } else {
            message.warning("Warning");
        }
    };

    // const onFinishFailed: FormProps<FieldTypeSignUp>['onFinishFailed'] = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    const GoogleSignUp = () => {
        console.log('Google SignUp');
    };


    return (
        <>
            <div style={{
                minWidth: "300px",
                maxWidth: "fit-content",
                height: "fit-content",
                backgroundColor: "red",
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
                <h1>SignUp page</h1>
                <Form
                    name="login"
                    initialValues={{remember: true}}
                    style={{maxWidth: 360, margin: "20px", width: "300px"}}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="name"
                        rules={[{required: true, message: 'Please input your User name!'}]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Username"/>
                    </Form.Item>

                    <Form.Item
                        name="surname"
                        rules={[{required: true, message: 'Please input your User surname!'}]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Username"/>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{required: true, message: 'Please input your E-mail!'},
                            {type: 'email', message: 'The input is not valid E-mail!',}
                        ]}
                    >
                        <Input prefix={<MailOutlined/>} placeholder="E-mail"/>
                    </Form.Item>

                    {/*<Form.Item*/}
                    {/*    name="phoneNumber"*/}
                    {/*    rules={[{ required: true, message: 'Please input your phone number!' }]}*/}
                    {/*>*/}
                    {/*    <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Phone Number"/>*/}
                    {/*</Form.Item>*/}

                    <Form.Item
                        name="birthdate"
                        rules={[{required: true, message: 'Please input your birthdate!'}]}
                    >
                        <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} placeholder="Birthdate"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'},
                            {min: 8, message: 'Password must be at least 8 characters long!'}]}
                    >
                        <Input prefix={<LockOutlined/>} type="password" placeholder="Password"/>
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
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input prefix={<LockOutlined/>} type="password" placeholder="Confirm Password"/>
                    </Form.Item>

                    {/*<Form.Item>*/}
                    {/*    <Form.Item name="remember" valuePropName="checked" noStyle>*/}
                    {/*        <Checkbox>Remember me</Checkbox>*/}
                    {/*    </Form.Item>*/}
                    {/*</Form.Item>*/}

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
