import React from 'react';
import {Button, Form, type FormProps, Input} from "antd";

type FieldTypeCreateCategory = {
    name?: string;
    parentCategoryId?: number;
};

const CategoryForm: React.FC = () => {

    const onFinish: FormProps<FieldTypeCreateCategory>['onFinish'] = (values) => {
        console.log('Form values:', {...values}); // Обробка відправки форми з додатковими даними редактора
    };

    const onFinishFailed: FormProps<FieldTypeCreateCategory>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>

            <h1>Category form</h1>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="login"
                initialValues={{remember: true}}
                style={{margin: "20px", width: "auto"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="name"
                    label={"Назва:"}
                    rules={[{required: true, message: 'Please input your category name!'}]}
                >
                    <Input placeholder="Category name"/>
                </Form.Item>

                <Form.Item
                    name="parentCategoryId"
                    label={"parentCategoryId"}
                    rules={[{required: true, message: 'Please input id!'}]}
                >
                    <Input type="number" placeholder="Password"/>
                </Form.Item>


                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button block type="primary" htmlType="submit">
                        Створити категорію
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CategoryForm;