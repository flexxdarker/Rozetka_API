        import React, {useState} from 'react';
        import {
            Button,
            Form,
            Input,
            FormProps,
            DatePicker,
            message,
            Upload,
            UploadFile,
        } from 'antd';
        // import { Select, Button, Checkbox, Form, Input, FormProps } from 'antd';
        import {LockOutlined, UserOutlined, MailOutlined, PlusOutlined, PhoneOutlined} from "@ant-design/icons";
        import {Link, useNavigate} from "react-router-dom";
        import {IRegisterModel} from "../../models/accountsModel.ts";
        import {AccountsService} from "../../services/accountsService.ts";
        import utc from 'dayjs/plugin/utc';
        import dayjs from 'dayjs';
        import {TokenService} from "../../services/tokenService.ts";
        import {RcFile, UploadChangeParam} from "antd/es/upload";
        import {toast} from "react-toastify";
        import './SignUp.css';
        dayjs.extend(utc);

        // const { Option } = Select;
        //
        // const prefixSelector = (
        //     <Form.Item name="prefix" noStyle>
        //         <Select style={{ width: 70 }}>
        //             <Option value="86">+86</Option>
        //             <Option value="87">+87</Option>
        //         </Select>
        //     </Form.Item>
        // );



        const SignUp: React.FC = () => {

            const navigate = useNavigate();
            const [isImage, setIsImage] = useState(false);

            const onFinishFailed: FormProps<IRegisterModel>['onFinishFailed'] = (errorInfo) => {
                console.log('Failed:', errorInfo);
            };

            const GoogleSignUp = () => {
                console.log('Google SignUp');
            };




            const onFinish: FormProps<IRegisterModel>['onFinish'] = async (values: IRegisterModel) => {
                const selectedDate = values.birthdate;
                const utcDate = dayjs(selectedDate).utc().format()
                console.log('Form values:111', {...values, birthdate: utcDate});

                const res = await AccountsService.register({...values, birthdate: utcDate});
                if(res.status === 200 && res.data.accessToken != null) {
                    TokenService.save(res.data);
                    if (res.status == 200) {
                        message.success("register success");
                        navigate('/');
                    } else {
                        message.warning("Warning");
                    }
                } else{
                    toast('Помилка користувача', {
                        position: 'bottom-right',
                        autoClose: 4000, // Auto close after 3 seconds
                        closeButton: true,  // Add close button to the toast
                    });
                }
            };

            const uploadButton = (
                <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </button>
            );





            return (
                <>
                    <div style={{
            
                    }}

                    className={"rounded-[8px] bg-[#fff] border-solid border border-[#9cc319]"}>
                        <h1>SignUp page</h1>
                        <Form
                            name="login"
                            initialValues={{remember: true}}
                            style={{maxWidth: 360, margin: "20px", width: "300px"}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
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
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please input your phone number!' },
                                // {max: 13, message: "Некоректна довжина номеру"},
                                // {min: 13, message: "Некоректна довжина номеру"},
                                    {
                                        pattern: /^\+380\d{9}$/,  // Перевірка на формат: +380 + 9 цифр
                                        message: 'Номер телефону повинен починатися з +380 і містити 13 цифр.',
                                    },]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="Phone Number"/>
                            </Form.Item>

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

                            <Form.Item
                                name="avatar"
                                rules={[{required: true, message: 'Please input your avatar!'}]}
                                getValueFromEvent={(e: UploadChangeParam) => {
                                    setIsImage(e.fileList.length > 0);
                                    return e.fileList[0]?.originFileObj;
                                }}
                            >
                                <Upload
                                    beforeUpload={() => false} // Забороняємо автоматичне завантаження
                                    accept="image/*"
                                    maxCount={1} // Лише один файл
                                    listType="picture-card"
                                    onPreview={(file: UploadFile) => {
                                        if (!file.url && !file.preview) {
                                            file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                                        }
                                    }}
                                >
                                    {isImage  ? null : uploadButton}
                                </Upload>
                            </Form.Item>

                            <Form.Item>
                                <Button block type="primary" htmlType="submit">
                                    SignUp
                                </Button>
                                <div className="signup-link">
                        <Link to="/signin">SignIn!</Link>
                        </div>
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
