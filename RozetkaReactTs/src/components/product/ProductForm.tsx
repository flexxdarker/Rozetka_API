import React, {useEffect, useState} from 'react';
import {Button, Form, type FormProps, Input} from "antd";
import EditorTiny from "../other/EditorTiny.tsx";
import {useParams} from "react-router-dom";
import {ProductServices} from "../../services/productService.ts";
import {ProductModel} from "../../models/productsModel.ts";

type FieldTypeCreateProduct = {
    name?: string;
    description?: string;
};

const ProductForm: React.FC = () => {

    const params = useParams();
    const [editMode, setEditeMode] = useState(false);
    const [product, setProduct] = useState<ProductModel | null>(null);
    const [form] = Form.useForm();

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


    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        if (params.id) {
            setEditeMode(true);
            const res = await ProductServices.getById(params.id);
            console.log(params.id);
            console.log(res.data);
            setProduct(res.data);
            form.setFieldsValue(res.data);
            //form.setFieldsValue({ name: "name", value: "name" });
        }
    }


    return (
        <>
            <h1>Product form</h1>
            <Form
                form={form}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                name="login"
                initialValues={{remember: true}}
                style={{margin: "20px", width: "auto"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="title"
                    label={"Назва:"}
                    rules={[{required: true, message: 'Please input your product name!'}]}
                >
                    <Input placeholder="Product name"/>
                </Form.Item>


                <Form.Item wrapperCol={{span: 24}} name="description">
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
