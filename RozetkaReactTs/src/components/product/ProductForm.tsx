import React, {useEffect, useState} from 'react';
import {Button, Form, type FormProps, Input, InputNumber, message, Select} from "antd";
import EditorTiny from "../other/EditorTiny.tsx";
import {useParams} from "react-router-dom";
import {ProductServices} from "../../services/productService.ts";
import {ICreateProductModel, IProductModel} from "../../models/productsModel.ts";
import { useNavigate } from "react-router-dom";
import {ICategoryName} from "../../models/categoriesModel.ts";
import {CategoriesServices} from "../../services/categoriesService.ts";


const ProductForm: React.FC = () => {

    const params = useParams();
    const [editMode, setEditeMode] = useState(false);
    const [product, setProduct] = useState<IProductModel | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<ICategoryName[]>([]);

    const [description, setEditorContent] = useState('');
    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    const onFinish: FormProps<ICreateProductModel>['onFinish'] = async (values) => {
        console.log('Form values:', {...values, description}); // Обробка відправки форм
        if (editMode) {
            console.log("Success edit mode:", {...values, description});
            // values.image = values.image.originFileObj;//???????

            // const res = await ProductServices.edit(values);
            // console.log(res);
            // if (res.status == 200) {
            //     message.success("Update");
            //     navigate(-1);
            // } else {
            //     message.alert("Wrong");
            // }
        } else {
            console.log("Success create:", {...values, description});
            // values.image = values.image.originFileObj;
            const res = await ProductServices.create(values);
            console.log(res);
            if (res.status == 200) {
                message.success("Created");
                navigate(-1);
            } else {
                message.warning("Warning");
            }// и
        }// з додатковими даними редактора
    };

    const onFinishFailed: FormProps<ICreateProductModel>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        loadProduct();

        loadSubCategories();
    }, []);

    const loadSubCategories = async () => {
        const res = await  CategoriesServices.getAll();
        setCategories(res.data);
    }

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
                {editMode ? (
                    <Form.Item
                        name="id"
                        label={"Id:"}
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                ) : null}

                <Form.Item
                    name="title"
                    label={"Назва:"}
                    rules={[{required: true, message: 'Please input your product name!'}]}
                >
                    <Input placeholder="Product name"/>
                </Form.Item>

                <Form.Item name="categoryId" label="Category" hasFeedback
                           rules={[{required: true, message: 'Please choose the category.'}]}>
                    <Select placeholder="Select a category">
                        {categories.map(c => (
                            <Select.Option key={c.id} value={c.id}> {c.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label={"Катеорія:"}
                    rules={[{required: true, message: 'Please input your product category!'}]}
                >
                    <Input placeholder="Category" type={"number"}/>
                </Form.Item>

                <Form.Item
                    name="price"
                    label={"Ціна:"}
                    rules={[{required: true, message: 'Please input your product price!'}]}
                >
                    {/*<InputNumber decimalSeparator={","} placeholder='0,00'/>*/}
                    <Input type={"double"} placeholder='0,00'/>
                </Form.Item>

                <Form.Item
                    name="discount"
                    label={"Знижка:"}
                    rules={[{required: true, message: 'Please input your product discount!'}]}
                >
                    <Input placeholder="Discount" type={"number"}/>
                </Form.Item>


                <Form.Item wrapperCol={{span: 24}} name="description">
                    <EditorTiny
                        //content={editMode && product !== null? product.description : ""}
                        initialValue={editMode && product !== null ? product.description : ""}
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
