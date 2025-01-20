import React, {useState} from 'react';
import {Button, Form, type FormProps, Input} from "antd";
import EditorTiny from "../other/EditorTiny.tsx";

type FieldTypeCreateProduct = {
    name?: string;
    description?: string;
};

const ProductForm: React.FC = () => {

    const [description, setEditorContent] = useState('');
    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    const onFinish: FormProps<FieldTypeCreateProduct>['onFinish'] = (values) => {
        console.log('Form values:', {...values, description}); // Обробка відправки форми з додатковими даними редактора
    };

    const onFinishFailed: FormProps<FieldTypeCreateProduct>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <h1>Product form</h1>
            <Form
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                name="login"
                initialValues={{remember: true}}
                style={{margin: "20px", width: "auto"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="name"
                    label={"Назва:"}
                    rules={[{required: true, message: 'Please input your product name!'}]}
                >
                    <Input placeholder="Product name"/>
                </Form.Item>


                <Form.Item wrapperCol={{span: 24}}>
                    <EditorTiny
                        onEditorChange={handleEditorChange}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{span: 24}}>
                    <Button block type="primary" htmlType="submit">
                        Створити оголошення
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default ProductForm;
